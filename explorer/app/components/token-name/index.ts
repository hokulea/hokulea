import Component from '@glimmer/component';

import { findDescription, findToken } from '../token/token';

export interface TokenArgs {
  name: string;
}

export default class TokenComponent extends Component<TokenArgs> {
  get description(): string | undefined {
    return findDescription(this.args.name);
  }

  get figmaName(): string | undefined {
    const token = findToken(this.args.name);

    return token?.figmaName;
  }
}
