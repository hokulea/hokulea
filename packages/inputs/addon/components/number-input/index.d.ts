import Component from '@hokulea/component';

import { InputControl } from '@hokulea/inputs/components/input-builder';

/**
 * Arguments for the `<NumberInput>` component
 */
export interface NumberInputArgs extends InputControl {
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
 * `<NumberInput>` is for numeric inputs
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
 * <NumberInput value={{this.amount}} {{on "input" this.updateAmount}}/>
 * ```
 *
 * Use hokulea's <i>consistency</i> API for inputs:
 *
 * ```hbs
 * <NumberInput @value={{this.amount}} @update={{set this.amount}}/>
 * ```
 *
 * @example
 *
 * Sizing - Use `font-size` for sizing. Using the {@link
 * https://github.com/jelhan/ember-style-modifier | style modifier} in this example:
 *
 * ```hbs
 * <NumberInput {{style fontSize="80%"}} @value="80% Font Size"/>
 * <NumberInput @value="Normal"/>
 * <NumberInput {{style fontSize="120%"}} @value="120% Font Size"/>
 * <NumberInput {{style fontSize="150%"}} @value="150% Font Size"/>
 * ```
 *
 * @example
 *
 * Builder - Using the provided input builder to construct your own input
 *
 * ```hbs
 * <InputBuilder @control="number-input" as |b|>
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
export default class NumberInputComponent extends Component<NumberInputArgs> {}
