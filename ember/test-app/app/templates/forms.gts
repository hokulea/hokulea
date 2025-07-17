import RouteTemplate from 'ember-route-template';

import { Form, Page } from '@hokulea/ember';

const data = {
  givenName: 'Günni',
  familyName: '',
  birthday: '',
  phone: '',
  email: '',
  receiptNumber: '',
  price: '',
  fruit: '',
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

export default RouteTemplate(
  <template>
    <Page @title="Forms">
      <Form @data={{data}} @submit={{submit}} as |f|>
        <f.Text @name="givenName" @label="Vorname" autocomplete="given-name" @disabled={{true}} />

        <f.Text @name="familyName" @label="Nachname" autocomplete="family-name" required />

        <f.Date
          @name="birthday"
          @label="Geburtstag"
          @description="Wann bist du geboren?"
          autocomplete="bday"
        />

        <f.Phone @name="phone" @label="Telefon" autocomplete="tel" />

        <f.Email @name="email" @label="Email" autocomplete="email" />

        <f.Text @name="receiptNumber" @label="Rechnungsnr" placeholder="XY-1234" />

        <hr />

        <f.Currency @name="price" @label="Price" @disabled={{true}} />

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
