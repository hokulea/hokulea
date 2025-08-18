import Component from '@glimmer/component';
import { hash, uniqueId } from '@ember/helper';

import { element } from 'ember-element-helper';

import { eq } from '#src/-private/helpers.ts';
import Radio from '#src/components/radio.gts';

import styles from '@hokulea/core/forms.module.css';

import Description from '../description.gts';
import Label from '../label.gts';

import type { BoundField, FieldArgs, FieldBlock } from '../field';
import type { AttrValue, WithBoundArgs } from '@glint/template';
import type { FieldNames, FieldValue, UserData } from '@hokulea/pahu';
import type { RadioSignature } from '#src/components/radio.gts';

export interface OptionSignature<
  DATA extends UserData,
  NAME extends string = FieldNames<DATA> | (string & {}),
  VALUE = NAME extends keyof DATA ? DATA[NAME] : AttrValue
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
    field: FieldBlock<DATA, NAME, VALUE>;
  };
  Blocks: {
    default: [];
  };
}

class Option<
  DATA extends UserData,
  NAME extends string = FieldNames<DATA> | (string & {}),
  VALUE = NAME extends keyof DATA ? DATA[NAME] : AttrValue
> extends Component<OptionSignature<DATA, NAME, VALUE>> {
  select = () => {
    this.args.field.setValue(this.args.value as FieldValue<DATA, NAME, VALUE>);
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
            {{@field.registerElement}}
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
  NAME extends string = FieldNames<DATA> | (string & {}),
  VALUE = NAME extends keyof DATA ? DATA[NAME] : AttrValue
> {
  Args: FieldArgs<DATA, NAME, VALUE> & {
    disabled?: boolean;
    Field: BoundField<DATA, NAME, VALUE>;
  };
  Blocks: {
    default: [
      {
        Option: WithBoundArgs<typeof Option<DATA, NAME, VALUE>, 'field' | 'name'>;
      }
    ];
  };
}

export default class SingularChoiceField<
  DATA extends UserData,
  NAME extends string = FieldNames<DATA> | (string & {}),
  VALUE = NAME extends keyof DATA ? DATA[NAME] : AttrValue
> extends Component<SingularChoiceFieldSignature<DATA, NAME, VALUE>> {
  Field = this.args.Field;
  Option = Option<DATA, NAME, VALUE>;

  <template>
    <this.Field
      @element={{element "fieldset"}}
      @labelComponent={{component Label element=(element "legend")}}
      @name={{@name}}
      @label={{@label}}
      @description={{@description}}
      @value={{@value}}
      @ignoreNativeValidation={{@ignoreNativeValidation}}
      @validateOn={{@validateOn}}
      @revalidateOn={{@revalidateOn}}
      @validate={{@validate}}
      @validated={{@validated}}
      as |f|
    >
      <div class={{styles.choices}} data-test-choices>
        {{yield (hash Option=(component this.Option field=f name=@name disabled=@disabled))}}
      </div>
    </this.Field>
  </template>
}
