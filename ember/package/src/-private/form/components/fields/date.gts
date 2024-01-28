import Component from '@glimmer/component';

import DateInput from '../../../../components/date-input';
import { asString } from '../../../helpers';

import type { DateInputSignature } from '../../../../components/date-input';
import type { FormData, FormKey, UserData } from '../../';
import type { BoundField, FieldArgs } from '../field';

export interface DateFieldSignature<
  DATA extends UserData,
  KEY extends FormKey<FormData<DATA>> = FormKey<FormData<DATA>>
> {
  Element: DateInputSignature['Element'];
  Args: FieldArgs<DATA, KEY> &
    Omit<DateInputSignature['Args'], 'value' | 'update'> & {
      Field: BoundField<DATA, KEY>;
    };
}

export default class DateField<
  DATA extends UserData,
  KEY extends FormKey<FormData<DATA>> = FormKey<FormData<DATA>>
> extends Component<DateFieldSignature<DATA, KEY>> {
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
      <DateInput
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
