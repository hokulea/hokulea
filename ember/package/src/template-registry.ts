import type AppHeader from './components/app-header.gts';
import type Box from './components/box.gts';
import type Button from './components/button.gts';
import type Card from './components/card.gts';
import type Checkbox from './components/checkbox.gts';
import type CurrencyInput from './components/currency-input.gts';
import type DateInput from './components/date-input.gts';
import type EmailInput from './components/email-input.gts';
import type Form from './components/form.gts';
import type Icon from './components/icon.gts';
import type IconButton from './components/icon-button.gts';
import type InputBuilder from './components/input-builder.gts';
import type List from './components/list.gts';
import type Menu from './components/menu.gts';
import type NumberInput from './components/number-input.gts';
import type Page from './components/page.gts';
import type PasswordInput from './components/password-input.gts';
import type PhoneInput from './components/phone-input.gts';
import type Popover from './components/popover.gts';
import type Radio from './components/radio.gts';
import type RangeInput from './components/range-input.gts';
import type Section from './components/section.gts';
import type Select from './components/select.gts';
import type Tabs from './components/tabs.gts';
import type TextArea from './components/text-area.gts';
import type TextInput from './components/text-input.gts';
import type popover from './helpers/popover.ts';

export default interface HokuleaRegistry {
  AppHeader: typeof AppHeader;
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
  Page: typeof Page;
  PasswordInput: typeof PasswordInput;
  PhoneInput: typeof PhoneInput;
  Popover: typeof Popover;
  Radio: typeof Radio;
  RangeInput: typeof RangeInput;
  Section: typeof Section;
  Select: typeof Select;
  Tabs: typeof Tabs;
  TextArea: typeof TextArea;
  TextInput: typeof TextInput;
  InputBuilder: typeof InputBuilder;
  Form: typeof Form;

  // behavior
  popover: typeof popover;
}
