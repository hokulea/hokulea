/* eslint-disable @typescript-eslint/prefer-ts-expect-error, @typescript-eslint/ban-ts-comment */

// @ts-ignore
import type Box from './components/box';
// @ts-ignore
import type Button from './components/button';
// @ts-ignore
import type Card from './components/card';
// @ts-ignore
import type Checkbox from './components/checkbox';
// @ts-ignore
import type CurrencyInput from './components/currency-input';
// @ts-ignore
import type DateInput from './components/date-input';
// @ts-ignore
import type EmailInput from './components/email-input';
// @ts-ignore
import type Form from './components/form';
// @ts-ignore
import type Icon from './components/icon';
// @ts-ignore
import type IconButton from './components/icon-button';
// @ts-ignore
import type InputBuilder from './components/input-builder';
// @ts-ignore
import type List from './components/list';
// @ts-ignore
import type Menu from './components/menu';
// @ts-ignore
import type NumberInput from './components/number-input';
// @ts-ignore
import type PasswordInput from './components/password-input';
// @ts-ignore
import type PhoneInput from './components/phone-input';
// @ts-ignore
import type Radio from './components/radio';
// @ts-ignore
import type Section from './components/section';
// @ts-ignore
import type Select from './components/select';
// @ts-ignore
import type TextArea from './components/text-area';
// @ts-ignore
import type TextInput from './components/text-input';
import type popover from './helpers/popover';

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
  Menu: typeof Menu;
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

  // behavior
  popover: typeof popover;
}
