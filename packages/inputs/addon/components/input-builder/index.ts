import Component from '@glimmer/component';

export interface InputControl {
  value: unknown;
  update: (value: unknown) => void;
}

interface InputBuilderArgs {
  control: Component<InputControl>;
}

export default class InputBuilderComponent extends Component<
  InputBuilderArgs
> {}
