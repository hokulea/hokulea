import Component from '@hokulea/component';

import {
  ButtonArgs,
  ButtonYield
} from '@hokulea/buttons/components/button-builder';

/**
 * A spooky button
 *
 * @remarks
 * It's a mist of the main button.
 * The purpose is to sit in the background and highlight the main action.
 *
 * {@link https://www.figma.com/file/Fq29S0hD3i38bAjYz3wWwy/Components?node-id=123%3A9 | Design in Figma}
 *
 * @example
 *
 * ```hbs
 * <GhostButton>Click me</GhostButton>
 * ```
 */
export default class GhostButtonComponent extends Component<
  ButtonArgs,
  ButtonYield
> {}
