/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore cannot import gts
import type Box from './components/box';
// @ts-ignore cannot import gts
import type Button from './components/button';
// @ts-ignore cannot import gts
import type Card from './components/card';
// @ts-ignore cannot import gts
import type Checkbox from './components/checkbox';
// @ts-ignore cannot import gts
import type CurrencyInput from './components/currency-input';
// @ts-ignore cannot import gts
import type DateInput from './components/date-input';
// @ts-ignore cannot import gts
import type EmailInput from './components/email-input';
// @ts-ignore cannot import gts
import type Form from './components/form';
// @ts-ignore cannot import gts
import type Icon from './components/icon';
// @ts-ignore cannot import gts
import type IconButton from './components/icon-button';
// @ts-ignore cannot import gts
import type InputBuilder from './components/input-builder';
// @ts-ignore cannot import gts
import type List from './components/list';
// @ts-ignore cannot import gts
import type NumberInput from './components/number-input';
// @ts-ignore cannot import gts
import type PasswordInput from './components/password-input';
// @ts-ignore cannot import gts
import type PhoneInput from './components/phone-input';
// @ts-ignore cannot import gts
import type Radio from './components/radio';
// @ts-ignore cannot import gts
import type Section from './components/section';
// @ts-ignore cannot import gts
import type Select from './components/select';
// @ts-ignore cannot import gts
import type TextArea from './components/text-area';
// @ts-ignore cannot import gts
import type TextInput from './components/text-input';

export default interface HokuleaRegistry {
  Box: typeof Box;
  Button: typeof Button;
  Card: typeof Card;
  Checkbox: typeof Checkbox;
  CurrencyInput: typeof CurrencyInput;
  DateInput: typeof DateInput;
  EmailInput: typeof EmailInput;
  Icon: typeof Icon;
  IconButton: typeof IconButton;
  List: typeof List;
  NumberInput: typeof NumberInput;
  PasswordInput: typeof PasswordInput;
  PhoneInput: typeof PhoneInput;
  Radio: typeof Radio;
  Section: typeof Section;
  Select: typeof Select;
  TextArea: typeof TextArea;
  TextInput: typeof TextInput;
  InputBuilder: typeof InputBuilder;
  Form: typeof Form;
}
