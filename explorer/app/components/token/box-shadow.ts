import Component from '@glimmer/component';

import { findDescription, findValue } from './token';

export interface TokenArgs {
  name: string;
}

const BODY_STYLES = window.getComputedStyle(document.body);

export default class TokenComponent extends Component<TokenArgs> {
  get description(): string | undefined {
    return findDescription(this.args.name);
  }

  get value(): string {
    const value = BODY_STYLES.getPropertyValue(this.args.name);

    return value !== '' ? value : (findValue(this.args.name) as string);
  }
}
