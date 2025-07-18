import Component from '@glimmer/component';

import styles from '@hokulea/core/forms.module.css';

import Checkbox from '../../../../components/checkbox.gts';
import { asBoolean } from '../../../helpers.ts';
import Description from '../description.gts';
import Label from '../label.gts';

import type { CheckboxSignature } from '../../../../components/checkbox.gts';
import type { FormData, FormKey, UserData } from '../../index.ts';
import type { BoundField, FieldArgs } from '../field.gts';

export interface RadioFieldSignature<
  DATA extends UserData,
  KEY extends FormKey<FormData<DATA>> = FormKey<FormData<DATA>>
> {
  Element: CheckboxSignature['Element'];
  Args: FieldArgs<DATA, KEY> &
    Omit<CheckboxSignature['Args'], 'value' | 'update'> & {
      Field: BoundField<DATA, KEY>;
    };
}

export default class RadioField<
  DATA extends UserData,
  KEY extends FormKey<FormData<DATA>> = FormKey<FormData<DATA>>
> extends Component<RadioFieldSignature<DATA, KEY>> {
  Field = this.args.Field;

  setBooleanValue = (setValue: (value: DATA[KEY]) => void) => {
    return (value: boolean) => setValue(value as DATA[KEY]);
  };

  <template>
    <this.Field @label="" @name={{@name}} @validate={{@validate}} as |f|>
      <div class={{styles.choices}}>
        <div class={{styles.choice}}>
          <span>
            <Checkbox
              @value={{asBoolean f.value}}
              @update={{this.setBooleanValue f.setValue}}
              @disabled={{@disabled}}
              id={{f.id}}
              name={{@name}}
              {{f.manageValidation}}
              {{f.captureEvents}}
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
