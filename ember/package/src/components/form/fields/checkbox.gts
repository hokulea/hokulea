import Component from '@glimmer/component';

import { asBoolean } from '#src/-private/helpers.ts';
import Checkbox from '#src/components/checkbox.gts';

import styles from '@hokulea/core/forms.module.css';

import Description from '../description.gts';
import Label from '../label.gts';
import { manageValidation } from '../manage-validation.ts';

import type { BoundField, FieldArgs } from '../field.gts';
import type { AttrValue } from '@glint/template';
import type { FieldNames, FieldValue, UserData } from '@hokulea/pahu';
import type { CheckboxSignature } from '#src/components/checkbox.gts';

export interface CheckboxFieldSignature<
  DATA extends UserData,
  NAME extends string = FieldNames<DATA> | (string & {}),
  VALUE = NAME extends keyof DATA ? DATA[NAME] : AttrValue
> {
  Element: CheckboxSignature['Element'];
  Args: FieldArgs<DATA, NAME, VALUE> &
    Omit<CheckboxSignature['Args'], 'value' | 'update'> & {
      Field: BoundField<DATA, NAME, VALUE>;
    };
}

export default class CheckboxField<
  DATA extends UserData,
  NAME extends string = FieldNames<DATA> | (string & {}),
  VALUE = NAME extends keyof DATA ? DATA[NAME] : AttrValue
> extends Component<CheckboxFieldSignature<DATA, NAME, VALUE>> {
  Field = this.args.Field;

  setBooleanValue = (setValue: (value: FieldValue<DATA, NAME, VALUE>) => void) => {
    return (value: boolean) => setValue(value as FieldValue<DATA, NAME, VALUE>);
  };

  <template>
    <this.Field
      @label=""
      @name={{@name}}
      @value={{@value}}
      @ignoreNativeValidation={{@ignoreNativeValidation}}
      @validateOn={{@validateOn}}
      @revalidateOn={{@revalidateOn}}
      @validate={{@validate}}
      @validated={{@validated}}
      as |f|
    >
      <div class={{styles.choices}}>
        <div class={{styles.choice}}>
          <span>
            <Checkbox
              @value={{asBoolean f.value}}
              @update={{this.setBooleanValue f.setValue}}
              @disabled={{@disabled}}
              id={{f.id}}
              name={{@name}}
              {{f.registerElement}}
              {{manageValidation
                errorMessageId=f.errorId
                invalid=f.invalid
                showErrors=f.showErrors
              }}
              ...attributes
            />
          </span>

          <div>
            <Label for={{f.id}}>{{@label}}</Label>

            {{#if @description}}
              <Description>{{@description}}</Description>
            {{/if}}
          </div>
        </div>
      </div>
    </this.Field>
  </template>
}
