import { VALIDATION_EVENTS } from './definitions';
import { createField } from './field';
import {
  isValidationSchema,
  normalizePathSegment,
  transformSchemaPath,
  transformValidationResponse,
  validateNativeForm,
  validateSchema
} from './validation';

import type {
  Issue,
  UserData,
  UserValue,
  ValidatedCallback,
  ValidationMode,
  ValidationResponse,
  ValidationResult
} from './definitions';
import type { Field, FieldAPI, FieldConfig } from './field';
import type { StandardSchemaV1 } from '@standard-schema/spec';

// #region Config & Types

export type FormOutput<DATA extends UserData> = Record<string, FormDataEntryValue> & DATA;

/**
 * Callback used for field level validation
 */
export type FormValidateCallback<DATA extends UserData> = (data: {
  data: FormOutput<DATA>;
}) => ValidationResponse | Promise<ValidationResponse>;

/** Validator for a Form. Either a callback function or pass a schema */
type FormValidator<DATA extends UserData> = FormValidateCallback<DATA> | StandardSchemaV1;

/**
 * Configuration for a Form
 */
export type FormConfig<DATA extends UserData> = Readonly<{
  /**
   * Register the `<form>` element
   */
  element?: HTMLFormElement;

  /**
   * The data for the form
   */
  data?: DATA | undefined;

  /**
   * Validation happens when this event is triggered
   */
  validateOn?: ValidationMode | undefined;

  /**
   * Revalidation happens when this event is triggered
   */
  revalidateOn?: ValidationMode | undefined;

  /**
   * Whether native validation is ignored
   */
  ignoreNativeValidation?: boolean;

  /**
   * Validation for the form
   */
  validate?: FormValidator<DATA>;

  /**
   * Called when the user has submitted the form and no validation errors have been determined.
   */
  submit?: (data: unknown) => void;

  /**
   * Called when the form is validated.
   *
   * Happens when:
   *
   * - form is submitted, but invalid
   * - a validation event is triggered
   */
  validated?: ValidatedCallback;
}>;

const DEFAULT_CONFIG: Partial<FormConfig<UserData>> = {
  validateOn: 'submit',
  revalidateOn: 'change',
  ignoreNativeValidation: false
};

// #region API

/**
 * Form
 */
interface FormAPI<DATA extends UserData> {
  /** Whether the form is currently invalid (due to failing validations) */
  readonly invalid: boolean;

  /** The event at which fields will be validated (can be overridden at field level) */
  readonly fieldValidationEvent: ValidationMode | undefined;

  /** The event at which fields will be revalidated (can be overridden at field level) */
  readonly fieldRevalidationEvent: ValidationMode | undefined;

  /** Whether native validation will ignoret (can be overridden at field level) */
  readonly ignoreNativeValidation: boolean;

  /**
   * Update the config
   *
   * @param config the new config
   */
  updateConfig(config: FormConfig<DATA>): void;

  /**
   * Registers the form element
   *
   * @param element the form element
   */
  registerElement(element: HTMLFormElement): void;

  /**
   * Create a new field in the form
   *
   * @param config The config for the field
   */
  createField<NAME extends string, VALUE = NAME extends keyof DATA ? DATA[NAME] : UserValue>(
    config: FieldConfig<DATA, NAME, VALUE> & {
      name: keyof DATA;
    }
  ): FieldAPI<DATA, NAME, VALUE>;
  createField<NAME extends string, VALUE = NAME extends keyof DATA ? DATA[NAME] : UserValue>(
    // eslint-disable-next-line @typescript-eslint/unified-signatures
    config: FieldConfig<DATA, NAME, VALUE>
  ): FieldAPI<DATA, NAME, VALUE>;

  /**
   * Remove a field from the form
   *
   * @param field the field to remove
   */
  removeField<NAME extends string, VALUE = NAME extends keyof DATA ? DATA[NAME] : UserValue>(
    field: FieldAPI<DATA, NAME, VALUE>
  ): void;

