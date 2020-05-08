import Component from '@glimmer/component';

import { InputControl } from '@hokulea/inputs/components/input-builder';

interface NumberInputArgs extends InputControl {
  value: number;
  update: (value: number) => void;
}

export default class NumberInputComponent extends Component<NumberInputArgs> {}
