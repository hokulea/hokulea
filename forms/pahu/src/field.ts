import Publisher from './-utils';
import { VALIDATION_EVENTS } from './definitions';
import {
  isValidationSchema,
  normalizePathSegment,
  transformValidationResponse,
  validateNativeField,
  validateSchema
} from './validation';

import type { Subscriber } from './-utils';
import type {
  FieldElement,
  FieldNames,
  FieldValidationResponse,
  Issue,
  UserData,
  UserValue,
  ValidatedCallback,
  ValidationMode,
  ValidationResult
} from './definitions';
import type { Form, FormAPI } from './form';
import type { StandardSchemaV1 } from '@standard-schema/spec';

// #region Config & Types

/**
 * That is a known field as it is defined in `data` in the form.
 */
type KnownField<DATA extends UserData, NAME extends keyof DATA> = {
  name: NAME;
  value?: DATA[NAME];
};

/**
 * That field isn't known per `data` in the form
 */
type UnknownField<NAME extends string, VALUE extends UserValue> = {
  name: NAME;
  value?: VALUE;
};

/**
 * Utility to get either the known rsp unknown field
 */
type GetField<DATA extends UserData, NAME extends string, VALUE> = NAME extends keyof DATA
  ? KnownField<DATA, NAME>
  : UnknownField<NAME, VALUE>;

/** Get the name field */
type GetName<DATA extends UserData, NAME extends string, VALUE> = GetField<
  DATA,
  NAME,
  VALUE
>['name'];

/** Get the value field */
type GetValue<DATA extends UserData, NAME extends string, VALUE> = GetField<
  DATA,
  NAME,
  VALUE
>['value'];

/**
 * Callback used for field level validation
 */
export type FieldValidateCallback<DATA extends UserData, NAME extends string, VALUE> = (data: {
  name: GetName<DATA, NAME, VALUE>;
  value?: GetValue<DATA, NAME, VALUE>;
  form: FormAPI<DATA>;
}) => FieldValidationResponse | Promise<FieldValidationResponse>;

/** Validator for a Field. Either a callback function or pass a schema */
type FieldValidator<DATA extends UserData, NAME extends string, VALUE> =
  | FieldValidateCallback<DATA, NAME, VALUE>
  | StandardSchemaV1;

/**
 * Configuration for a Field
 */
export type FieldConfig<DATA extends UserData, NAME extends string, VALUE> = {
  /**
   * Register a field element
   */
  element?: FieldElement;

  /**
   * Whether native validation is ignored
   *
   * This overrides the value set at the form
   */
  ignoreNativeValidation?: boolean;

  /**
   * Validation happens when this event is triggered
   *
   * This overrides the value set at the form
   */
  validateOn?: ValidationMode | undefined;

  /**
   * Revalidation happens when this event is triggered
   *
   * This overrides the value set at the form
   */
  revalidateOn?: ValidationMode | undefined;

  // validators?: Record<ValidationMode, FieldValidator>;
  /**
   * Validation for the field
   */
  validate?: FieldValidator<DATA, NAME, VALUE>;

  /**
   * Called when the form is validated.
   *
   * Happens when:
   *
   * - form is submitted, but invalid
   * - a validation event is triggered
   */
  validated?: ValidatedCallback;

  /**
   * Link that field to another. When that other field changes its value, the
   * validation for this field will be triggered, too.
   */
  linkedField?: FieldNames<DATA> | (string & {});
} & GetField<DATA, NAME, VALUE>;

/* Internal full config with the reference to the form */
type FullFieldConfig<DATA extends UserData, NAME extends string, VALUE> = FieldConfig<
  DATA,
  NAME,
  VALUE
> & {
  form: Form<DATA>;
};

// #region API

/**
 * Field API
 */
export interface FieldAPI<DATA extends UserData, NAME extends string, VALUE> {
  /** Name of the field */
  readonly name: GetName<DATA, NAME, VALUE>;
  /** Value of the field */
  readonly value?: GetValue<DATA, NAME, VALUE>;
  /** Shall it ignore native (HTML) validation? */
  readonly ignoreNativeValidation: boolean;
  readonly issues: Issue[];

  /** Whether this field has already been validated */
  readonly validated: boolean;

  /**
   * Removes this field from the form and cleans up all held references
   */
  dispose(): void;

  /**
   * Update the config
   *
   * @param config the new config
   */
  updateConfig(config: Omit<FieldConfig<DATA, NAME, VALUE>, 'name'>): void;

  /**
   * Register a HTML element with the field
   *
   * @param element the HTML element
   */
  registerElement(element: FieldElement): void;

  setIssues(issues: Issue[]): void;

  /**
   * Sets the fields value
   *
   * @param value the new value
   */
  setValue(value: VALUE): void;

  /**
   * Validate the field
   */
  validate(): Promise<ValidationResult>;
}

// #region Field

export interface FieldEvents {
  changed: [];
}

const DEFAULT_CONFIG: Partial<FieldConfig<UserData, string, UserData>> = {
  validateOn: undefined,
  revalidateOn: 'change',
  ignoreNativeValidation: false
};

export class Field<
  DATA extends UserData,
  NAME extends string = keyof DATA & string,
  VALUE = NAME extends keyof DATA ? DATA[NAME] : UserValue
