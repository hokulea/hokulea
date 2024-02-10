import Component from '@glimmer/component';
import { assert } from '@ember/debug';
import { fn, hash, uniqueId } from '@ember/helper';
import { get } from '@ember/object';

import { element } from 'ember-element-helper';

import styles from '@hokulea/core/forms.module.css';

import CaptureEventsModifier from '../modifiers/capture-events';
import Description from './description';
import Errors from './errors';
import Label from './label';

import type {
  ErrorRecord,
  FieldValidateCallback,
  FormData,
  FormKey,
  RegisterFieldCallback,
  UnregisterFieldCallback,
  UserData,
  ValidationError
} from '../';
import type { CaptureEventsModifierSignature } from '../modifiers/capture-events';
import type { ManagaValidationSignature } from '../modifiers/manage-validation';
import type { LabelSignature } from './label';
import type { ComponentLike, ModifierLike, WithBoundArgs } from '@glint/template';

export type BoundField<
  DATA extends UserData,
  KEY extends FormKey<FormData<DATA>> = FormKey<FormData<DATA>>
> = WithBoundArgs<
  typeof Field<DATA, KEY>,
  | 'data'
  | 'set'
  | 'errors'
  | 'registerField'
  | 'unregisterField'
  | 'triggerValidationFor'
  | 'fieldValidationEvent'
  | 'fieldRevalidationEvent'
  | 'manageValidation'
>;

export interface FieldArgs<
  DATA extends UserData,
  KEY extends FormKey<FormData<DATA>> = FormKey<FormData<DATA>>
> {
  /**
   * The name of your field, which must match a property of the `@data` passed to the form
   */
  name: KEY;

  /**
   * Provide a custom validation function, that operates only on this specific field. Eventual validation errors are merged with native validation errors to determine the effective set of errors rendered for the field.
   *
   * Return undefined when no validation errors are present, otherwise an array of (one or multiple) `ValidationError`s.
   */
  validate?: FieldValidateCallback<FormData<DATA>, KEY>;

  /**
   * The label for your field.
   *
   * Alternatively you can use `<:label>` block for more fine-control (which
   * takes precendence if both are given)
   */
  label: string;

  /**
   * The description for your field.
   *
   * Alternatively you can use `<:description>` block for more fine-control (which
   * takes precendence if both are given)
   */
  description?: string;
}

export interface FieldBlock<
  DATA extends UserData,
  KEY extends FormKey<FormData<DATA>> = FormKey<FormData<DATA>>
> {
  /**
   * The current value of the field's form data.
   *
   * If you don't use one of the supplied control components, then use this to pass the value to your custom component.
   */
  value?: DATA[KEY];

  /**
   * Action to update the (internal) form data for this field.
   *
   * If you don't use one of the supplied control components, then use this to update the value whenever your custom component's value has changed.
   */
  setValue: (value: DATA[KEY]) => void;

  /**
   * Unique ID of this field, used to associate the control with its label.
   *
   * If you don't use the supplied components, then you can use this as the `id` of the control and the `for` attribute of the `<label>`.
   */
  id: string;

  /**
   * Unique error ID of this field, used to associate the control with its validation error message.
   *
   * If you don't use the supplied components, then you can use this as the `id` of the validation error element and the `aria-errormessage` or `aria-describedby` attribute of the control.
   */
  errorId: string;

  /**
   * Will be `true` when validation was triggered and this field is invalid.
   *
   * You can use this to customize your markup, e.g. apply HTML classes for error styling.
   */
  invalid: boolean;

  /**
   * An array of raw ValidationError objects, for custom rendering of error output
   */
  rawErrors?: ValidationError<DATA[KEY]>[];

  /**
   * When calling this action, validation will be triggered.
   *
   * Can be used for custom controls that don't emit the `@validateOn` events that would normally trigger a dynamic validation.
   */
  triggerValidation: () => void;

  /**
   * Yielded modifier that when applied to the control element or any other element wrapping it will be able to recognize the `@validateOn` events and associate them to this field.
   *
   * This is only needed for very special cases, where the control is not a native form control or does not have the `@name` of the field assigned to the `name` attribute of the control.
   */
  captureEvents: WithBoundArgs<
    ModifierLike<CaptureEventsModifierSignature>,
    'event' | 'triggerValidation'
  >;

  manageValidation: WithBoundArgs<
    ModifierLike<ManagaValidationSignature<DATA>>,
    'invalid' | 'errorMessageId' | 'name' | 'showErrorsFor'
  >;
}

export type MultipleFieldBlock<
  DATA extends UserData,
  KEY extends FormKey<FormData<DATA>> = FormKey<FormData<DATA>>
> = FieldBlock<DATA, KEY> & {
  /**
   * The current value of the field's form data.
   *
   * If you don't use one of the supplied control components, then use this to pass the value to your custom component.
   */
  value?: DATA[KEY][];

  /**
   * Action to update the (internal) form data for this field.
   *
   * If you don't use one of the supplied control components, then use this to update the value whenever your custom component's value has changed.
   */
  setValue: (value: DATA[KEY][]) => void;
};

