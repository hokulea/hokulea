import Component from '@glimmer/component';

import { asNumber } from '#src/-private/helpers.ts';
import NumberInput from '#src/components/number-input.gts';

import { manageValidation } from '../manage-validation.ts';

import type { BoundField, FieldArgs } from '../field.gts';
import type { AttrValue } from '@glint/template';
import type { FieldNames, FieldValue, UserData } from '@hokulea/pahu';
import type { NumberInputSignature } from '#src/components/number-input.gts';

export interface NumberFieldSignature<
  DATA extends UserData,
  NAME extends string = FieldNames<DATA> | (string & {}),
  VALUE = NAME extends keyof DATA ? DATA[NAME] : AttrValue
> {
  Element: NumberInputSignature['Element'];
  Args: FieldArgs<DATA, NAME, VALUE> &
    Omit<NumberInputSignature['Args'], 'value' | 'update'> & {
      Field: BoundField<DATA, NAME, VALUE>;
    };
}

export default class NumberField<
  DATA extends UserData,
  NAME extends string = FieldNames<DATA> | (string & {}),
  VALUE = NAME extends keyof DATA ? DATA[NAME] : AttrValue
> extends Component<NumberFieldSignature<DATA, NAME, VALUE>> {
  Field = this.args.Field;

  setNumberValue = (setValue: (value: FieldValue<DATA, NAME, VALUE>) => void) => {
    return (value: number) => setValue(value as FieldValue<DATA, NAME, VALUE>);
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
      <NumberInput
        @value={{asNumber f.value}}
        @update={{this.setNumberValue f.setValue}}
        @disabled={{@disabled}}
        name={{@name}}
        id={{f.id}}
        {{f.registerElement}}
        {{manageValidation errorMessageId=f.errorId invalid=f.invalid showErrors=f.showErrors}}
        ...attributes
      />
    </this.Field>
  </template>
}
