import Component from '@glimmer/component';
import { hash, uniqueId } from '@ember/helper';

import { element } from 'ember-element-helper';

import styles from '@hokulea/core/forms.module.css';

import Checkbox from '../../../../components/checkbox';
import Description from '../description';
import Label from '../label';

import type { RadioSignature } from '../../../../components/radio';
import type { FormData, FormKey, UserData } from '../../';
import type { BoundField, FieldArgs, FieldBlock, MultipleFieldBlock } from '../field';
import type { WithBoundArgs } from '@glint/template';

export interface OptionSignature<
  DATA extends UserData,
  KEY extends FormKey<FormData<DATA>> = FormKey<FormData<DATA>>
> {
  Element: RadioSignature['Element'];
  Args: {
    value: string;
    label: string;
    description?: string;

    /** @internal */
    name: string;

    /** @internal */
    disabled?: boolean;

    /** @internal */
    field: MultipleFieldBlock<DATA, KEY>;
  };
  Blocks: {
    default: [];
  };
}

class Option<
  DATA extends UserData,
  KEY extends FormKey<FormData<DATA>> = FormKey<FormData<DATA>>
> extends Component<OptionSignature<DATA, KEY>> {
  select = (checked: boolean) => {
    if (checked) {
      this.args.field.setValue([...(this.args.field.value ?? []), this.args.value] as DATA[KEY][]);
    } else {
      const values = this.args.field.value;
      const index = this.args.field.value?.indexOf(this.args.value as DATA[KEY]);

      if (Array.isArray(values) && index) {
        values.splice(index, 1);

        this.args.field.setValue(values);
      }
    }
  };

  get checked() {
    return this.args.field.value?.includes(this.args.value as DATA[KEY]);
  }

  <template>
    {{#let (uniqueId) as |id|}}
      <div class={{styles.choice}} data-test-option>
        <span>
          <Checkbox
            @value={{this.checked}}
            @update={{this.select}}
            @disabled={{@disabled}}
            id={{id}}
            name={{@name}}
            value={{@value}}
            {{@field.manageValidation}}
            {{@field.captureEvents}}
            ...attributes
          />
        </span>

        <div>
          <Label for={{id}}>{{@label}}</Label>

          {{#if @description}}
            <Description>{{@description}}</Description>
          {{/if}}

          {{yield}}
        </div>
      </div>
    {{/let}}
  </template>
}

export interface MultipleChoiceFieldSignature<
  DATA extends UserData,
  KEY extends FormKey<FormData<DATA>> = FormKey<FormData<DATA>>
> {
  Args: FieldArgs<DATA, KEY> & {
    disabled?: boolean;
    Field: BoundField<DATA, KEY>;
  };
  Blocks: {
    default: [
      {
        Option: WithBoundArgs<typeof Option<DATA, KEY>, 'field' | 'name'>;
      }
    ];
  };
}

export default class MultipleChoiceField<
  DATA extends UserData,
  KEY extends FormKey<FormData<DATA>> = FormKey<FormData<DATA>>
> extends Component<MultipleChoiceFieldSignature<DATA, KEY>> {
  Field = this.args.Field;
  Option = Option<DATA, KEY>;

  asMultiField = (field: FieldBlock<DATA, KEY>) => {
    return field as MultipleFieldBlock<DATA, KEY>;
  };

  <template>
    <this.Field
      @element={{element "fieldset"}}
      @labelComponent={{component Label element=(element "legend")}}
      @name={{@name}}
      @label={{@label}}
      @description={{@description}}
      @validate={{@validate}}
      as |f|
    >
      <div class={{styles.choices}} data-test-choices>
        {{yield
          (hash
            Option=(component this.Option field=(this.asMultiField f) name=@name disabled=@disabled)
          )
        }}
      </div>
    </this.Field>
  </template>
}
