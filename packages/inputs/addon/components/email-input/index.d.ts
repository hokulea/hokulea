import Component from '@hokulea/component';

import { InputControl } from '@hokulea/inputs/components/input-builder';

/**
 * Arguments for the `<EmailInput>` component
 */
export interface EmailInputArgs extends InputControl {
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
 * `<EmailInput>` is for email inputs
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
 * <EmailInput value={{this.email}} {{on "input" this.updateEmail}}/>
 * ```
 *
 * Use hokulea's <i>consistency</i> API for inputs:
 *
 * ```hbs
 * <EmailInput @value={{this.email}} @update={{set this.email}}/>
 * ```
 *
 * @example
 *
 * Sizing - Use `font-size` for sizing. Using the {@link
 * https://github.com/jelhan/ember-style-modifier | style modifier} in this example:
 *
 * ```hbs
 * <EmailInput {{style fontSize="80%"}} @value="80% Font Size"/>
 * <EmailInput @value="Normal"/>
 * <EmailInput {{style fontSize="120%"}} @value="120% Font Size"/>
 * <EmailInput {{style fontSize="150%"}} @value="150% Font Size"/>
 * ```
 *
 * @example
 *
 * Builder - Using the provided input builder to construct your own input
 *
 * ```hbs
 * <InputBuilder @control="email-input" as |b|>
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
export default class EmailInputComponent extends Component<EmailInputArgs> {}
