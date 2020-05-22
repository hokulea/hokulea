import Component from '@hokulea/component';

import {
  ButtonYield,
  ButtonArgs
} from '@hokulea/buttons/components/button-builder';

/**
 * A button for dangerous situations
 *
 * @remarks
 * Use it to raise awareness for an action that needs serious attention (e.g.
 * deletion or non-undoable action).
 *
 * {@link https://www.figma.com/file/Fq29S0hD3i38bAjYz3wWwy/Components?node-id=404%3A251 | Design in Figma}
 *
 * @example
 *
 * ```hbs
 * <DangerButton>Click me</DangerButton>
 * ```
 */
export default class DangerButtonComponent extends Component<
  ButtonArgs,
  ButtonYield
> {}
