import Component from '@glimmer/component';

import NumberInput from '../../../../components/number-input';
import { asNumber } from '../../../helpers';

import type { NumberInputSignature } from '../../../../components/number-input';
import type { FormData, FormKey, UserData } from '../../';
import type { BoundField, FieldArgs } from '../field';

export interface NumberFieldSignature<
  DATA extends UserData,
  KEY extends FormKey<FormData<DATA>> = FormKey<FormData<DATA>>
> {
  Element: NumberInputSignature['Element'];
  Args: FieldArgs<DATA, KEY> &
    Omit<NumberInputSignature['Args'], 'value' | 'update'> & {
      Field: BoundField<DATA, KEY>;
    };
}

export default class NumberField<
  DATA extends UserData,
  KEY extends FormKey<FormData<DATA>> = FormKey<FormData<DATA>>
> extends Component<NumberFieldSignature<DATA, KEY>> {
  Field = this.args.Field;

  setNumberValue = (setValue: (value: DATA[KEY]) => void) => {
    return (value: number) => setValue(value as DATA[KEY]);
  };

  <template>
    <this.Field
      @name={{@name}}
      @label={{@label}}
      @description={{@description}}
      @validate={{@validate}}
      as |f|
    >
      <NumberInput
        @value={{asNumber f.value}}
        @update={{this.setNumberValue f.setValue}}
        @disabled={{@disabled}}
        name={{@name}}
        id={{f.id}}
        {{f.manageValidation}}
        {{f.captureEvents}}
        ...attributes
      />
    </this.Field>
  </template>
}
