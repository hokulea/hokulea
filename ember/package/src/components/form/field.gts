import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { hash, uniqueId } from '@ember/helper';
import { next } from '@ember/runloop';

import { element } from 'ember-element-helper';

import styles from '@hokulea/core/forms.module.css';

import { and } from '../../-private/helpers.ts';
import { Description } from './description.gts';
import { Errors } from './errors.gts';
import { Label } from './label.gts';
import { Rules } from './rules.gts';

import type { LabelSignature } from './label.gts';
import type { AttrValue, ComponentLike, WithBoundArgs } from '@glint/template';
import type {
  FieldAPI,
  FieldConfig,
  FieldNames,
  FieldValue,
  FormAPI,
  Issue,
  UserData
} from '@hokulea/ember-pahu';

export type BoundField<
  DATA extends UserData,
  NAME extends string = FieldNames<DATA> | (string & {}),
  VALUE = NAME extends keyof DATA ? DATA[NAME] : AttrValue
> = WithBoundArgs<typeof Field<DATA, NAME, VALUE>, 'form'>;

export type FieldArgs<
  DATA extends UserData,
  NAME extends string = FieldNames<DATA> | (string & {}),
  VALUE = NAME extends keyof DATA ? DATA[NAME] : AttrValue
> = FieldConfig<DATA, NAME, VALUE> & {
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
};

export interface FieldBlock<
  DATA extends UserData,
  NAME extends string = FieldNames<DATA> | (string & {}),
  VALUE = NAME extends keyof DATA ? DATA[NAME] : AttrValue
> {
  /**
   * The field's current value.
   *
   * If you don't use one of the supplied control components, then use this to pass the value to your custom component.
   */
  value?: FieldValue<DATA, NAME, VALUE>;

  /**
   * Action to update the (internal) form data for this field.
   *
   * If you don't use one of the supplied control components, then use this to update the value whenever your custom component's value has changed.
   */
  setValue: (value: FieldValue<DATA, NAME, VALUE>) => void;

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

  registerElement: FieldAPI<DATA, NAME, VALUE>['registerElement'];

  showErrors: boolean;

  /**
   * An array of raw ValidationError objects, for custom rendering of error output
   */
  issues: Issue[];

  /**
   * When calling this action, validation will be triggered.
   *
   * Can be used for custom controls that don't emit the `@validateOn` events that would normally trigger a dynamic validation.
   */
  validate: FieldAPI<DATA, NAME, VALUE>['validate'];

  Rules: WithBoundArgs<typeof Rules, 'useRules' | 'errors' | 'id'>;
}

export type MultipleFieldBlock<
  DATA extends UserData,
  NAME extends string = FieldNames<DATA> | (string & {}),
  VALUE = NAME extends keyof DATA ? DATA[NAME] : AttrValue
> = Omit<FieldBlock<DATA, NAME, VALUE>, 'value' | 'setValue'> & {
  /**
   * The current value of the field's form data.
   *
   * If you don't use one of the supplied control components, then use this to pass the value to your custom component.
   */
  value?: FieldValue<DATA, NAME, VALUE>[];

  /**
   * Action to update the (internal) form data for this field.
   *
   * If you don't use one of the supplied control components, then use this to update the value whenever your custom component's value has changed.
   */
  setValue: (value: FieldValue<DATA, NAME, VALUE>[]) => void;
};

export interface FieldSignature<
  DATA extends UserData,
  NAME extends string,
  VALUE = NAME extends keyof DATA ? DATA[NAME] : AttrValue
> {
  Element: HTMLDivElement;
  Args: Omit<FieldArgs<DATA, NAME, VALUE>, 'element'> & {
    /** @internal */
    form: FormAPI<DATA>;

    /** @internal */
    element?: ComponentLike<{ Element: HTMLElement; Blocks: { default: [] } }>;

    /** @internal */
    labelComponent?: ComponentLike<LabelSignature>;

    showErrors?: boolean;
  };
  Blocks: {
    default: [FieldBlock<DATA, NAME, VALUE>];
  };
}

export class Field<
  DATA extends UserData,
  NAME extends string = FieldNames<DATA> | (string & {}),
  VALUE = NAME extends keyof DATA ? DATA[NAME] : AttrValue
> extends Component<FieldSignature<DATA, NAME, VALUE>> {
  @tracked rulesUsed = false;
  #field?: FieldAPI<DATA, NAME, VALUE>;

  get validateOn() {
    return this.rulesUsed ? 'input' : this.args.validateOn;
  }

  get revalidateOn() {
    return this.rulesUsed ? 'input' : this.args.revalidateOn;
  }

  createOrUpdateField = (config: FieldConfig<DATA, NAME, VALUE>): FieldAPI<DATA, NAME, VALUE> => {
    const filteredConfig = Object.fromEntries(
      Object.entries(config).filter(([_, v]) => v !== undefined)
    ) as FieldConfig<DATA, NAME, VALUE>;

    if (this.#field) {
      this.#field.updateConfig(filteredConfig);
    } else {
      this.#field = this.args.form.createField<NAME, VALUE>(filteredConfig);
    }

    return this.#field;
  };

  useRules = (useRules: boolean) => {
    // eslint-disable-next-line ember/no-runloop
    next(async () => {
      this.rulesUsed = useRules;

      if (useRules) {
        await this.#field?.validate();
      }
    });
  };

  get showErrors() {
    return !this.rulesUsed && this.args.showErrors !== false;
  }

  <template>
    {{#let
      (uniqueId)
      (uniqueId)
      (if @element @element (element "div"))
      (this.createOrUpdateField
        name=@name
        ignoreNativeValidation=@ignoreNativeValidation
        linkedField=@linkedField
        validateOn=this.validateOn
        revalidateOn=this.revalidateOn
        validate=@validate
        validated=@validated
        value=@value
      )
      (component Rules useRules=this.useRules)
      as |fieldId errorId Element field WiredRules|
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
            value=field.value
            setValue=field.setValue
            id=fieldId
            errorId=errorId
            invalid=field.invalid
            registerElement=field.registerElement
            issues=field.issues
            validate=field.validate
            showErrors=this.showErrors
            Rules=(component WiredRules id=errorId errors=field.issues)
          )
        }}

        {{#if (and this.showErrors field.issues)}}
          <Errors @id={{errorId}} @errors={{field.issues}} />
        {{/if}}
      </Element>
    {{/let}}
  </template>
}
