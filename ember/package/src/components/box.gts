import Component from '@glimmer/component';

import { element } from 'ember-element-helper';

import styles from '@hokulea/core/layouts.module.css';

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

export default class Box<E extends Element = HTMLDivElement> extends Component<BoxSignature<E>> {
  <template>
    {{#let (if @element @element (element "div")) as |Element|}}
      {{! @glint-expect-error https://github.com/typed-ember/glint/issues/610 }}
      <Element class={{styles.container}} ...attributes>
        {{yield}}
      </Element>
    {{/let}}
  </template>
}
