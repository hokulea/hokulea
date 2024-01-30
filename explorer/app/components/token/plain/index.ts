import Component from '@glimmer/component';

import { findDescription } from '../token';

import styles from './index.css';

export interface TokenArgs {
  name: string;
}

const BODY_STYLES = window.getComputedStyle(document.body);

export default class TokenComponent extends Component<TokenArgs> {
  styles = styles;

  get description(): string | undefined {
    return findDescription(this.args.name);
  }

  get value(): string {
    return BODY_STYLES.getPropertyValue(this.args.name);
  }
}
