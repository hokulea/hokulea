import { array } from '@ember/helper';

import Route from 'ember-polaris-routing/route';
import CompatRoute from 'ember-polaris-routing/route/compat';

import {
  Button,
  Checkbox,
  CurrencyInput,
  DateInput,
  EmailInput,
  InputBuilder,
  List,
  NumberInput,
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

export class ControlsRoute extends Route<{}> {
  <template>
    <Section @title='List'>
      <List as |l|>
        {{#each (array 'Banana' 'Apple' 'Pear') as |i|}}
          <l.Option @value={{i}}>{{i}}</l.Option>
        {{/each}}
      </List>
    </Section>

    <Section @title='Text'>
      <TextInput />
      <TextInput @value='text' />
      <TextInput disabled />
    </Section>

    <Section @title='Number'>
      <NumberInput />
      <NumberInput @value={{1234}} />
      <NumberInput disabled />
    </Section>

    <Section @title='CurrencyInput'>
      <CurrencyInput />
      <CurrencyInput @value={{1234}} />
      <CurrencyInput @disabled={{true}} />
    </Section>

    <Section @title='Phone'>
      <PhoneInput />
      <PhoneInput @value='+49160412341234' />
      <PhoneInput disabled />
    </Section>

    <Section @title='Email'>
      <EmailInput />
      <EmailInput @value='admin@example.com' />
      <EmailInput disabled />
    </Section>

    <Section @title='Date'>
      <DateInput />
      <DateInput @value='1970-01-01' />
      <DateInput disabled />
    </Section>

    <Section @title='Password'>
      <PasswordInput />
      <PasswordInput @value='secret' />
      <PasswordInput disabled />
    </Section>

    <Section @title='Select'>
      <Select as |s|>
        <s.Option @value='Banana' />
        <s.Option @value='Apple' />
        <s.Option @value='Pear' />
      </Select>
    </Section>

    <Section @title='Radio'>
      <Radio />
      <Radio checked />
      <Radio disabled />
    </Section>

    <Section @title='Checkbox'>
      <Checkbox />
      <Checkbox checked />
      <Checkbox disabled />
    </Section>

    <Section @title='Textarea'>
      <TextArea />
    </Section>

    <hr />

    <Section @title='Input + Button'>
      <TextInput />
      <DateInput @value='1970-01-01' />
      <Button @push={{(noop)}}>Start</Button>
    </Section>

    <Section @title='Builder'>
      <InputBuilder as |b|>
        <b.Prefix>Pre</b.Prefix>
        <b.Affix>Aff</b.Affix>
        <TextInput />
        <b.Affix>Aff</b.Affix>
        <b.Suffix>Post</b.Suffix>
      </InputBuilder>

      <Button @push={{(noop)}}>Start</Button>
    </Section>

    <Section @title='Extended Builder'>
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
    </Section>
  </template>
}

export default CompatRoute(ControlsRoute);
