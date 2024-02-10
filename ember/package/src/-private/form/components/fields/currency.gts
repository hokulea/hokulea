import Component from '@glimmer/component';

import CurrencyInput from '../../../../components/currency-input';
import { asNumber } from '../../../helpers';

import type { CurrencyInputSignature } from '../../../../components/currency-input';
import type { FormData, FormKey, UserData } from '../../';
import type { BoundField, FieldArgs } from '../field';

export interface CurrencyFieldSignature<
  DATA extends UserData,
  KEY extends FormKey<FormData<DATA>> = FormKey<FormData<DATA>>
> {
  Element: CurrencyInputSignature['Element'];
  Args: FieldArgs<DATA, KEY> &
    Omit<CurrencyInputSignature['Args'], 'value' | 'update'> & {
      Field: BoundField<DATA, KEY>;
    };
}

export default class CurrencyField<
  DATA extends UserData,
  KEY extends FormKey<FormData<DATA>> = FormKey<FormData<DATA>>
> extends Component<CurrencyFieldSignature<DATA, KEY>> {
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
      <CurrencyInput
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
