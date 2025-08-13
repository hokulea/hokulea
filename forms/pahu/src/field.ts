import { VALIDATION_EVENTS } from './definitions';
import {
  isValidationSchema,
  transformValidationResponse,
  validateNativeField,
  validateSchema
} from './validation';

import type {
  FieldElement,
  FieldValidationResponse,
  Issue,
  UserData,
  UserValue,
  ValidationMode,
  ValidationResult
} from './definitions';
import type { Form } from './form';
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
  form: Form<DATA>;
}) => FieldValidationResponse | Promise<FieldValidationResponse>;

/** Validator for a Field. Either a callback function or pass a schema */
type FieldValidator<DATA extends UserData, NAME extends string, VALUE> =
  | FieldValidateCallback<DATA, NAME, VALUE>
  | StandardSchemaV1;

/**
 * Configuration for a Field
 */
export type FieldConfig<DATA extends UserData, NAME extends string, VALUE> = {
  element?: FieldElement;
  ignoreNativeValidation?: boolean;

  // validators?: Record<ValidationMode, FieldValidator>;
  validate?: FieldValidator<DATA, NAME, VALUE>;
  validateOn?: ValidationMode | undefined;
  revalidateOn?: ValidationMode | undefined;
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

  /**
   * Removes this field from the form and cleans up all held references
   */
  dispose(): void;

  /**
   * Update the config
   *
   * @param config the new config
   */
  updateConfig(config: FieldConfig<DATA, NAME, VALUE>): void;

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

  constructor(config: FullFieldConfig<DATA, NAME, VALUE>) {
    this.updateConfig(config);
    this.#form = config.form;
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
  }

  dispose(): void {
    if (this.#element) {
      this.#unregisterEventListeners(this.#element);
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
      element.addEventListener(event, this.validate);
    }
  }

  #unregisterEventListeners(element: FieldElement) {
    for (const event of VALIDATION_EVENTS) {
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      element.removeEventListener(event, this.validate);
    }
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
  };

  // #region Validation

  get ignoreNativeValidation(): boolean {
    return Boolean(this.#config.ignoreNativeValidation);
  }

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
      path: i.path ?? [this.name]
    }));

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
