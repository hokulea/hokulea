import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

import { modifier } from 'ember-modifier';

import { findDescription } from './token';

export interface TokenArgs {
  name: string;
}

const BODY_STYLES = globalThis.getComputedStyle(document.body);

export default class TokenComponent extends Component<TokenArgs> {
  private demo?: HTMLElement;
  @tracked computed?: string;

  get description(): string | undefined {
    return findDescription(this.args.name);
  }

  // eslint-disable-next-line unicorn/consistent-function-scoping
  setup = modifier((element: HTMLElement, [update]: [() => void]) => {
    // listen for changes
    window.addEventListener('resize', update);

    const mutationObserver = new globalThis.MutationObserver(update);

    this.demo = element;

    let elem: HTMLElement | null = element;

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

  get property(): string {
    return BODY_STYLES.getPropertyValue(this.args.name);
  }

  get value(): string {
    return this.computed ?? this.property;
  }

  @action
  update() {
    this.computed = this.compute();
  }

  private compute(): string | undefined {
    const width = this.demo?.getBoundingClientRect().width;

    return width ? `${Math.round(width * 100) / 100}px` : undefined;
  }
}
