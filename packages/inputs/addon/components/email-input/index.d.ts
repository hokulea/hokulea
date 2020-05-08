import Component from '@glimmer/component';

import { InputControl } from '@hokulea/inputs/components/input-builder';

interface EmailInputArgs extends InputControl {
  value: string;
  update: (value: string) => void;
}

export default class EmailInputComponent extends Component<EmailInputArgs> {}
