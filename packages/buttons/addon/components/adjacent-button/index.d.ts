import Component from '@hokulea/component';

import {
  ButtonArgs,
  ButtonYield
} from '@hokulea/buttons/components/button-builder';

/**
 * A button with adjacent color
 *
 * @remarks
 * Adjacent is similar to the main action.
 * It’s purpose is to be of lesser prominent importance.
 *
 * {@link https://www.figma.com/file/Fq29S0hD3i38bAjYz3wWwy/Components?node-id=404%3A0 | Design in Figma}
 *
 * @example
 *
 * ```hbs
 * <AdjacentButton>Click me</AdjacentButton>
 * ```
 */
export default class AdjacentButtonComponent extends Component<
  ButtonArgs,
  ButtonYield
> {}
