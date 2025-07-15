import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

import { modifier } from 'ember-modifier';

export interface GlobalSizingElement extends HTMLElement {
  update: () => void;
}

export default class GlobalScaleDemoComponent extends Component {
  @tracked fontSize!: string;
  @tracked viewportWidth!: number;

  // eslint-disable-next-line unicorn/consistent-function-scoping
  setup = modifier((element: GlobalSizingElement, [update]: [() => void]) => {
    // "public" API:

    element.update = () => {
      update();
    };

    // listen for changes
    window.addEventListener('resize', update);

    const mutationObserver = new globalThis.MutationObserver(update);

    let elem: HTMLElement | null = element as HTMLElement;

    do {
      mutationObserver.observe(elem, {
        attributes: true,
        attributeFilter: ['style', 'class']
      });
      elem = elem.parentElement;
    } while (elem !== null);

    // first run
    update();

    return () => {
      window.removeEventListener('resize', update);
      mutationObserver.disconnect();
    };
  });

  @action
  update() {
    this.viewportWidth = window.innerWidth;
    this.fontSize = globalThis
      .getComputedStyle(document.documentElement)
      .getPropertyValue('font-size');
  }
}