> implements FieldAPI<DATA, NAME, VALUE>
{
  #config!: FieldConfig<DATA, NAME, VALUE>;
  #form: Form<DATA>;
  #value?: GetValue<DATA, NAME, VALUE>;
  #issues: Issue[] = [];
  #element?: FieldElement;
  #validated = false;
  #publisher = new Publisher<FieldEvents>();
  #linkedField?: Field<
    DATA,
    keyof DATA & string,
    keyof DATA & string extends keyof DATA ? DATA[keyof DATA & string] : unknown
  >;

  constructor(config: FullFieldConfig<DATA, NAME, VALUE>) {
    this.#form = config.form;
    this.updateConfig(config);
  }

  updateConfig(config: FieldConfig<DATA, NAME, VALUE>): void {
    const element = config.element;
    const conf = { ...config };

    delete conf.element;

    this.#config = {
      ...DEFAULT_CONFIG,
      ...conf
    } as FieldConfig<DATA, NAME, VALUE>;

    if (config.value) {
      this.#value = config.value;
    }

    if (element) {
      this.registerElement(element);
    }

    if (config.linkedField) {
      this.#linkField(config.linkedField);
    }
  }

  dispose(): void {
    if (this.#element) {
      this.#unregisterEventListeners(this.#element);
    }

    if (this.#linkedField) {
      this.#unlinkField(this.#linkedField);
    }
  }

  registerElement(element: FieldElement): void {
    if (this.#element) {
      this.#unregisterEventListeners(this.#element);
    }

    this.#element = element;

    this.#registerEventListeners(this.#element);
  }

  #registerEventListeners(element: FieldElement) {
    for (const event of VALIDATION_EVENTS) {
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      element.addEventListener(event, this.handleValidation);
    }
  }

  #unregisterEventListeners(element: FieldElement) {
    for (const event of VALIDATION_EVENTS) {
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      element.removeEventListener(event, this.handleValidation);
    }
  }

  subscribe<E extends keyof FieldEvents>(event: E, cb: Subscriber<FieldEvents, E>): void {
    this.#publisher.subscribe(event, cb);
  }

  unsubscribe<E extends keyof FieldEvents>(event: E, cb: Subscriber<FieldEvents, E>): void {
    this.#publisher.unsubscribe(event, cb);
  }

  #linkField(name: FieldNames<DATA> | (string & {})): void {
    if (this.#linkedField) {
      this.#unlinkField(this.#linkedField);
    }

    const linkedField = this.#form.getField(name);

    if (linkedField) {
      linkedField.subscribe('changed', this.handleLinkValidation);
      this.#linkedField = linkedField;
    }
  }

  #unlinkField(
    field: Field<
      DATA,
      keyof DATA & string,
      keyof DATA & string extends keyof DATA ? DATA[keyof DATA & string] : unknown
    >
  ): void {
    field.unsubscribe('changed', this.handleLinkValidation);
  }

  setIssues = (issues: Issue[]): void => {
    this.#issues = issues;
  };

  get issues(): Issue[] {
    return this.#issues;
  }

  get name(): GetName<DATA, NAME, VALUE> {
    return this.#config.name;
  }

  get value(): GetValue<DATA, NAME, VALUE> | undefined {
    return this.#value;
  }

  setValue = (value: VALUE): void => {
    this.#value = value;

    this.#publisher.notify('changed');
  };

  // #region Validation

  get validated(): boolean {
    return this.#validated;
  }

  get ignoreNativeValidation(): boolean {
    return Boolean(this.#config.ignoreNativeValidation);
  }

  handleLinkValidation = async (): Promise<void> => {
    const result = await this.validate();

    this.#config.validated?.('link', result);
  };

  handleValidation = async (event: Event): Promise<void> => {
    const validationEvent = this.#validated ? this.#config.revalidateOn : this.#config.revalidateOn;

    if (event.type === validationEvent) {
      const result = await this.validate();

      this.#config.validated?.(event.type, result);
    }
  };

  validate = async (): Promise<ValidationResult> => {
    const { value } = this;

    const nativeValidation =
      this.#element && !(this.ignoreNativeValidation || this.#form.ignoreNativeValidation)
        ? transformValidationResponse(validateNativeField(this.#element))
        : [];

    const customValidation = isValidationSchema(this.#config.validate)
      ? // eslint-disable-next-line unicorn/no-await-expression-member
        (((await validateSchema(value, this.#config.validate)).issues ?? []) as Issue[])
      : transformValidationResponse(
          await this.#config.validate?.({ value, name: this.name, form: this.#form })
        );

    const issues = [...nativeValidation, ...customValidation].map((i) => ({
      ...i,
      path: (i.path ?? [this.name]).map((segment) => normalizePathSegment(segment))
    }));

    this.setIssues(issues);

    this.#validated = true;

    if (issues.length === 0) {
      return {
        success: true,
        value
      };
    }

    return {
      success: false,
      value,
      issues
    };
  };
}

export function createField<
  DATA extends UserData,
  NAME extends string,
  VALUE = NAME extends keyof DATA ? DATA[NAME] : UserValue
>(config: FullFieldConfig<DATA, NAME, VALUE>): FieldAPI<DATA, NAME, VALUE> {
  return new Field(config);
}
