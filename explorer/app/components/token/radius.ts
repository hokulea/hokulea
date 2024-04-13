import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

import { modifier } from 'ember-modifier';

import { findDescription } from './token';

export interface TokenArgs {
  name: string;
  compute?: boolean;
}

const BODY_STYLES = window.getComputedStyle(document.body);

export default class TokenComponent extends Component<TokenArgs> {
  private demo?: HTMLElement;
  @tracked computed?: string;

  get description(): string | undefined {
    return findDescription(this.args.name);
  }

  get computable() {
    return this.args.compute ?? true;
  }

  setup = modifier((element: HTMLElement) => {
    // listen for changes
    window.addEventListener('resize', this.update);

    const mutationObserver = new window.MutationObserver(this.update);

    this.demo = element;

    let elem = element;

    do {
      mutationObserver.observe(elem, {
        attributes: true,
        attributeFilter: ['style', 'class']
      });
      elem = elem.parentElement as HTMLElement; // booh!
    } while (elem);

    // first run
    this.update();

    return () => {
      window.removeEventListener('resize', this.update);
      mutationObserver.disconnect();
    };
  });

  get property(): string {
    return BODY_STYLES.getPropertyValue(this.args.name);
  }

  get value(): string {
    return this.computed ?? this.property;
  }

  private update() {
    this.computed = this.compute();
  }

  private compute(): string | undefined {
    const width = this.demo?.getBoundingClientRect().width;

    return width ? `${width.toFixed(0)}px` : undefined;
  }
}
