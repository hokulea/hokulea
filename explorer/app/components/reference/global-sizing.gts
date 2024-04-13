import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { registerDestructor } from '@ember/destroyable';
import { action } from '@ember/object';

import { modifier } from 'ember-modifier';

import DimensionToken from '../token/dimension';
import { TokenList } from '../tokens';

export interface GlobalSizingElement extends HTMLElement {
  update: () => void;
}

export default class GlobalScaleDemoComponent extends Component {
  @tracked fontSize!: string;
  @tracked viewportWidth!: number;

  setup = modifier((element: GlobalSizingElement) => {
    // "public" API:
    // eslint-disable-next-line no-param-reassign
    element.update = () => {
      this.update();
    };

    // listen for changes
    window.addEventListener('resize', this.update);

    const mutationObserver = new window.MutationObserver(this.update);

    registerDestructor(this, () => {
      window.removeEventListener('resize', this.update);
      mutationObserver.disconnect();
    });

    let elem = element as HTMLElement;

    do {
      mutationObserver.observe(elem, {
        attributes: true,
        attributeFilter: ['style', 'class']
      });
      elem = elem.parentElement as HTMLElement; // booh!
    } while (elem);

    // first run
    this.update();
  });

  @action
  private update() {
    this.viewportWidth = window.innerWidth;
    this.fontSize = window.getComputedStyle(document.documentElement).getPropertyValue('font-size');
  }

  <template>
    <div ...attributes {{this.setup}}>
      Viewport Width:
      <code>{{this.viewportWidth}}px</code>
      Font Size:
      <code>{{this.fontSize}}</code>
    </div>

    <TokenList>
      <DimensionToken @name='--s-4' />
      <DimensionToken @name='--s-3' />
      <DimensionToken @name='--s-2' />
      <DimensionToken @name='--s-1' />
      <DimensionToken @name='--s0' />
      <DimensionToken @name='--s1' />
      <DimensionToken @name='--s2' />
      <DimensionToken @name='--s3' />
      <DimensionToken @name='--s4' />
    </TokenList>
  </template>
}
