import Component from '@glimmer/component';

import { asString } from '#src/-private/helpers.ts';
import EmailInput from '#src/components/email-input.gts';

import { manageValidation } from '../manage-validation.ts';

import type { BoundField, FieldArgs } from '../field.gts';
import type { AttrValue } from '@glint/template';
import type { FieldNames, FieldValue, UserData } from '@hokulea/pahu';
import type { EmailInputSignature } from '#src/components/email-input.gts';

export interface EmailFieldSignature<
  DATA extends UserData,
  NAME extends string = FieldNames<DATA> | (string & {}),
  VALUE = NAME extends keyof DATA ? DATA[NAME] : AttrValue
> {
  Element: EmailInputSignature['Element'];
  Args: FieldArgs<DATA, NAME, VALUE> &
    Omit<EmailInputSignature['Args'], 'value' | 'update'> & {
      Field: BoundField<DATA, NAME, VALUE>;
    };
}

export default class EmailField<
  DATA extends UserData,
  NAME extends string = FieldNames<DATA> | (string & {}),
  VALUE = NAME extends keyof DATA ? DATA[NAME] : AttrValue
> extends Component<EmailFieldSignature<DATA, NAME, VALUE>> {
  Field = this.args.Field;

  setStringValue = (setValue: (value: FieldValue<DATA, NAME, VALUE>) => void) => {
    return (value: string) => setValue(value as FieldValue<DATA, NAME, VALUE>);
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
      <EmailInput
        @value={{asString f.value}}
        @update={{this.setStringValue f.setValue}}
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
