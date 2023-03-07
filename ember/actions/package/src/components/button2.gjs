import Component from '@glimmer/component';

import styles from './button.css';

/**
 * The button to use
 *
 * @remarks
 *
 * Purpose is to use this for the main action on the screen
 *
 * {@link https://www.figma.com/file/Fq29S0hD3i38bAjYz3wWwy/Components?node-id=106%3A9 | Design in Figma}
 *
 * @example Default
 *
 * ```hbs
 * <Button>Click me</Button>
 * <Button disabled={{true}}>Disabled Button</Button>
 * ```
 *
 * @example Sizing
 *
 * ```hbs
 * <Button {{style fontSize="80%"}}>80% Font Size</Button>
 * <Button>Normal</Button>
 * <Button {{style fontSize="120%"}}>120% Font Size</Button>
 * <Button {{style fontSize="150%"}}>150% Font Size</Button>
 * ```
 *
 * @example Builder
 *
 * ```hbs
 * <Button {{on "click" (fn this.invoke)}} as |b|>
 *   <b.Prefix>Prefix</b.Prefix>
 *   <b.Prefix>Prefix</b.Prefix>
 *   <b.Affix>affix</b.Affix>
 *   <b.Affix>affix</b.Affix>
 *   <b.Content>Button</b.Content>
 *   <b.Affix>affix</b.Affix>
 *   <b.Affix>affix</b.Affix>
 *   <b.Suffix>Suffix</b.Suffix>
 *   <b.Suffix>Suffix</b.Suffix>
 * </Button>
 * ```
 */
export default class ButtonComponent extends Component {
  get intent() {
    return this.args.intent ?? Intent.Action;
  }

  get importance() {
    return this.args.importance ?? Importance.Supreme;
  }



  <template>
    <button
      class={{styles.button}}
      data-intent={{this.intent}}
      data-importance={{this.importance}}
      data-test-button
      ...attributes
    >
      {{yield}}
    </button>
  </template>
}
