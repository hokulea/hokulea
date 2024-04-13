// @ts-expect-error importing a gts file is working
import type Box from './components/box';
// @ts-expect-error importing a gts file is working
import type Button from './components/button';
// @ts-expect-error importing a gts file is working
import type Card from './components/card';
// @ts-expect-error importing a gts file is working
import type Checkbox from './components/checkbox';
// @ts-expect-error importing a gts file is working
import type CurrencyInput from './components/currency-input';
// @ts-expect-error importing a gts file is working
import type DateInput from './components/date-input';
// @ts-expect-error importing a gts file is working
import type EmailInput from './components/email-input';
// @ts-expect-error importing a gts file is working
import type Form from './components/form';
// @ts-expect-error importing a gts file is working
import type Icon from './components/icon';
// @ts-expect-error importing a gts file is working
import type IconButton from './components/icon-button';
// @ts-expect-error importing a gts file is working
import type InputBuilder from './components/input-builder';
// @ts-expect-error importing a gts file is working
import type List from './components/list';
// @ts-expect-error importing a gts file is working
import type NumberInput from './components/number-input';
// @ts-expect-error importing a gts file is working
import type PasswordInput from './components/password-input';
// @ts-expect-error importing a gts file is working
import type PhoneInput from './components/phone-input';
// @ts-expect-error importing a gts file is working
import type Radio from './components/radio';
// @ts-expect-error importing a gts file is working
import type Section from './components/section';
// @ts-expect-error importing a gts file is working
import type Select from './components/select';
// @ts-expect-error importing a gts file is working
import type TextArea from './components/text-area';
// @ts-expect-error importing a gts file is working
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
