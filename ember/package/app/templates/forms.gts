import RouteTemplate from 'ember-route-template';
import * as v from 'valibot';

import { Form, Page } from '#src';

import type { FieldValidationHandler } from '@hokulea/pahu';

const passwordSchema = v.pipe(
  v.optional(v.string(), ''),
  v.string(),
  v.minLength(8),
  v.regex(/[A-Z]/, 'upper'),
  v.regex(/[a-z]/, 'lower'),
  v.regex(/[0-9]/, 'number'),
  v.regex(/[^A-Za-z0-9]/, 'special')
);

type Data = {
  givenName: string;
  familyName: string;
  password?: string;
  confirm_password?: string;
  birthday?: string;
  phone: string;
  email: string;
  receiptNumber: string;
  price?: number;
  fruit?: string[];
  fruitAmount?: number;
  pokemon?: string;
  graduation: string;
  pets: string[];
  note: string;
  terms: boolean;
};

const data: Data = {
  givenName: 'Günni',
  familyName: '',
  password: '',
  birthday: '',
  phone: '',
  email: '',
  receiptNumber: '',
  price: undefined,
  fruit: undefined,
  fruitAmount: undefined,
  pokemon: '',
  graduation: '',
  pets: [],
  note: '',
  terms: false
};

const submit = (formData: unknown) => {
  console.log(formData);
};

const validateConfirmPassword: FieldValidationHandler<Data> = ({ value, form }) => {
  console.log('validateConfirmPassword', value, form.getFieldValue('password'));

  if (value !== form.getFieldValue('password')) {
    return 'Passwords must match';
  }

  return;
};

export default RouteTemplate(
  <template>
    <Page @title="Forms">
      <Form @data={{data}} @submit={{submit}} as |f|>
        <f.Text @name="givenName" @label="Vorname" autocomplete="given-name" @disabled={{true}} />

        <f.Text
          @name="familyName"
          @label="Nachname"
          autocomplete="family-name"
          required
          data-bwignore
        />

        <f.Password
          @name="password"
          @label="Password"
          @validate={{passwordSchema}}
          required
          data-bwignore
        >
          <:rules as |Rule|>
            <Rule @key="type" @value="min_length">must be at least 8 characters</Rule>
            <Rule @key="message" @value="upper">must contain at least one uppercase letter</Rule>
            <Rule @key="message" @value="lower">must contain at least one lowercase letter</Rule>
            <Rule @key="message" @value="number">must contain at least one number</Rule>
            <Rule @key="message" @value="special">must contain at least one special character</Rule>
          </:rules>
        </f.Password>
        <f.Password
          @name="confirm_password"
          @label="Confirm Password"
          @linkedField="password"
          @revalidateOn="input"
          @validate={{validateConfirmPassword}}
          data-bwignore
        />

        <f.Date
          @name="birthday"
          @label="Geburtstag"
          @description="Wann bist du geboren?"
          autocomplete="bday"
          data-bwignore
        />

        <f.Phone @name="phone" @label="Telefon" autocomplete="tel" data-bwignore />

        <f.Email @name="email" @label="Email" autocomplete="email" data-bwignore />

        <f.Text @name="receiptNumber" @label="Rechnungsnr" placeholder="XY-1234" data-bwignore />

        <hr />

        <f.Currency @name="price" @label="Price" @disabled={{true}} data-bwignore />

        <f.Select @name="fruit" @label="Favorite Fruit" as |s|>
          <s.Option @value="Apple" />
          <s.Option @value="Banana" />
          <s.Option @value="Pear">🍐 Pear</s.Option>
        </f.Select>

        <f.Range @name="fruitAmount" @label="How many fruits do you want?" min={{1}} max={{5}} />

        <f.List @name="pokemon" @label="Starter Pokemon" as |l|>
          <l.Option @value="Bulbasaur">🟢 Bulbasaur</l.Option>
          <l.Option @value="Charmander">🔴 Charmander</l.Option>
          <l.Option @value="Squirtle">🔵 Squirtle</l.Option>
        </f.List>

        <f.SingularChoice @label="Abschluss" @name="graduation" as |r|>
          <r.Option @value="doctor" @label="Doktor" required />
          <r.Option @value="diploma" @label="Diplom" />
          <r.Option @value="master" @label="Master" />
          <r.Option @value="bachelor" @label="Bachelor" />
          <r.Option @value="apprenticeship" @label="Ausbildung" />
          <r.Option @value="matura" @label="Abitur" />
        </f.SingularChoice>

        <f.MultipleChoice @label="Welche Haustiere hast du?" @name="pets" as |r|>
          <r.Option @value="rhino" @label="Rhino" required />
          <r.Option @value="tiger" @label="Tiger" disabled />
          <r.Option @value="crocodile" @label="Crocodile" @description="Like a dinosaur" />
          <r.Option @value="kangaroo" @label="Kangaroo" />
        </f.MultipleChoice>

        <f.TextArea @name="note" @label="Notiz" />

        <f.Checkbox @name="terms" @label="Bitte AGB zustimmen" required />

        <f.Submit>Send</f.Submit>
      </Form>
    </Page>
  </template>
);
