import Component from '@glimmer/component';

import styles from './radio.css';

import type { ControlArgs } from './control';

/**
 * Signature for the `<Radio>` component
 */
interface RadioSignature {
  Element: HTMLInputElement;
  Args: ControlArgs<boolean>;
}

/**
 * `<Radio>` is an option to select between multiple items
 *
 * @remarks
 *
 * {@link https://www.figma.com/file/Fq29S0hD3i38bAjYz3wWwy/Components?node-id=442%3A0 | Design in Figma}
 *
 * @example
 *
 * Use <i>just</i> HTML:
 *
 * ```hbs
 * <Radio checked={{this.youShallPass}} {{on "checked" this.updateShallPass}}/>
 * ```
 *
 * Use hokulea's <i>consistency</i> API for inputs:
 *
 * ```hbs
 * <EmailInput @value={{this.youShallPass}} @update={{set this.youShallPass}}/>
 * ```
 *
 * @example
 *
 * Sizing - Use `font-size` for sizing. Using the {@link
 * https://github.com/jelhan/ember-style-modifier | style modifier} in this example:
 *
 * ```hbs
 * <label {{style fontSize="80%"}}>
 *   <Radio @update={{fn this.update}}/>
 *   80%
 * </label>
 *
 * <label>
 *   <Radio disabled={{true}}/>
 *   Normal
 * </label>
 *
 * <label {{style fontSize="120%"}}>
 *   <Radio @value={{true}} @update={{fn this.update}}/>
 *   120%
 * </label>
 *
 * <label {{style fontSize="150%"}}>
 *   <Radio @value={{true}} disabled={{true}}/>
 *   150%
 * </label>
 * ```
 */
export default class Radio extends Component<RadioSignature> {
  styles = styles;
}
