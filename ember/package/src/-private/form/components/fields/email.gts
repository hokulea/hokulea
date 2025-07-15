import Component from '@glimmer/component';

import EmailInput from '../../../../components/email-input.gts';
import { asString } from '../../../helpers.ts';

import type { EmailInputSignature } from '../../../../components/email-input.gts';
import type { FormData, FormKey, UserData } from '../../index.ts';
import type { BoundField, FieldArgs } from '../field.gts';

export interface EmailFieldSignature<
  DATA extends UserData,
  KEY extends FormKey<FormData<DATA>> = FormKey<FormData<DATA>>
> {
  Element: EmailInputSignature['Element'];
  Args: FieldArgs<DATA, KEY> &
    Omit<EmailInputSignature['Args'], 'value' | 'update'> & {
      Field: BoundField<DATA, KEY>;
    };
}

export default class EmailField<
  DATA extends UserData,
  KEY extends FormKey<FormData<DATA>> = FormKey<FormData<DATA>>
> extends Component<EmailFieldSignature<DATA, KEY>> {
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
      <EmailInput
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
