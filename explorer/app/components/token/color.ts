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
  @tracked value?: string;

  get description(): string | undefined {
    return findDescription(this.args.name);
  }

  // eslint-disable-next-line unicorn/consistent-function-scoping
  setup = modifier((_element, [update]: [() => void]) => {
    // listen for changes
    const media = globalThis.matchMedia('(prefers-color-scheme: dark)');

    media.addEventListener('change', update);

    // first run
    update();

    return () => {
      media.removeEventListener('change', update);
    };
  });

  @action
  update() {
    this.value = this.compute();
  }

  private compute(): string | undefined {
    return BODY_STYLES.getPropertyValue(this.args.name) || '-';
  }
}
