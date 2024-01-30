import { registerDestructor } from '@ember/destroyable';
import { action } from '@ember/object';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

import { findDescription } from '../token';

import styles from './index.css';

export interface TokenArgs {
  name: string;
}

const BODY_STYLES = window.getComputedStyle(document.body);

export default class TokenComponent extends Component<TokenArgs> {
  styles = styles;

  @tracked value?: string;

  get description(): string | undefined {
    return findDescription(this.args.name);
  }

  @action
  setup(): void {
    // listen for changes
    const media = window.matchMedia('(prefers-color-scheme: dark)');
    media.addEventListener('change', this.update);

    registerDestructor(this, () => {
      media.removeEventListener('change', this.update);
    });

    // first run
    this.update();
  }

  @action
  private update() {
    this.value = this.compute();
  }

  private compute(): string | undefined {
    return BODY_STYLES.getPropertyValue(this.args.name) || '-';
  }
}
