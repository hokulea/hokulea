import Component from '@glimmer/component';

import { asString } from '#src/-private/helpers.ts';
import Select from '#src/components/select.gts';

import { manageValidation } from '../manage-validation.ts';

import type { BoundField, FieldArgs } from '../field.gts';
import type { AttrValue } from '@glint/template';
import type { FieldNames, FieldValue, UserData } from '@hokulea/ember-pahu';
import type { SelectSignature, Value } from '#src/components/select.gts';

export interface SelectFieldSignature<
  DATA extends UserData,
  NAME extends string = FieldNames<DATA> | (string & {}),
  VALUE = NAME extends keyof DATA ? DATA[NAME] : AttrValue
> {
  Element: SelectSignature['Element'];
  Args: FieldArgs<DATA, NAME, VALUE> &
    Omit<SelectSignature['Args'], 'selection' | 'update'> & {
      Field: BoundField<DATA, NAME, VALUE>;
    };
  Blocks: SelectSignature['Blocks'];
}

export default class SelectField<
  DATA extends UserData,
  NAME extends string = FieldNames<DATA> | (string & {}),
  VALUE = NAME extends keyof DATA ? DATA[NAME] : AttrValue
> extends Component<SelectFieldSignature<DATA, NAME, VALUE>> {
  Field = this.args.Field;

  setValue = (setValue: (value: FieldValue<DATA, NAME, VALUE>) => void) => {
    return (value: Value | Value[]) => setValue(value as FieldValue<DATA, NAME, VALUE>);
  };

  <template>
    <this.Field
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
      <Select
        @value={{asString f.value}}
        @update={{this.setValue f.setValue}}
        @disabled={{@disabled}}
        name={{@name}}
        id={{f.id}}
        {{f.registerElement}}
        {{manageValidation errorMessageId=f.errorId invalid=f.invalid showErrors=f.showErrors}}
        ...attributes
        as |s|
      >
        {{yield s}}
      </Select>
    </this.Field>
  </template>
}
