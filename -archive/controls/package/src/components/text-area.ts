import Component from '@glimmer/component';

import styles from './text-area.css';

import type { ControlArgs } from './control';

/**
 * Signature for `<TextInput>` component
 */
export interface TextAreaSignature {
  Element: HTMLTextAreaElement;
  Args: ControlArgs<string>;
}

/**
 * `<TextArea>` is for multi-line text input
 *
 * @example
 *
 * ```hbs
 * <TextArea @value={{this.text}} @update={{set this.text}}/>
 * ```
 */
export default class TextArea extends Component<TextAreaSignature> {
  styles = styles;
}
