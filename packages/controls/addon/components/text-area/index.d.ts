import Component from '@glimmer/component';

import { TextInputArgs } from '@hokulea/controls/components/text-input';

/**
 * `<TextArea>` is for multi-line text input
 *
 * @example
 *
 * ```hbs
 * <TextArea @value={{this.text}} @update={{set this.text}}/>
 * ```
 */
export default class TextAreaComponent extends Component<TextInputArgs> {}
