import Component from '@glimmer/component';
import { hash, uniqueId } from '@ember/helper';

import { element } from 'ember-element-helper';

import styles from '@hokulea/core/forms.module.css';

import { Checkbox } from '../../controls/checkbox.gts';
import { Description } from '../description.gts';
import { Errors } from '../errors.gts';
import { Label } from '../label.gts';
import { manageValidation } from '../manage-validation.ts';

import type { RadioSignature } from '../../controls/radio.gts';
import type { BoundField, FieldArgs, FieldBlock, MultipleFieldBlock } from '../field';
import type { AttrValue, WithBoundArgs } from '@glint/template';
import type { FieldNames, FieldValue, UserData } from '@hokulea/ember-pahu';

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
    field: MultipleFieldBlock<DATA, NAME, VALUE>;
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
  select = (checked: boolean) => {
    if (checked) {
      this.args.field.setValue([...(this.args.field.value ?? []), this.args.value] as FieldValue<
        DATA,
        NAME,
        VALUE
      >[]);
    } else {
      const values = this.args.field.value;
      const index = this.args.field.value?.indexOf(
        this.args.value as FieldValue<DATA, NAME, VALUE>
      );

      if (Array.isArray(values) && index) {
        values.splice(index, 1);

        this.args.field.setValue(values);
      }
    }
  };

  get checked() {
    return this.args.field.value?.includes(this.args.value as FieldValue<DATA, NAME, VALUE>);
  }

  get issues() {
    return this.args.field.issues.filter((i) => 'value' in i && i.value === this.args.value);
  }

  get invalid() {
    return this.issues.length > 0;
  }

  <template>
    {{#let (uniqueId) (uniqueId) as |id errorId|}}
      <div class={{styles.choice}} data-test-option>
        <span>
          <Checkbox
            @value={{this.checked}}
            @update={{this.select}}
            @disabled={{@disabled}}
            id={{id}}
            name={{@name}}
            value={{@value}}
            {{@field.registerElement}}
            {{manageValidation errorMessageId=errorId invalid=this.invalid}}
            ...attributes
          />
        </span>

        <div>
          <Label for={{id}}>{{@label}}</Label>

          {{#if @description}}
            <Description>{{@description}}</Description>
          {{/if}}

          {{yield}}

          {{#if this.issues}}
            <Errors @id={{errorId}} @errors={{this.issues}} />
          {{/if}}

        </div>
      </div>
    {{/let}}
  </template>
}

export interface MultipleChoiceFieldSignature<
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

export class MultipleChoiceField<
  DATA extends UserData,
  NAME extends string = FieldNames<DATA> | (string & {}),
  VALUE = NAME extends keyof DATA ? DATA[NAME] : AttrValue
> extends Component<MultipleChoiceFieldSignature<DATA, NAME, VALUE>> {
  Field = this.args.Field;
  Option = Option<DATA, NAME, VALUE>;

  asMultiField = (field: FieldBlock<DATA, NAME, VALUE>) => {
    return field as MultipleFieldBlock<DATA, NAME, VALUE>;
  };

  <template>
    <this.Field
      @element={{element "fieldset"}}
      @showErrors={{false}}
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
        {{yield
          (hash
            Option=(component this.Option field=(this.asMultiField f) name=@name disabled=@disabled)
          )
        }}
      </div>
    </this.Field>
  </template>
}
