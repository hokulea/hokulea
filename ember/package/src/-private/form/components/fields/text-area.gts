import Component from '@glimmer/component';

import TextArea from '../../../../components/text-area';
import { asString } from '../../../helpers';

import type { TextAreaSignature } from '../../../../components/text-area';
import type { FormData, FormKey, UserData } from '../../';
import type { BoundField, FieldArgs } from '../field';

export interface TextAreaFieldSignature<
  DATA extends UserData,
  KEY extends FormKey<FormData<DATA>> = FormKey<FormData<DATA>>
> {
  Element: TextAreaSignature['Element'];
  Args: FieldArgs<DATA, KEY> &
    Omit<TextAreaSignature['Args'], 'value' | 'update'> & {
      Field: BoundField<DATA, KEY>;
    };
}

export default class TextField<
  DATA extends UserData,
  KEY extends FormKey<FormData<DATA>> = FormKey<FormData<DATA>>
> extends Component<TextAreaFieldSignature<DATA, KEY>> {
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
      <TextArea
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
