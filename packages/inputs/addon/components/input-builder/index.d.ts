import Component from '@glimmer/component';

export interface InputControl<T> {
  value: T;
  update: (value: T) => void;
}

export interface InputBuilderArgs {
  control: Component<InputControl<unknown>>;
}

export default class InputBuilderComponent extends Component<
  InputBuilderArgs
> {}
