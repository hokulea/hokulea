import Component from '@glimmer/component';
import { hash, uniqueId } from '@ember/helper';

import { element } from 'ember-element-helper';

import styles from '@hokulea/core/forms.module.css';

import Radio from '../../../../components/radio.gts';
import { eq } from '../../../helpers.ts';
import Description from '../description.gts';
import Label from '../label.gts';

import type { RadioSignature } from '../../../../components/radio';
import type { FormData, FormKey, UserData } from '../../';
import type { BoundField, FieldArgs, FieldBlock } from '../field';
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
    field: FieldBlock<DATA, KEY>;
  };
  Blocks: {
    default: [];
  };
}

class Option<
  DATA extends UserData,
  KEY extends FormKey<FormData<DATA>> = FormKey<FormData<DATA>>
> extends Component<OptionSignature<DATA, KEY>> {
  select = () => {
    this.args.field.setValue(this.args.value as DATA[KEY]);
  };

  <template>
    {{#let (uniqueId) as |id|}}
      <div class={{styles.choice}} data-test-option>
        <span>
          <Radio
            @value={{eq @field.value @value}}
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

export interface SingularChoiceFieldSignature<
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

export default class SingularChoiceField<
  DATA extends UserData,
  KEY extends FormKey<FormData<DATA>> = FormKey<FormData<DATA>>
> extends Component<SingularChoiceFieldSignature<DATA, KEY>> {
  Field = this.args.Field;
  Option = Option<DATA, KEY>;

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
        {{yield (hash Option=(component this.Option field=f name=@name disabled=@disabled))}}
      </div>
    </this.Field>
  </template>
}
