import type { Button } from './components/actions/button.gts';
import type { IconButton } from './components/actions/icon-button.gts';
import type Avatar from './components/avatar.gts';
import type { Box } from './components/content/box.gts';
import type { Card } from './components/content/card.gts';
import type { Section } from './components/content/section.gts';
import type { Checkbox } from './components/controls/checkbox.gts';
import type { CurrencyInput } from './components/controls/currency-input.gts';
import type { DateInput } from './components/controls/date-input.gts';
import type { EmailInput } from './components/controls/email-input.gts';
import type { InputBuilder } from './components/controls/input-builder.gts';
import type { List } from './components/controls/list.gts';
import type { Menu } from './components/controls/menu.gts';
import type { NumberInput } from './components/controls/number-input.gts';
import type { PasswordInput } from './components/controls/password-input.gts';
import type { PhoneInput } from './components/controls/phone-input.gts';
import type { Radio } from './components/controls/radio.gts';
import type { RangeInput } from './components/controls/range-input.gts';
import type { Select } from './components/controls/select.gts';
import type { Tabs } from './components/controls/tabs.gts';
import type { TextArea } from './components/controls/text-area.gts';
import type { TextInput } from './components/controls/text-input.gts';
import type { Form } from './components/form/form.gts';
import type { Icon } from './components/graphics/icon.gts';
import type { FocusPage } from './components/layouts/focus-page.gts';
import type { Page } from './components/layouts/page.gts';
import type { SectionedPage } from './components/layouts/sectioned-page.gts';
import type { AppHeader } from './components/navigation/app-header.gts';
import type { NavigationList } from './components/navigation/navigation-list.gts';
import type { Popover } from './components/windows/popover.gts';
import type { popover } from './helpers/popover.ts';

export default interface HokuleaRegistry {
  // actions
  Button: typeof Button;
  IconButton: typeof IconButton;

  // content
  Box: typeof Box;
  Card: typeof Card;
  Section: typeof Section;

  // controls
  Checkbox: typeof Checkbox;
  CurrencyInput: typeof CurrencyInput;
  DateInput: typeof DateInput;
  EmailInput: typeof EmailInput;
  InputBuilder: typeof InputBuilder;
  List: typeof List;
  Menu: typeof Menu;
  NumberInput: typeof NumberInput;
  PasswordInput: typeof PasswordInput;
  PhoneInput: typeof PhoneInput;
  Radio: typeof Radio;
  RangeInput: typeof RangeInput;
  Select: typeof Select;
  Tabs: typeof Tabs;
  TextArea: typeof TextArea;
  TextInput: typeof TextInput;

  // forms
  Form: typeof Form;

  // graphics
  Avatar: typeof Avatar;
  Icon: typeof Icon;

  // layouts
  Page: typeof Page;
  FocusPage: typeof FocusPage;
  SectionedPage: typeof SectionedPage;

  // navigation
  AppHeader: typeof AppHeader;
  // Link: typeof Link;
  NavigationList: typeof NavigationList;

  // windows
  Popover: typeof Popover;
  popover: typeof popover;
}
