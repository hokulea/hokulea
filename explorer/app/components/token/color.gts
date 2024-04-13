import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { concat } from '@ember/helper';
import { action } from '@ember/object';

import { modifier } from 'ember-modifier';
import style from 'ember-style-modifier';

import { TokenName } from '../tokens';
import styles from './color.css';
import { findDescription } from './token';

export interface TokenArgs {
  name: string;
}

const BODY_STYLES = window.getComputedStyle(document.body);

export default class TokenColor extends Component<TokenArgs> {
  @tracked value?: string;

  get description(): string | undefined {
    return findDescription(this.args.name);
  }

  setup = modifier(() => {
    // listen for changes
    const media = window.matchMedia('(prefers-color-scheme: dark)');

    media.addEventListener('change', this.update);

    // first run
    this.update();

    return () => {
      media.removeEventListener('change', this.update);
    };
  });

  @action
  private update() {
    this.value = this.compute();
  }

  private compute(): string | undefined {
    return BODY_STYLES.getPropertyValue(this.args.name) || '-';
  }

  <template>
    <div class={{styles.box}}>
      <div
        class={{styles.demo}}
        {{style --value=(concat 'var(' @name ')')}}
        {{this.setup @name}}
      ></div>
      <div class={{styles.content}}>
        <TokenName @name={{@name}} />
        <p class={{styles.description}}>{{this.description}}</p>
      </div>
      <span class={{styles.value}}>{{this.value}}</span>
    </div>
  </template>
}
