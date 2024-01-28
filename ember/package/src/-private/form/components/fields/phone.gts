import Component from '@glimmer/component';

import PhoneInput from '../../../../components/phone-input';
import { asString } from '../../../helpers';

import type { PhoneInputSignature } from '../../../../components/phone-input';
import type { FormData, FormKey, UserData } from '../../';
import type { BoundField, FieldArgs } from '../field';

export interface PhoneFieldSignature<
  DATA extends UserData,
  KEY extends FormKey<FormData<DATA>> = FormKey<FormData<DATA>>
> {
  Element: PhoneInputSignature['Element'];
  Args: FieldArgs<DATA, KEY> &
    Omit<PhoneInputSignature['Args'], 'value' | 'update'> & {
      Field: BoundField<DATA, KEY>;
    };
}

export default class PhoneField<
  DATA extends UserData,
  KEY extends FormKey<FormData<DATA>> = FormKey<FormData<DATA>>
> extends Component<PhoneFieldSignature<DATA, KEY>> {
  Field = this.args.Field;

  setStringValue = (setValue: (value: DATA[KEY]) => void) => {
    return (value: string) => setValue(value as DATA[KEY]);
  };

  <template>
    <this.Field
      @name={{@name}}
      @label={{@label}}
      @description={{@description}}
      @validate={{@validate}}
      as |f|
    >
      <PhoneInput
        @value={{asString f.value}}
        @update={{this.setStringValue f.setValue}}
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
