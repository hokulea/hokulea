import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { concat } from '@ember/helper';

import { modifier } from 'ember-modifier';
import style from 'ember-style-modifier';

import { TokenName } from '../tokens';
import styles from './radius.css';
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

  <template>
    <div class={{styles.box}}>
      <div class={{styles.demo}} {{style --value=(concat 'var(' @name ')')}}></div>
      <div class={{styles.content}}>
        <TokenName @name={{@name}} />
        <p class={{styles.description}}>{{this.description}}</p>
      </div>

      {{#if this.computable}}
        <span
          class={{styles.meter}}
          {{style --value=(concat 'var(' @name ')')}}
          {{this.setup}}
        ></span>
      {{/if}}
      <span class={{styles.value}}>{{this.value}}</span>
    </div>
  </template>
}
