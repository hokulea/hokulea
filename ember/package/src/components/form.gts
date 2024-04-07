import Component from '@glimmer/component';
import { cached, tracked } from '@glimmer/tracking';
import { assert, warn } from '@ember/debug';
import { hash } from '@ember/helper';
import { on } from '@ember/modifier';
import { set } from '@ember/object';

import { TrackedAsyncData } from 'ember-async-data';
import { modifier } from 'ember-modifier';
import { TrackedObject } from 'tracked-built-ins';

import styles from '@hokulea/core/forms.module.css';

import { mergeErrorRecord } from '../-private/form';
import Field from '../-private/form/components/field';
import CheckboxField from '../-private/form/components/fields/checkbox';
import CurrencyField from '../-private/form/components/fields/currency';
import DateField from '../-private/form/components/fields/date';
import EmailField from '../-private/form/components/fields/email';
import ListField from '../-private/form/components/fields/list';
import MultipleChoiceField from '../-private/form/components/fields/multiple-choice';
import NumberField from '../-private/form/components/fields/number';
import PasswordField from '../-private/form/components/fields/password';
import PhoneField from '../-private/form/components/fields/phone';
import SelectField from '../-private/form/components/fields/select';
import SingularChoiceField from '../-private/form/components/fields/singular-choice';
import TextField from '../-private/form/components/fields/text';
import TextAreaField from '../-private/form/components/fields/text-area';
import Reset from '../-private/form/components/reset';
import Submit from '../-private/form/components/submit';
import ManagaValidationModifier from '../-private/form/modifiers/manage-validation';

import type {
  ErrorRecord,
  FieldRegistrationData,
  FieldValidateCallback,
  FormData,
  FormKey,
  FormValidateCallback,
  UserData,
  ValidationError
} from '../-private/form';
import type { BoundField } from '../-private/form/components/field';
import type { WithBoundArgs } from '@glint/template';

type ValidateOn = 'change' | 'focusout' | 'submit' | 'input';

// eslint-disable-next-line @typescript-eslint/naming-convention
export interface FormSignature<DATA extends UserData, SUBMISSION_VALUE> {
  Element: HTMLFormElement;
  Args: {
    /**
     * The initial data the form will use to pre-populate the fields.
     *
     * Make sure the type of it matches what you expect the form to represent, i.e. the names of all form fields match the properties of the data and their respective types!
     */
    data?: DATA;

    /**
     * By default the data you pass as `@data` is never mutated by the form component, you will only receive the updated data (a copy) on successful submission via `@onSubmit`.
     * Setting this to `'mutable'` will mutate the data whenever the user updates a field. This is especially useful when the data already has some "buffering" behavior, like with `ember-changeset`.
     */
    dataMode?: 'mutable' | 'immutable';

    /**
     * Specify when to dynamically validate a field before even submitting the whole form. By default this is `submit`, which means no dynamic validation happens. Another common setting is to validate on `focusout`.
     */
    validateOn?: ValidateOn;

    /**
     * Specify when to revalidate a previously validated field that is invalid. By default this happens on `change`. Another common setting is to revalidate on `input`.
     * Mind that text-based inputs don't emit the `change` event on every key stroke, but only on focusing out. Changing this to `input` would make text-based inputs revalidate on every key stroke.
     */
    revalidateOn?: ValidateOn;

    /**
     * Provide a custom validation function, that operates on all fields of the form. Eventual validation errors are merged with native validation errors to determine the effective set of errors rendered in the form.
     *
     * Return undefined when no validation errors are present, otherwise an `ErrorRecord` mapping (one or multiple) `ValidationError`s to each invalid field.
     */
    validate?: FormValidateCallback<DATA>;

    /**
     * Allows you to opt-out of native validation.
     *
     * This can be useful if all of the validation logic is already handled by the `@validate` hooks, but you have form controls that have validation requirements (e.g. `email` type) that would cause the native validation to interfere.
     */
    ignoreNativeValidation?: boolean;

    /**
     * Called when the user has submitted the form and no validation errors have been determined. Receives the new form data, or in case of `@dataMode="mutable"` the original data object.
     */
    submit?: (data: FormData<DATA>) => SUBMISSION_VALUE | Promise<SUBMISSION_VALUE>;

    /**
     * Called when the user tried to submit the form, but validation failed. Receives the new data (or in case of `@dataMode="mutable"` the original data object), and the record of validation errors by field.
     */
    invalidated?: (data: FormData<DATA>, errors: ErrorRecord<FormData<DATA>>) => void;
  };
  Blocks: {
    default: [
      {
        Checkbox: WithBoundArgs<typeof CheckboxField<DATA>, 'Field'>;
        Currency: WithBoundArgs<typeof CurrencyField<DATA>, 'Field'>;
        Date: WithBoundArgs<typeof DateField<DATA>, 'Field'>;
        Email: WithBoundArgs<typeof EmailField<DATA>, 'Field'>;
        List: WithBoundArgs<typeof ListField<DATA>, 'Field'>;
        MultipleChoice: WithBoundArgs<typeof MultipleChoiceField<DATA>, 'Field'>;
        Number: WithBoundArgs<typeof NumberField<DATA>, 'Field'>;
        Password: WithBoundArgs<typeof PasswordField<DATA>, 'Field'>;
        Phone: WithBoundArgs<typeof PhoneField<DATA>, 'Field'>;
        Select: WithBoundArgs<typeof SelectField<DATA>, 'Field'>;
        SingularChoice: WithBoundArgs<typeof SingularChoiceField<DATA>, 'Field'>;
        Text: WithBoundArgs<typeof TextField<DATA>, 'Field'>;
        TextArea: WithBoundArgs<typeof TextAreaField<DATA>, 'Field'>;
        Field: BoundField<DATA>;
        Submit: typeof Submit;
        Reset: typeof Reset;

        /**
         * The (async) validation state as `TrackedAsyncData`.
         *
         * Use derived state like `.isPending` to render the UI conditionally.
         */
        validationState?: TrackedAsyncData<ErrorRecord<DATA>>;

        /**
         * The (async) submission state as `TrackedAsyncData`.
         *
         * Use derived state like `.isPending` to render the UI conditionally.
         */
        submissionState?: TrackedAsyncData<SUBMISSION_VALUE>;

        /**
         * Will be true if at least one form field is invalid.
         */
        invalid: boolean;

        /**
         * An ErrorRecord, for custom rendering of error output
         */
        rawErrors?: ErrorRecord<DATA>;

        /**
         * Yielded action that will trigger form validation and submission, same as when triggering the native `submit` event on the form.
         */
        submit: () => void;

        /**
         * Yielded action that will reset form state, same as when triggering the native `reset` event on the form.
         */
        reset: () => void;
      }
    ];
  };
}

