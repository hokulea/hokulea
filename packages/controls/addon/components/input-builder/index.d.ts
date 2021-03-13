import Component from '@glimmer/component';

import { Control } from '../control';

export interface InputBuilderArgs {
  control: Component<Control<unknown>>;
}

export default class InputBuilderComponent extends Component<
  InputBuilderArgs
> {}
