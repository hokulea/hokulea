import Component from '@glimmer/component';

import { asString } from '../../../-private/helpers.ts';
import TextInput from '../../../components/text-input.gts';
import { manageValidation } from '../manage-validation.ts';

import type { TextInputSignature } from '../../../components/text-input.gts';
import type { BoundField, FieldArgs } from '../field.gts';
import type { RulesBlock } from '../rules.gts';
import type { AttrValue } from '@glint/template';
import type { FieldNames, FieldValue, UserData } from '@hokulea/pahu';

export interface TextFieldSignature<
  DATA extends UserData,
  NAME extends string = FieldNames<DATA> | (string & {}),
  VALUE = NAME extends keyof DATA ? DATA[NAME] : AttrValue
> {
  Element: TextInputSignature['Element'];
  Args: FieldArgs<DATA, NAME, VALUE> &
    Omit<TextInputSignature['Args'], 'value' | 'update'> & {
      Field: BoundField<DATA, NAME, VALUE>;
    };
  Blocks: RulesBlock;
}

export default class TextField<
  DATA extends UserData,
  NAME extends string = FieldNames<DATA> | (string & {}),
  VALUE = NAME extends keyof DATA ? DATA[NAME] : AttrValue
> extends Component<TextFieldSignature<DATA, NAME, VALUE>> {
  Field = this.args.Field;

  setStringValue = (setValue: (value: FieldValue<DATA, NAME, VALUE>) => void) => {
    return (value: string) => setValue(value as FieldValue<DATA, NAME, VALUE>);
  };

  <template>
    <@Field
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
      <TextInput
        @value={{asString f.value}}
        @update={{this.setStringValue f.setValue}}
        @disabled={{@disabled}}
        name={{@name}}
        id={{f.id}}
        {{f.registerElement}}
        {{manageValidation errorMessageId=f.errorId invalid=f.invalid showErrors=f.showErrors}}
        ...attributes
      />

      {{#if (has-block "rules")}}
        <f.Rules as |Rule|>
          {{yield Rule to="rules"}}
        </f.Rules>
      {{/if}}
    </@Field>
  </template>
}
