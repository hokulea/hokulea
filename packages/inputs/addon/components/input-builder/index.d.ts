import Component from '@glimmer/component';

export interface InputControl {
  value: unknown;
  update: (value: unknown) => void;
}

export interface InputBuilderArgs {
  control: Component<InputControl>;
}

export default class InputBuilderComponent extends Component<
  InputBuilderArgs
> {}