export interface FieldSignature<
  DATA extends UserData,
  KEY extends FormKey<FormData<DATA>> = FormKey<FormData<DATA>>
> {
  Element: HTMLDivElement;
  Args: FieldArgs<DATA, KEY> & {
    /*
     * @internal
     */
    data: FormData<DATA>;

    /*
     * @internal
     */
    set: (key: KEY, value: DATA[KEY]) => void;

    /*
     * @internal
     */
    errors?: ErrorRecord<DATA, KEY>;

    /*
     * @internal
     */
    registerField: RegisterFieldCallback<FormData<DATA>, KEY>;

    /*
     * @internal
     */
    unregisterField: UnregisterFieldCallback<FormData<DATA>, KEY>;

    /*
     * @internal
     */
    triggerValidationFor(name: KEY): Promise<void>;

    /*
     * @internal
     */
    fieldValidationEvent: 'focusout' | 'change' | 'input' | undefined;

    /*
     * @internal
     */
    fieldRevalidationEvent: 'focusout' | 'change' | 'input' | undefined;

    /**
     * @internal
     */
    element?: ComponentLike<{ Element: HTMLElement; Blocks: { default: [] } }>;

    /**
     * @internal
     */
    labelComponent?: ComponentLike<LabelSignature>;

    /**
     * @internal
     */
    manageValidation: WithBoundArgs<ModifierLike<ManagaValidationSignature<DATA>>, 'showErrorsFor'>;
  };
  Blocks: {
    default: [FieldBlock<DATA, KEY>];
  };
}

export default class Field<
  DATA extends FormData,
  KEY extends FormKey<FormData<DATA>> = FormKey<FormData<DATA>>
> extends Component<FieldSignature<DATA, KEY>> {
  // Label = this.args.labelComponent ?? Label;

  constructor(owner: unknown, args: FieldSignature<DATA, KEY>['Args']) {
    super(owner, args);

    assert(
      'Nested property paths in @name are not supported.',
      typeof this.args.name !== 'string' || !this.args.name.includes('.')
    );

    this.args.registerField(this.args.name, {
      validate: this.args.validate
    });
  }

  willDestroy(): void {
    this.args.unregisterField(this.args.name);

    super.willDestroy();
  }

  get value() {
    // when @mutableData is set, data is something we don't control, i.e. might require old-school get() to be on the safe side
    // we do not want to support nested property paths for now though, see the constructor assertion!
    return get(this.args.data, this.args.name);
  }

  get errors(): ValidationError<DATA[KEY]>[] | undefined {
    return this.args.errors?.[this.args.name];
  }

  get invalid(): boolean {
    return this.errors !== undefined;
  }

  get valueAsString(): string | undefined {
    assert(
      `Only string values are expected for ${String(this.args.name)}, but you passed ${typeof this
        .value}`,
      typeof this.value === 'undefined' || typeof this.value === 'string'
    );

    return this.value;
  }

  get valueAsStringOrNumber(): string | number | undefined {
    assert(
      `Only string or number values are expected for ${String(
        this.args.name
      )}, but you passed ${typeof this.value}`,
      typeof this.value === 'undefined' ||
        typeof this.value === 'string' ||
        typeof this.value === 'number'
    );

    return this.value;
  }

  get valueAsBoolean(): boolean | undefined {
    assert(
      `Only boolean values are expected for ${String(this.args.name)}, but you passed ${typeof this
        .value}`,
      typeof this.value === 'undefined' || typeof this.value === 'boolean'
    );

    return this.value;
  }

  setValue = (value: DATA[KEY]): void => {
    this.args.set(this.args.name, value as DATA[KEY]);
  };

  <template>
    {{#let
      (uniqueId) (uniqueId) (fn @triggerValidationFor @name) (if @element @element (element 'div'))
      as |fieldId errorId triggerValidation Element|
    }}
      <Element class={{styles.field}} data-test-field={{@name}}>
        {{#if @label}}
          {{#let (if @labelComponent @labelComponent Label) as |L|}}
            <L for={{unless @labelComponent fieldId}}>{{@label}}</L>
          {{/let}}
        {{/if}}

        {{#if @description}}
          <Description>{{@description}}</Description>
        {{/if}}

        {{yield
          (hash
            value=this.value
            setValue=this.setValue
            id=fieldId
            errorId=errorId
            invalid=this.invalid
            rawErrors=this.errors
            triggerValidation=triggerValidation
            captureEvents=(modifier
              CaptureEventsModifier
              event=(if this.invalid @fieldRevalidationEvent @fieldValidationEvent)
              triggerValidation=triggerValidation
            )
            manageValidation=(modifier
              @manageValidation invalid=this.invalid errorMessageId=errorId name=@name
            )
          )
        }}

        {{#if this.errors}}
          <Errors @id={{errorId}} @errors={{this.errors}} />
        {{/if}}
      </Element>
    {{/let}}
  </template>
}
