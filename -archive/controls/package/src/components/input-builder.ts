import Component from '@glimmer/component';

import styles from './input-builder.css';

import type { ControlArgs } from './control';

export interface InputBuilderSignature {
  Args: {
    control: Component<ControlArgs<unknown>>;
  };
}

export default class InputBuilder extends Component<InputBuilderSignature> {
  styles = styles;
}
