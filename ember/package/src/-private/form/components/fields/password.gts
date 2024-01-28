import Component from '@glimmer/component';

import PasswordInput from '../../../../components/password-input';
import { asString } from '../../../helpers';

import type { PasswordInputSignature } from '../../../../components/password-input';
import type { FormData, FormKey, UserData } from '../../';
import type { BoundField, FieldArgs } from '../field';

export interface PasswordFieldSignature<
  DATA extends UserData,
  KEY extends FormKey<FormData<DATA>> = FormKey<FormData<DATA>>
> {
  Element: PasswordInputSignature['Element'];
  Args: FieldArgs<DATA, KEY> &
    Omit<PasswordInputSignature['Args'], 'value' | 'update'> & {
      Field: BoundField<DATA, KEY>;
    };
}

export default class PasswordField<
  DATA extends UserData,
  KEY extends FormKey<FormData<DATA>> = FormKey<FormData<DATA>>
> extends Component<PasswordFieldSignature<DATA, KEY>> {
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
      <PasswordInput
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
