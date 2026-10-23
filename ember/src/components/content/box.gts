import Component from '@glimmer/component';

import { element } from 'ember-element-helper';

import type { ComponentLike } from '@glint/template';

export interface BoxSignature<E extends Element = HTMLDivElement> {
  Element: E;
  Args: {
    element?: ComponentLike<{ Element: HTMLElement }>;
  };
  Blocks: {
    default: [];
  };
}

export class Box<E extends Element = HTMLDivElement> extends Component<BoxSignature<E>> {
  <template>
    {{#let (if @element @element (element "div")) as |Element|}}
      <Element class="container" ...attributes>
        {{yield}}
      </Element>
    {{/let}}
  </template>
}
