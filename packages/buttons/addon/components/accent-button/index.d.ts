import Component from '@hokulea/component';

import {
  ButtonArgs,
  ButtonYield
} from '@hokulea/buttons/components/button-builder';

/**
 * A button with accent color
 *
 * @remarks
 * Accent is contrary to the main action.
 * It’s purpose is to accentuate a given action to state the opposite.
 *
 * {@link https://www.figma.com/file/Fq29S0hD3i38bAjYz3wWwy/Components?node-id=404%3A152 | Design in Figma}
 *
 * @example
 *
 * ```hbs
 * <AccentButton>Click me</AccentButton>
 * ```
 */
export default class AccentButtonComponent extends Component<
  ButtonArgs,
  ButtonYield
> {}
