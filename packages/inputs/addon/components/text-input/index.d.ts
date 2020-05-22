import Component from '@hokulea/component';

import { InputControl } from '@hokulea/inputs/components/input-builder';

/**
 * Arguments for `<TextInput>` and `<TextArea>` components
 */
export interface TextInputArgs extends InputControl {
  /**
   * The value passed into the component
   */
  value: string;

  /**
   * A callback that receives the updated value
   */
  update: (value: string) => void;
}

/**
 * `<TextInput>` is for single-line text input
 *
 * @remarks
 *
 * {@link https://www.figma.com/file/Fq29S0hD3i38bAjYz3wWwy/Components?node-id=404%3A369 | Design in Figma}
 *
 * @example
 *
 * Use <i>just</i> HTML:
 *
 * ```hbs
 * <TextInput value={{this.text}} {{on "input" this.updateText}}/>
 * ```
 *
 * Use hokulea's <i>consistency</i> API for inputs:
 *
 * ```hbs
 * <TextInput @value={{this.text}} @update={{set this.text}}/>
 * ```
 *
 * @example
 *
 * Sizing - Use `font-size` for sizing. Using the {@link
 * https://github.com/jelhan/ember-style-modifier | style modifier} in this example:
 *
 * ```hbs
 * <TextInput {{style fontSize="80%"}} @value="80% Font Size"/>
 * <TextInput @value="Normal"/>
 * <TextInput {{style fontSize="120%"}} @value="120% Font Size"/>
 * <TextInput {{style fontSize="150%"}} @value="150% Font Size"/>
 * ```
 *
 * @example
 *
 * Builder - Using the provided input builder to construct your own input
 *
 * ```hbs
 * <InputBuilder @control="text-input" as |b|>
 *   <b.Prefix>Prefix</b.Prefix>
 *   <b.Prefix>Prefix</b.Prefix>
 *   <b.Affix>affix</b.Affix>
 *   <b.Affix>affix</b.Affix>
 *   <b.Input @update={{this.type}}/>
 *   <b.Affix>affix</b.Affix>
 *   <b.Affix>affix</b.Affix>
 *   <b.Suffix>Suffix</b.Suffix>
 *   <b.Suffix>Suffix</b.Suffix>
 * </InputBuilder>
 * ```
 */
export default class TextInputComponent extends Component<TextInputArgs> {}
