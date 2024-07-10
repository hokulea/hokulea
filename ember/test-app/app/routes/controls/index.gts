import Route from 'ember-polaris-routing/route';
import CompatRoute from 'ember-polaris-routing/route/compat';

import {
  Button,
  Checkbox,
  CurrencyInput,
  DateInput,
  EmailInput,
  InputBuilder,
  NumberInput,
  Page,
  PasswordInput,
  PhoneInput,
  Radio,
  Section,
  Select,
  TextArea,
  TextInput
} from '@hokulea/ember';

function noop() {
  return () => {
    // eslint-disable-next-line no-console
    console.log('noop');
  };
}

export class ControlsRoute extends Route<object> {
  <template>
    <Page @title="Inputs">

      <Section @title="Text">
        <p>
          <TextInput />
          <TextInput @value="text" />
          <TextInput disabled />
        </p>
      </Section>

      <Section @title="Number">
        <p>
          <NumberInput />
          <NumberInput @value={{1234}} />
          <NumberInput disabled />
        </p>
      </Section>

      <Section @title="CurrencyInput">
        <p>
          <CurrencyInput />
          <CurrencyInput @value={{1234}} />
          <CurrencyInput @disabled={{true}} />
        </p>
      </Section>

      <Section @title="Phone">
        <p>
          <PhoneInput />
          <PhoneInput @value="+49160412341234" />
          <PhoneInput disabled />
        </p>
      </Section>

      <Section @title="Email">
        <p>
          <EmailInput />
          <EmailInput @value="admin@example.com" />
          <EmailInput disabled />
        </p>
      </Section>

      <Section @title="Date">
        <p>
          <DateInput />
          <DateInput @value="1970-01-01" />
          <DateInput disabled />
        </p>
      </Section>

      <Section @title="Password">
        <p>
          <PasswordInput />
          <PasswordInput @value="secret" />
          <PasswordInput disabled />
        </p>
      </Section>

      <Section @title="Select">
        <p>
          <Select as |s|>
            <s.Option @value="Banana" />
            <s.Option @value="Apple" />
            <s.Option @value="Pear" />
          </Select>
        </p>
      </Section>

      <Section @title="Radio">
        <p>
          <Radio />
          <Radio checked />
          <Radio disabled />
        </p>
      </Section>

      <Section @title="Checkbox">
        <p>
          <Checkbox />
          <Checkbox checked />
          <Checkbox disabled />
        </p>
      </Section>

      <Section @title="Textarea">
        <TextArea />
      </Section>

      <Section @title="Input + Button">
        <p>
          <TextInput />
          <DateInput @value="1970-01-01" />
          <Button @push={{(noop)}}>Start</Button>
        </p>
      </Section>

      <Section @title="Builder">
        <p>
          <InputBuilder as |b|>
            <b.Prefix>Pre</b.Prefix>
            <b.Affix>Aff</b.Affix>
            <TextInput />
            <b.Affix>Aff</b.Affix>
            <b.Suffix>Post</b.Suffix>
          </InputBuilder>

          <Button @push={{(noop)}}>Start</Button>
        </p>
      </Section>

      <Section @title="Extended Builder">
        <p>
          <InputBuilder as |b|>
            <b.Prefix>Pre</b.Prefix>
            <b.Prefix>Pre</b.Prefix>
            <b.Affix>Aff</b.Affix>
            <b.Affix>Aff</b.Affix>
            <TextInput />
            <b.Affix>[Icon of sth]</b.Affix>
            <b.Affix>Aff</b.Affix>
            <b.Suffix>Post</b.Suffix>
            <b.Suffix>Post</b.Suffix>
          </InputBuilder>
        </p>
      </Section>

    </Page>
  </template>
}

export default CompatRoute(ControlsRoute);
