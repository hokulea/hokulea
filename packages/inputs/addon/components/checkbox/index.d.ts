import Component from '@glimmer/component';

import { InputControl } from '@hokulea/inputs/components/input-builder';

interface CheckboxArgs extends InputControl {
  value: boolean;
  update: (value: boolean) => void;
}

export default class CheckboxComponent extends Component<CheckboxArgs> {}
