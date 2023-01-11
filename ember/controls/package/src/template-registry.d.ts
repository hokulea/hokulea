/* eslint-disable @typescript-eslint/naming-convention */
import type Checkbox from './components/checkbox';
import type EmailInput from './components/email-input';
import type InputBuilder from './components/input-builder';
import type List from './components/list';
import type NumberInput from './components/number-input';
import type Radio from './components/radio';
import type Select from './components/select';
import type TextArea from './components/text-area';
import type TextInput from './components/text-input';

export default interface KujengaControlsRegistry {
  Checkbox: typeof Checkbox;
  EmailInput: typeof EmailInput;
  InputBuilder: typeof InputBuilder;
  List: typeof List;
  NumberInput: typeof NumberInput;
  Radio: typeof Radio;
  Select: typeof Select;
  TextArea: typeof TextArea;
  TextInput: typeof TextInput;
}
