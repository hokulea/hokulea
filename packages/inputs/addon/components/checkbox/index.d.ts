import Component from '@hokulea/component';

import { InputControl } from '@hokulea/inputs/components/input-builder';

/**
 * Arguments for the `<Checkbox>` component
 */
interface CheckboxArgs extends InputControl {
  /**
   * The value passed into the component
   */
  value: boolean;

  /**
   * A callback that receives the updated value
   */
  update: (value: boolean) => void;
}

/**
 * `<Checkbox>` to toggle values on and off
 *
 * @remarks
 *
 * {@link https://www.figma.com/file/Fq29S0hD3i38bAjYz3wWwy/Components?node-id=404%3A411 | Design in Figma}
 *
 * @example
 *
 * Use <i>just</i> HTML:
 *
 * ```hbs
 * <Checkbox checked={{this.youShallPass}} {{on "checked" this.updateShallPass}}/>
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
 *   <Checkbox @update={{fn this.update}}/>
 *   80%
 * </label>
 *
 * <label>
 *   <Checkbox disabled={{true}}/>
 *   Normal
 * </label>
 *
 * <label {{style fontSize="120%"}}>
 *   <Checkbox @value={{true}} @update={{fn this.update}}/>
 *   120%
 * </label>
 *
 * <label {{style fontSize="150%"}}>
 *   <Checkbox @value={{true}} disabled={{true}}/>
 *   150%
 * </label>
 * ```
 */
export default class CheckboxComponent extends Component<CheckboxArgs> {}
