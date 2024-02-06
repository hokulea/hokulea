import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { registerDestructor } from '@ember/destroyable';
import { action } from '@ember/object';

import { findDescription } from '../token';

export interface TokenArgs {
  name: string;
}

const BODY_STYLES = window.getComputedStyle(document.body);

export default class TokenComponent extends Component<TokenArgs> {
  private demo?: HTMLElement;
  @tracked computed?: string;

  get description(): string | undefined {
    return findDescription(this.args.name);
  }

  @action
  setup(element: HTMLElement): void {
    // listen for changes
    window.addEventListener('resize', this.update);

    const mutationObserver = new window.MutationObserver(this.update);

    registerDestructor(this, () => {
      window.removeEventListener('resize', this.update);
      mutationObserver.disconnect();
    });

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
  }

  get property(): string {
    return BODY_STYLES.getPropertyValue(this.args.name);
  }

  get value(): string {
    return this.computed ?? this.property;
  }

  @action
  private update() {
    this.computed = this.compute();
  }

  private compute(): string | undefined {
    const width = this.demo?.getBoundingClientRect().width;

    return width ? `${width.toFixed(2)}px` : undefined;
  }
}