  /**
   * Validate the form
   */
  validate(): Promise<ValidationResult>;

  /**
   * Submit the form, will run validation
   *
   * Use `submit` and `invalidated` handlers
   */
  submit(): Promise<void>;
}

// #region Form

/** Form implementation */
export class Form<DATA extends UserData> implements FormAPI<DATA> {
  #config!: Omit<FormConfig<DATA>, 'element'>;
  #fields = new Map<string, Field<DATA>>();
  #element?: HTMLFormElement;

  invalid = false;

  constructor(config: FormConfig<DATA> = {}) {
    this.updateConfig(config);
  }

  updateConfig(config: FormConfig<DATA>): void {
    const element = config.element;
    const conf = { ...config };

    delete conf.element;

    this.#config = {
      // eslint-disable-next-line unicorn/no-useless-fallback-in-spread, @typescript-eslint/no-unnecessary-condition
      ...(this.#config ?? {}),
      ...(DEFAULT_CONFIG as Partial<FormConfig<DATA>>),
      ...conf
    };

    if (element) {
      this.registerElement(element);
    }
  }

  registerElement(element: HTMLFormElement): void {
    if (this.#element) {
      this.#unregisterEventListeners(this.#element);
    }

    this.#element = element;

    this.#registerEventListeners(this.#element);
  }

  #registerEventListeners(element: HTMLFormElement) {
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    element.addEventListener('submit', this.handleSubmit);

