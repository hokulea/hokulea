import Component from '@glimmer/component';

import RangeInput from '../../../../components/range-input';
import { asNumber } from '../../../helpers';

import type { RangeInputSignature } from '../../../../components/range-input';
import type { FormData, FormKey, UserData } from '../../';
import type { BoundField, FieldArgs } from '../field';

export interface RangeFieldSignature<
  DATA extends UserData,
  KEY extends FormKey<FormData<DATA>> = FormKey<FormData<DATA>>
> {
  Element: RangeInputSignature['Element'];
  Args: FieldArgs<DATA, KEY> &
    Omit<RangeInputSignature['Args'], 'value' | 'update'> & {
      Field: BoundField<DATA, KEY>;
    };
}

export default class RangeField<
  DATA extends UserData,
  KEY extends FormKey<FormData<DATA>> = FormKey<FormData<DATA>>
> extends Component<RangeFieldSignature<DATA, KEY>> {
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
      <RangeInput
        @value={{asNumber f.value}}
        @update={{this.setNumberValue f.setValue}}
        @disabled={{@disabled}}
        @orientation={{@orientation}}
        @min={{@min}}
        @max={{@max}}
        @step={{@step}}
        name={{@name}}
        id={{f.id}}
        {{f.manageValidation}}
        {{f.captureEvents}}
        ...attributes
      />
    </this.Field>
  </template>
}
