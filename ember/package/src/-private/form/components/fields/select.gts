import Component from '@glimmer/component';

import Select from '../../../../components/select.gts';
import { asString } from '../../../helpers.ts';

import type { SelectSignature, Value } from '../../../../components/select.gts';
import type { FormData, FormKey, UserData } from '../../index.ts';
import type { BoundField, FieldArgs } from '../field.gts';

export interface SelectFieldSignature<
  DATA extends UserData,
  KEY extends FormKey<FormData<DATA>> = FormKey<FormData<DATA>>
> {
  Element: SelectSignature['Element'];
  Args: FieldArgs<DATA, KEY> &
    Omit<SelectSignature['Args'], 'selection' | 'update'> & {
      Field: BoundField<DATA, KEY>;
    };
  Blocks: SelectSignature['Blocks'];
}

export default class SelectField<
  DATA extends UserData,
  KEY extends FormKey<FormData<DATA>> = FormKey<FormData<DATA>>
> extends Component<SelectFieldSignature<DATA, KEY>> {
  Field = this.args.Field;

  setValue = (setValue: (value: DATA[KEY]) => void) => {
    return (value: Value | Value[]) => setValue(value as DATA[KEY]);
  };

  <template>
    <this.Field
      @name={{@name}}
      @label={{@label}}
      @description={{@description}}
      @validate={{@validate}}
      as |f|
    >
      <Select
        @value={{asString f.value}}
        @update={{this.setValue f.setValue}}
        @disabled={{@disabled}}
        name={{@name}}
        id={{f.id}}
        {{f.manageValidation}}
        {{f.captureEvents}}
        ...attributes
        as |s|
      >
        {{yield s}}
      </Select>
    </this.Field>
  </template>
}
