import Component from '@glimmer/component';

import { InputControl } from '@hokulea/inputs/components/input-builder';

interface RadioArgs extends InputControl {
  value: boolean;
  update: (value: boolean) => void;
}

export default class RadioComponent extends Component<RadioArgs> {}
