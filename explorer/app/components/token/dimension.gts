import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { registerDestructor } from '@ember/destroyable';
import { concat } from '@ember/helper';
import { action } from '@ember/object';

import { modifier } from 'ember-modifier';
import style from 'ember-style-modifier';

import { TokenName } from '../tokens';
import styles from './dimension.css';
import { findDescription } from './token';

export interface TokenArgs {
  name: string;
}

const BODY_STYLES = window.getComputedStyle(document.body);

export default class DimensionToken extends Component<TokenArgs> {
  private demo?: HTMLElement;
  @tracked computed?: string;

  get description(): string | undefined {
    return findDescription(this.args.name);
  }

  setup = modifier((element: HTMLElement) => {
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
  });

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

    return width ? `${Math.round(width * 100) / 100}px` : undefined;
  }

  <template>
    <div class={{styles.box}}>
      <div class={{styles.content}}>
        <TokenName @name={{@name}} />
        <div
          class={{styles.demo}}
          {{style fontSize=(concat 'var(' @refSize ')') --value=(concat 'var(' @name ')')}}
          {{this.setup}}
        ></div>
        <p class={{styles.description}}>{{this.description}}</p>
      </div>
      <span class={{styles.value}}>{{this.value}}</span>
    </div>
  </template>
}
