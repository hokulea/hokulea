import Component from '@glimmer/component';

import { CssLogo, FigmaLogo } from './logo';
import { findDescription, findToken } from './token/token';
import styles from './tokens.css';

import type { TOC } from '@ember/component/template-only';

const TokenList: TOC<{ Blocks: { default: [] } }> = <template>
  <div class={{styles.list}}>
    {{yield}}
  </div>
</template>;

export class TokenName extends Component<{ Args: { name: string } }> {
  get description(): string | undefined {
    return findDescription(this.args.name);
  }

  get figmaName(): string | undefined {
    const token = findToken(this.args.name);

    return token?.figmaName;
  }

  <template>
    <span class={{styles.name}}>
      <span><CssLogo /> {{@name}}</span>

      {{#if this.figmaName}}
        <span>
          <FigmaLogo />
          {{this.figmaName}}
        </span>
      {{/if}}
    </span>
  </template>
}

export { TokenList };