    for (const event of VALIDATION_EVENTS) {
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      element.addEventListener(event, this.handleValidation);
    }
  }

  #unregisterEventListeners(element: HTMLFormElement) {
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    element.removeEventListener('submit', this.handleSubmit);

    for (const event of VALIDATION_EVENTS) {
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      element.removeEventListener(event, this.handleValidation);
    }
  }

  #getFormData = (): Record<string, FormDataEntryValue> => {
    const data = new FormData(this.#element);

    return Object.fromEntries(data.entries()) as Record<string, FormDataEntryValue>;
  };

  #getFieldData = () => {
    return Object.fromEntries(this.#fields.values().map((f) => [f.name, f.value]));
  };

  // getFieldValue = (name: string): unknown => {
  //   const data = new FormData(this.#element);

  //   if (data.has(name)) {
  //     return data.get(name);
  //   }

  //   throw new Error(`Getting field value for '${name}': Field does not exist`);
  // };

  // #region Submissen

  submit = async (): Promise<void> => {
    await this.handleSubmit();
  };

  handleSubmit = async (event?: SubmitEvent): Promise<void> => {
    event?.preventDefault();

    const validationResult = await this.validate();

    if (validationResult.success) {
      this.invalid = false;
      this.#config.submit?.(validationResult.value);
    } else {
      this.invalid = true;
      this.#config.validated?.('submit', validationResult);
    }
  };

  // #region Fields

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  createField(config: any): FieldAPI<DATA, any, any> {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const field = createField<DATA, typeof config.name, typeof config.value>({
      ...config,
      form: this
    });

    // @ts-expect-error yeah, obviously sth is weird about typescript
    this.#registerField(field);

    return field;
  }

  removeField<NAME extends string, VALUE = NAME extends keyof DATA ? DATA[NAME] : UserValue>(
    field: FieldAPI<DATA, NAME, VALUE>
  ): void {
    field.dispose();
    this.#unregisterField(field);
  }

  #registerField<NAME extends string, VALUE = NAME extends keyof DATA ? DATA[NAME] : UserValue>(
    field: Field<DATA, NAME, VALUE>
  ): void {
    if (this.#fields.has(field.name)) {
      throw new Error(`Cannot register Field. Field with name '${field.name}' already exists`);
    }

    // @ts-expect-error yeah, we cannot know the key in the constructor of the
    // class
    this.#fields.set(field.name, field);
  }

  #unregisterField<NAME extends string, VALUE = NAME extends keyof DATA ? DATA[NAME] : UserValue>(
    field: FieldAPI<DATA, NAME, VALUE>
  ): void {
    if (this.#fields.has(field.name)) {
      this.#fields.delete(field.name);
    }
  }

  // #region Validation

  get ignoreNativeValidation(): boolean {
    return Boolean(this.#config.ignoreNativeValidation);
  }

  handleValidation = async (event: Event): Promise<void> => {
    if (event.type === this.#config.validateOn) {
      const result = await this.validate();

      this.#config.validated?.(event.type, result);
    }
  };

  validate = async (): Promise<ValidationResult> => {
    const issues: Issue[] = [];

    issues.push(
      ...(!this.ignoreNativeValidation && this.#element
        ? transformValidationResponse(validateNativeForm(this.#element))
        : [])
    );

    const data = { ...this.#getFormData(), ...this.#getFieldData() } as FormOutput<DATA>;

    if (isValidationSchema(this.#config.validate)) {
      issues.push(
        // eslint-disable-next-line unicorn/no-await-expression-member
        ...(((await validateSchema(data, this.#config.validate)).issues ?? []) as Issue[])
      );
    } else {
      issues.push(...transformValidationResponse((await this.#config.validate?.({ data })) ?? []));
    }

    // validate fields
    for (const field of this.#fields.values()) {
      const result = await field.validate();

      if (!result.success) {
        issues.push(...result.issues);
      }
    }

    const normalizedIssues = issues
      .filter((i) => i.path !== undefined)
      .map((i) => ({
        ...i,
        path: i.path ? i.path.map((segment) => normalizePathSegment(segment)) : undefined
      }));

    // attach issues to fields
    const issuesByField = Object.groupBy(
      normalizedIssues
        .filter((i) => i.path !== undefined)
        .map((i) => ({
          ...i,
          fieldName: transformSchemaPath(i.path) as string
        })),
      ({ fieldName }) => fieldName
    );

    for (const [fieldName, fieldIssues] of Object.entries(issuesByField)) {
      if (this.#fields.has(fieldName)) {
        const field = this.#fields.get(fieldName) as Field<DATA>;

        field.setIssues(fieldIssues as Issue[]);
      }
    }

    if (issues.length === 0) {
      return {
        success: true,
        value: data
      };
    }

    return {
      success: false,
      value: data,
      issues: normalizedIssues
    };
  };

  /**
   * Return the event type that will be listened on for dynamic validation (i.e. *before* submitting)
   */
  get fieldValidationEvent(): ValidationMode | undefined {
    const { validateOn } = this.#config;

    return validateOn === 'submit'
      ? // no need for dynamic validation, as validation always happens on submit
        undefined
      : validateOn;
  }

  /**
   * Return the event type that will be listened on for dynamic *re*validation, i.e. updating the validation status of a field that has been previously marked as invalid
   */
  get fieldRevalidationEvent(): ValidationMode | undefined {
    const { validateOn, revalidateOn } = this.#config;

    return revalidateOn === 'submit'
      ? // no need for dynamic validation, as validation always happens on submit
        undefined
      : // when validation happens more frequently than revalidation, then we can ignore revalidation, because the validation handler will already cover us
        validateOn === 'input' ||
          (validateOn === 'change' && revalidateOn === 'focusout') ||
          validateOn === revalidateOn
        ? undefined
        : revalidateOn;
  }
}

export function createForm<DATA extends UserData = UserData>(
  config: FormConfig<DATA> = {}
): FormAPI<DATA> {
  return new Form(config);
}

// const form = createForm({ data: { givenName: '' } });

// const field = form.createField({ name: 'csie', value: 123 });
// const f2 = form.createField({ name: 'givenName', value: 123 });

// const f = form.createField({ name: 'oink', value: 123 });
// const f3 = form.createField({
//   name: 'oink2',
//   value: '123',
//   validate: ({ value }) => (value === 456 ? 'die alte hex' : undefined)
// });

// const email = form.createField({
//   name: 'email',
//   value: 'localhost@domain',
//   validate: ({ value }) => (value.includes('@') ? undefined : 'Email must include an @ sign')
// });
