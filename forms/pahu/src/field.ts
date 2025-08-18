import Publisher from './-utils';
import { VALIDATION_EVENTS } from './definitions';
import {
  isValidationSchema,
  normalizePathSegment,
  transformValidationResponse,
  validateNativeFields,
  validateSchema
} from './validation';

import type { Signal, Subscriber } from './-utils';
import type {
  FieldElement,
  FieldNames,
  Issue,
  UserData,
  UserValue,
  ValidatedCallback,
  ValidationMode,
  ValidationResponse,
  ValidationResult
} from './definitions';
import type { Form, FormAPI } from './form';
import type { StandardSchemaV1 } from '@standard-schema/spec';

// #region Types

export type FieldValue<DATA, NAME, VALUE> = NAME extends keyof DATA ? DATA[NAME] : VALUE;

/**
 * Callback used for field level validation
 */
export type FieldValidationHandler<
  DATA extends UserData,
  NAME extends string = FieldNames<DATA> | (string & {}),
  VALUE = NAME extends keyof DATA ? DATA[NAME] : UserValue
> = (data: {
  name: NAME;
  value?: FieldValue<DATA, NAME, VALUE>;
  form: FormAPI<DATA>;
}) => ValidationResponse | Promise<ValidationResponse>;

/** Validator for a Field. Either a callback function or pass a schema */
type FieldValidator<DATA extends UserData, NAME extends string, VALUE> =
  | FieldValidationHandler<DATA, NAME, VALUE>
  | StandardSchemaV1;

// #region Config

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
  validateOn?: ValidationMode;

  /**
   * Revalidation happens when this event is triggered
   *
   * This overrides the value set at the form
   */
  revalidateOn?: ValidationMode;

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

  name: NAME | FieldNames<DATA>; // the `| FieldNames<DATA>` gives the autocomplete

  // not happy about this, but here we are (see next comment)
  value?: FieldValue<DATA, NAME, VALUE>;
};
// It would be much preferable to use the following intersection, which only
// asks for the `value` property, when not being able to take it from DATA. That
// would strengthen the types and throw a proper error.
//
// Unfortunately Ember seems to be incompatible with such a form of args
// see: https://github.com/typed-ember/glint/issues/934
//  & (NAME extends keyof DATA ? {} : { value?: FieldValue<DATA, NAME, VALUE> });

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
  readonly name: NAME;
  /** Value of the field */
  readonly value?: FieldValue<DATA, NAME, VALUE>;
  /** Shall it ignore native (HTML) validation? */
  readonly ignoreNativeValidation: boolean;
  readonly issues: Issue[];

  readonly invalid: boolean;

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

  setIssues(issues: Issue[]): void;

  /**
   * Sets the fields value
   *
   * @param value the new value
   */
  setValue(value: FieldValue<DATA, NAME, VALUE>): void;

  /**
   * Validate the field
   */
  validate(): Promise<ValidationResult>;

  /** For advanced usage, mostly for framework integration */
  subtle: {
    /**
     * Register a HTML element with the field
     *
     * @param element the HTML element
     */
    registerElement(element: FieldElement): void;
  };
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
  NAME extends string = FieldNames<DATA> | (string & {}),
  VALUE = NAME extends keyof DATA ? DATA[NAME] : UserValue
> implements FieldAPI<DATA, NAME, VALUE>
{
  #config!: FieldConfig<DATA, NAME, VALUE>;
  #form: Form<DATA>;
  #value: Signal<FieldValue<DATA, NAME, VALUE>>;
  #issues: Signal<Issue[]>;
  #elements = new Set<FieldElement>();
  #validated: Signal<boolean>;
  #publisher = new Publisher<FieldEvents>();
  #linkedField?: Field<DATA, NAME, VALUE>;

  constructor(config: FullFieldConfig<DATA, NAME, VALUE>) {
    this.#form = config.form;
    this.#value = this.#form.makeSignal<FieldValue<DATA, NAME, VALUE>>();
    this.#issues = this.#form.makeSignal<Issue[]>([]);
    this.#validated = this.#form.makeSignal<boolean>(false);
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

    if ('value' in config) {
      this.#value.set(config.value as FieldValue<DATA, NAME, VALUE>);
    }

    if (element) {
      this.registerElement(element);
    }

    if (config.linkedField) {
      this.#linkField(config.linkedField);
    }
  }

  subtle = {
    registerElement: (element: FieldElement): void => {
      this.registerElement(element);
    }
  };

  dispose(): void {
    for (const element of this.#elements) {
      this.#unregisterEventListeners(element);
    }

    this.#elements.clear();

    if (this.#linkedField) {
      this.#unlinkField(this.#linkedField);
    }
  }

  registerElement(element: FieldElement): void {
    if (!this.#elements.has(element)) {
      this.#elements.add(element);
      this.#registerEventListeners(element);
    }
  }

  unregisterElement(element: FieldElement): void {
    if (this.#elements.has(element)) {
      this.#elements.delete(element);
      this.#unregisterEventListeners(element);
    }
  }

  #registerEventListeners(element: FieldElement) {
    for (const event of VALIDATION_EVENTS) {
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      element.addEventListener(event, this.handleValidation, { passive: true });
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

    const linkedField = this.#form.getField(name) as Field<DATA, NAME, VALUE> | undefined;

    if (linkedField) {
      linkedField.subscribe('changed', this.handleLinkValidation);
      this.#linkedField = linkedField;
    }
  }

  #unlinkField(field: Field<DATA, NAME, VALUE>): void {
    field.unsubscribe('changed', this.handleLinkValidation);
  }

  setIssues = (issues: Issue[]): void => {
    this.#issues.set(issues);
  };

  get issues(): Issue[] {
    return this.#issues.get();
  }

  get name(): NAME {
    return this.#config.name as NAME;
  }

  get value(): FieldValue<DATA, NAME, VALUE> | undefined {
    return this.#value.get();
  }

  setValue = (value: FieldValue<DATA, NAME, VALUE>): void => {
    this.#value.set(value);

    this.#publisher.notify('changed');
  };

  // #region Validation

  get validated(): boolean {
    return this.#validated.get();
  }

  get invalid(): boolean {
    return this.issues.length > 0;
  }

  get ignoreNativeValidation(): boolean {
    return Boolean(this.#config.ignoreNativeValidation);
  }

  handleLinkValidation = async (): Promise<void> => {
    const result = await this.validate();

    this.#config.validated?.('link', result);
  };

  handleValidation = async (event: Event): Promise<void> => {
    const validationEvent = this.#validated.get()
      ? this.#config.revalidateOn
      : this.#config.validateOn;

    if (event.type === validationEvent) {
      const result = await this.validate();

      this.#config.validated?.(event.type, result);
    }
  };

  validate = async (): Promise<ValidationResult> => {
    const { value } = this;

    const nativeValidation =
      this.ignoreNativeValidation || this.#form.ignoreNativeValidation
        ? []
        : validateNativeFields([...this.#elements]);

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

    this.#validated.set(true);

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
