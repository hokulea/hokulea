import Component from '@glimmer/component';
import { hash } from '@ember/helper';

import styles from '@hokulea/core/forms.module.css';
import { createForm } from '@hokulea/ember-pahu';

import { Field } from './field.gts';
import { CheckboxField } from './fields/checkbox.gts';
import { CurrencyField } from './fields/currency.gts';
import { DateField } from './fields/date.gts';
import { EmailField } from './fields/email.gts';
import { ListField } from './fields/list.gts';
import { MultipleChoiceField } from './fields/multiple-choice.gts';
import { NumberField } from './fields/number.gts';
import { PasswordField } from './fields/password.gts';
import { PhoneField } from './fields/phone.gts';
import { RangeField } from './fields/range.gts';
import { SelectField } from './fields/select.gts';
import { SingularChoiceField } from './fields/singular-choice.gts';
import { TextField } from './fields/text.gts';
import { TextAreaField } from './fields/text-area.gts';
import { Reset } from './reset.gts';
import { Submit } from './submit.gts';

import type { BoundField } from './field.gts';
import type { WithBoundArgs } from '@glint/template';
import type { FormAPI, FormConfig, UserData } from '@hokulea/ember-pahu';

export interface FormBuilder<DATA extends UserData> {
  Checkbox: WithBoundArgs<typeof CheckboxField<DATA>, 'Field'>;
  Currency: WithBoundArgs<typeof CurrencyField<DATA>, 'Field'>;
  Date: WithBoundArgs<typeof DateField<DATA>, 'Field'>;
  Email: WithBoundArgs<typeof EmailField<DATA>, 'Field'>;
  List: WithBoundArgs<typeof ListField<DATA>, 'Field'>;
  MultipleChoice: WithBoundArgs<typeof MultipleChoiceField<DATA>, 'Field'>;
  Number: WithBoundArgs<typeof NumberField<DATA>, 'Field'>;
  Range: WithBoundArgs<typeof RangeField<DATA>, 'Field'>;
  Password: WithBoundArgs<typeof PasswordField<DATA>, 'Field'>;
  Phone: WithBoundArgs<typeof PhoneField<DATA>, 'Field'>;
  Select: WithBoundArgs<typeof SelectField<DATA>, 'Field'>;
  SingularChoice: WithBoundArgs<typeof SingularChoiceField<DATA>, 'Field'>;
  Text: WithBoundArgs<typeof TextField<DATA>, 'Field'>;
  TextArea: WithBoundArgs<typeof TextAreaField<DATA>, 'Field'>;
  Field: BoundField<DATA>;
  Submit: typeof Submit;
  Reset: typeof Reset;

  /**
   * Will be true if at least one form field is invalid.
   */
  invalid: boolean;

  /**
   * Yielded action that will trigger form validation and submission, same as when triggering the native `submit` event on the form.
   */
  submit: FormAPI<DATA>['submit'];

  /**
   * Yielded action that will reset form state, same as when triggering the native `reset` event on the form.
   */
  reset: FormAPI<DATA>['reset'];

  /**
   * Trigger validation on the form
   */
  validate: FormAPI<DATA>['validate'];

  /* @TODO: Remove, for debug only */
  form: ReturnType<typeof createForm<DATA>>;
}

export interface FormSignature<DATA extends UserData> {
  Element: HTMLFormElement;
  Args: FormConfig<DATA>;
  Blocks: {
    default: [FormBuilder<DATA>];
  };
}

export class Form<DATA extends UserData> extends Component<FormSignature<DATA>> {
  Field = Field<DATA>;
  CheckboxField = CheckboxField<DATA>;
  CurrencyField = CurrencyField<DATA>;
  DateField = DateField<DATA>;
  EmailField = EmailField<DATA>;
  ListField = ListField<DATA>;
  MultipleChoiceField = MultipleChoiceField<DATA>;
  NumberField = NumberField<DATA>;
  PasswordField = PasswordField<DATA>;
  PhoneField = PhoneField<DATA>;
  RangeField = RangeField<DATA>;
  SelectField = SelectField<DATA>;
  SingularChoiceField = SingularChoiceField<DATA>;
  TextAreaField = TextAreaField<DATA>;
  TextField = TextField<DATA>;

  <template>
    {{#let
      (createForm
        data=@data
        ignoreNativeValidation=@ignoreNativeValidation
        validateOn=@validateOn
        revalidateOn=@revalidateOn
        submit=@submit
        validate=@validate
        validated=@validated
      )
      as |f|
    }}
      <form novalidate class={{styles.form}} data-test-form ...attributes {{f.registerElement}}>
        {{#let (component this.Field form=f) as |WiredField|}}
          {{yield
            (hash
              invalid=f.invalid
              submit=f.submit
              Field=WiredField
              Checkbox=(component this.CheckboxField Field=WiredField)
              Currency=(component this.CurrencyField Field=WiredField)
              Date=(component this.DateField Field=WiredField)
              Email=(component this.EmailField Field=WiredField)
              List=(component this.ListField Field=WiredField)
              MultipleChoice=(component this.MultipleChoiceField Field=WiredField)
              Number=(component this.NumberField Field=WiredField)
              Password=(component this.PasswordField Field=WiredField)
              Phone=(component this.PhoneField Field=WiredField)
              Range=(component this.RangeField Field=WiredField)
              Select=(component this.SelectField Field=WiredField)
              SingularChoice=(component this.SingularChoiceField Field=WiredField)
              TextArea=(component this.TextAreaField Field=WiredField)
              Text=(component this.TextField Field=WiredField)
              Submit=Submit
              Reset=Reset
              form=f
            )
          }}
        {{/let}}
      </form>
    {{/let}}
  </template>
}