/**
 * This internal data structure maintains information about each field that is registered to the form by `registerField`.
 */
class FieldData<DATA extends FormData, KEY extends FormKey<DATA> = FormKey<DATA>> {
  constructor(fieldRegistration: FieldRegistrationData<DATA, KEY>) {
    this.validate = fieldRegistration.validate;
  }

  /**
   * tracked state that enabled a dynamic validation of a field *before* the whole form is submitted, e.g. by `@validateOn="blur" and the blur event being triggered for that particular field.
   */
  @tracked validationEnabled = false;

  /**
   * The *field* level validation callback passed to the field as in `<form.field @name="foo" @validate={{this.validateCallback}}>`
   */
  validate?: FieldValidateCallback<DATA, KEY>;
}

/**
 * Headless form component.
 *
 * @example
 * Usage example:
 *
 * ```hbs
 * <HeadlessForm
 *   @data={{this.data}}
 *   @validateOn="focusout"
 *   @revalidateOn="input"
 *   @onSubmit={{this.doSomething}}
 *   as |form|
 * >
 *   <form.Field @name="firstName" as |field|>
 *     <div>
 *       <field.Label>First name</field.Label>
 *       <field.Input
 *         required
 *       />
 *       <field.errors />
 *     </div>
 *   </form.Field>
 *
 *   <button
 *     type="submit"
 *   >Submit</button>
 * </HeadlessForm>
 * ```
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
export default class Form<DATA extends UserData, SUBMISSION_VALUE> extends Component<
  FormSignature<DATA, SUBMISSION_VALUE>
> {
  Field = Field<DATA>;
  CheckboxField = CheckboxField<DATA>;
  CurrencyField = CurrencyField<DATA>;
  DateField = DateField<DATA>;
  EmailField = EmailField<DATA>;
  ListField = ListField<DATA>;
  MultipleChoiceField = MultipleChoiceField<DATA>;
  NumberField = NumberField<DATA>;
  PasswordField = PasswordField<DATA>;
  PhoneField = PhoneField<DATA>;
  SelectField = SelectField<DATA>;
  SingularChoiceField = SingularChoiceField<DATA>;
  TextField = TextField<DATA>;
  TextAreaField = TextAreaField<DATA>;
  ManagaValidationModifier = ManagaValidationModifier<DATA>;

  formElement?: HTMLFormElement;

  registerForm = modifier((el: HTMLFormElement, _p: []) => {
    this.formElement = el;
  });

  submit = async (e?: Event): Promise<void> => {
    e?.preventDefault();

    await this.validateWithState();
    this.showAllValidations = true;

    if (!this.validationErrorsExist) {
      if (this.args.submit) {
        this.submissionState = new TrackedAsyncData(this.args.submit(this.effectiveData));
      }
    } else {
      assert(
        'Validation errors expected to be present. If you see this, please report it as a bug to ember-headless-form!',
        // with optional chaining this leads to a NPE
        // eslint-disable-next-line @typescript-eslint/prefer-optional-chain
        this.validationState && this.validationState.isResolved
      );
      this.args.invalidated?.(this.effectiveData, this.validationState.value);
    }
  };

  reset = async (e?: Event): Promise<void> => {
    e?.preventDefault();

    for (const key of Object.keys(this.internalData)) {
      delete this.internalData[key as keyof DATA];
    }

    this.validationState = undefined;
    this.submissionState = undefined;
  };

  /**
   * A copy of the passed `@data` stored internally, which is only passed back to the component consumer after a (successful) form submission.
   */
  internalData: DATA = new TrackedObject({}) as DATA;

  @cached
  get effectiveData(): DATA {
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    const obj: DATA = this.args.data ?? ({} as DATA);

    if (this.args.dataMode === 'mutable') {
      return obj;
    }

    const { internalData } = this;

    return new Proxy(obj, {
      get(target, prop) {
        return prop in internalData ? internalData[prop as keyof DATA] : Reflect.get(target, prop);
      },

      set(_target, property, value) {
        return Reflect.set(internalData, property, value);
      },

      has(target, prop) {
        return prop in internalData ? true : Reflect.has(target, prop);
      },

      getOwnPropertyDescriptor(target, prop) {
        return Reflect.getOwnPropertyDescriptor(prop in internalData ? internalData : target, prop);
      },

      ownKeys(target) {
        return (
          [...Reflect.ownKeys(target), ...Reflect.ownKeys(internalData)]
            // return only unique values
            .filter((value, index, array) => array.indexOf(value) === index)
        );
      },

      deleteProperty(_target, prop) {
        if (prop in internalData) {
          delete internalData[prop as keyof DATA];
        }

        return true;
      }
    });
  }

  fields = new Map<FormKey<FormData<DATA>>, FieldData<FormData<DATA>>>();

  registerField = (
    name: FormKey<FormData<DATA>>,
    field: FieldRegistrationData<FormData<DATA>>
  ): void => {
    assert(
      `You passed @name="${String(
        name
      )}" to the form field, but this is already in use. Names of form fields must be unique!`,
      !this.fields.has(name)
    );
    this.fields.set(name, new FieldData(field));
  };

  unregisterField = (name: FormKey<FormData<DATA>>): void => {
    this.fields.delete(name);
  };

  set = <KEY extends FormKey<FormData<DATA>>>(key: KEY, value: DATA[KEY]): void => {
    // when @mutableData is set, our effectiveData is something we don't control, i.e. might require old-school set() to be on the safe side
    set(this.effectiveData, key, value);

    // console.log('internalData', this.internalData);
  };

  @tracked validationState?: TrackedAsyncData<ErrorRecord<DATA>>;
  @tracked submissionState?: TrackedAsyncData<SUBMISSION_VALUE>;

  /**
   * When this is set to true by submitting the form, eventual validation errors are show for *all* field, regardless of their individual dynamic validation status in `FieldData#validationEnabled`
   */
  @tracked showAllValidations = false;

  get validateOn(): ValidateOn {
    return this.args.validateOn ?? 'submit';
  }

  get revalidateOn(): ValidateOn {
    return this.args.revalidateOn ?? 'change';
  }

  /**
   * Return the event type that will be listened on for dynamic validation (i.e. *before* submitting)
   */
  get fieldValidationEvent(): 'focusout' | 'change' | 'input' | undefined {
    const { validateOn } = this;

    return validateOn === 'submit'
      ? // no need for dynamic validation, as validation always happens on submit
        undefined
      : validateOn;
  }

  /**
   * Return the event type that will be listened on for dynamic *re*validation, i.e. updating the validation status of a field that has been previously marked as invalid
   */
  get fieldRevalidationEvent(): 'focusout' | 'change' | 'input' | undefined {
    const { validateOn, revalidateOn } = this;

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

  /**
   * Return true if validation has happened (by submitting or by an `@validateOn` event being triggered) and at least one field is invalid
   */
  get validationErrorsExist(): boolean {
    const { validationState } = this;

    // Only consider validation errors for which we actually have a field rendered
    return validationState?.isResolved
      ? Object.keys(validationState.value).some((name) =>
          this.fields.has(name as FormKey<FormData<DATA>>)
        )
      : false;
  }

  /**
   * Call the passed validation callbacks, defined both on the whole form as well as on field level, and return the merged result for all fields.
   */
  async validate(): Promise<ErrorRecord<FormData<DATA>>> {
    const nativeValidation = this.args.ignoreNativeValidation !== true ? this.validateNative() : {};
    const customFormValidation = await this.args.validate?.(
      this.effectiveData,
      Array.from(this.fields.keys())
    );
    const customFieldValidations: ErrorRecord<FormData<DATA>>[] = [];

    for (const [name, field] of this.fields) {
      const fieldValidationResult = await field.validate?.(
        this.effectiveData[name],
        name,
        this.effectiveData
      );

      if (fieldValidationResult) {
        customFieldValidations.push({
          [name]: fieldValidationResult
        } as ErrorRecord<FormData<DATA>>);
      }
    }

    return mergeErrorRecord(nativeValidation, customFormValidation, ...customFieldValidations);
  }

  validateWithState = async (): Promise<ErrorRecord<FormData<DATA>>> => {
    const promise = this.validate();

    this.validationState = new TrackedAsyncData(promise);

    return promise;
  };

  validateNative(): ErrorRecord<FormData<DATA>> | undefined {
    const form = this.formElement;

    assert(
      'Form element expected to be present. If you see this, please report it as a bug to ember-headless-form!',
      form
    );

    if (form.checkValidity()) {
      return;
    }

    const errors: ErrorRecord<FormData<DATA>> = {};

    for (const el of form.elements) {
      // This is just to make TS happy, as we need to access properties on el that only form elements have, but elements in `form.elements` are just typed as plain `Element`. Should never occur in reality.
      assert(
        'Unexpected form element. If you see this, please report it as a bug to ember-headless-form!',
        el instanceof HTMLInputElement ||
          el instanceof HTMLTextAreaElement ||
          el instanceof HTMLSelectElement ||
          el instanceof HTMLButtonElement ||
          el instanceof HTMLFieldSetElement ||
          el instanceof HTMLObjectElement ||
          el instanceof HTMLOutputElement
      );

      if (el.validity.valid) {
        continue;
      }

      const name = el.name as FormKey<FormData<DATA>>;

      if (this.fields.has(name)) {
        errors[name] = [
          {
            type: 'native',
            value: this.effectiveData[name],
            message: el.validationMessage
          }
        ];
      } else {
        warn(
          `An invalid form element with name "${name}" was detected, but this name is not used as a form field. It will be ignored for validation. Make sure to apply the correct name to custom form elements that participate in form validation!`,
          { id: 'headless-form.invalid-control-for-unknown-field' }
        );
      }
    }

    return errors;
  }

  /**
   * Return a mapping of field to validation errors, for all fields that are invalid *and* for which validation errors should be visible.
   * Validation errors will be visible for a certain field, if validation errors for *all* fields are visible, which is the case when trying to submit the form,
   * or when that field has triggered the event given by `@validateOn` for showing validation errors before submitting, e.g. on blur.
   */
  get visibleErrors(): ErrorRecord<FormData<DATA>> | undefined {
    if (!this.validationState?.isResolved) {
      return undefined;
    }

    const visibleErrors: ErrorRecord<FormData<DATA>> = {};

    for (const [field, errors] of Object.entries(this.validationState.value) as [
      FormKey<FormData<DATA>>,
      ValidationError<FormData<DATA>[FormKey<FormData<DATA>>]>[]
    ][]) {
      if (this.showErrorsFor(field)) {
        visibleErrors[field] = errors;
      }
    }

    return visibleErrors;
  }

  /**
   * Given a field name, return if eventual errors for the field should be visible. See `visibleErrors` for further details.
   */
  showErrorsFor = (field: FormKey<FormData<DATA>>): boolean => {
    return this.showAllValidations || (this.fields.get(field)?.validationEnabled ?? false);
  };

  /**
   * Handle the `@validateOn` event for a certain field, e.g. "blur".
   * Associating the event with a field is done by looking at the event target's `name` attribute, which must match one of the `<form.field @name="...">` invocations by the user's template.
   * Validation will be triggered, and the particular field will be marked to show eventual validation errors.
   */
  handleFieldValidation = async (e: Event | string): Promise<void> => {
    // eslint-disable-next-line @typescript-eslint/init-declarations
    let name: string;

    if (typeof e === 'string') {
      name = e;
    } else {
      const { target } = e;

      name = (target as HTMLInputElement).name;
    }

    if (name) {
      const field = this.fields.get(name as FormKey<FormData<DATA>>);

      if (field) {
        await this.validateWithState();
        field.validationEnabled = true;
      }
    } else if (e instanceof Event) {
      warn(
        `An event of type "${e.type}" was received by headless-form, which is supposed to trigger validations for a certain field. But the name of that field could not be determined. Make sure that your control element has a \`name\` attribute matching the field, or use the yielded \`{{field.captureEvents}}\` to capture the events.`,
        { id: 'headless-form.validation-event-for-unknown-field' }
      );
    }
  };

  /**
   * Handle the `@revalidateOn` event for a certain field, e.g. "blur".
   * Associating the event with a field is done by looking at the event target's `name` attribute, which must match one of the `<form.field @name="...">` invocations by the user's template.
   * When a field has been already marked to show validation errors by `@validateOn`, then for revalidation another validation will be triggered.
   *
   * The use case here is to allow this to happen more frequently than the initial validation, e.g. `@validateOn="blur" @revalidateOn="change"`.
   */
  handleFieldRevalidation = async (e: Event): Promise<void> => {
    const { target } = e;
    const { name } = target as HTMLInputElement;

    if (name) {
      if (this.showErrorsFor(name as FormKey<FormData<DATA>>)) {
        await this.validateWithState();
      }
    } else {
      warn(
        `An event of type "${e.type}" was received by headless-form, which is supposed to trigger validations for a certain field. But the name of that field could not be determined. Make sure that your control element has a \`name\` attribute matching the field, or use the yielded \`{{field.captureEvents}}\` to capture the events.`,
        { id: 'headless-form.validation-event-for-unknown-field' }
      );
    }
  };

  attachValidation = modifier(
    (el: HTMLFormElement, [eventName, handler]: [string | undefined, (e: Event) => void]) => {
      if (eventName) {
        el.addEventListener(eventName, handler);

        return () => el.removeEventListener(eventName, handler);
      }

      return undefined;
    }
  );

  <template>
    <form
      novalidate
      class={{styles.form}}
      data-test-form
      ...attributes
      {{this.registerForm}}
      {{on 'submit' this.submit}}
      {{on 'reset' this.reset}}
      {{this.attachValidation this.fieldValidationEvent this.handleFieldValidation}}
      {{this.attachValidation this.fieldRevalidationEvent this.handleFieldRevalidation}}
    >
      {{#let
        (component
          this.Field
          data=this.effectiveData
          set=this.set
          errors=this.visibleErrors
          registerField=this.registerField
          unregisterField=this.unregisterField
          triggerValidationFor=this.handleFieldValidation
          fieldValidationEvent=this.fieldValidationEvent
          fieldRevalidationEvent=this.fieldRevalidationEvent
          manageValidation=(modifier this.ManagaValidationModifier showErrorsFor=this.showErrorsFor)
        )
        as |BoundField|
      }}

        {{yield
          (hash
            Submit=Submit
            Reset=Reset
            Field=BoundField
            Checkbox=(component this.CheckboxField Field=BoundField)
            Currency=(component this.CurrencyField Field=BoundField)
            Date=(component this.DateField Field=BoundField)
            Email=(component this.EmailField Field=BoundField)
            List=(component this.ListField Field=BoundField)
            MultipleChoice=(component this.MultipleChoiceField Field=BoundField)
            Number=(component this.NumberField Field=BoundField)
            Password=(component this.PasswordField Field=BoundField)
            Phone=(component this.PhoneField Field=BoundField)
            Select=(component this.SelectField Field=BoundField)
            SingularChoice=(component this.SingularChoiceField Field=BoundField)
            Text=(component this.TextField Field=BoundField)
            TextArea=(component this.TextAreaField Field=BoundField)
            validationState=this.validationState
            submissionState=this.submissionState
            invalid=this.validationErrorsExist
            rawErrors=this.visibleErrors
            submit=this.submit
            reset=this.reset
          )
        }}
      {{/let}}
    </form>
  </template>
}
