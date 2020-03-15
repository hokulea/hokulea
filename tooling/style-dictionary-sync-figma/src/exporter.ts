import TokenCollection from 'figma-token-reader/token-collection';
import { default as ReaderToken } from 'figma-token-reader/token';
import Token, { TokenType } from './token';
import Writer from './writer';
import StyleDictionary from 'style-dictionary';

export default class Exporter {
  private rawTokens: TokenCollection<ReaderToken>;
  private tokens: TokenCollection<Token>;
  private contexts: Set<string>;

  constructor(tokens: TokenCollection<ReaderToken>) {
    this.rawTokens = tokens;
    this.tokens = this.prepare();
    this.contexts = this.getContexts(this.tokens);
  }

  export() {
    const groups = this.groupByContext(this.tokens);
    for (const [group, groupTokens] of groups) {
      const writer = new Writer({
        directory: `properties/${group}`
      });

      writer.write(groupTokens);
    }
  }

  build() {
    for (const context of this.contexts) {
      const sd = StyleDictionary.extend({
        source: [`properties/${context}/**/*.json`],
        platforms: {
          [context]: {
            transformGroup: 'css',
            buildPath: 'build/',
            files: [
              {
                format: 'css/variables',
                destination: `${context}.css`,
                options: {
                  showFileHeader: false
                }
              }
            ]
          }
        }
      });

      sd.buildAllPlatforms();
    }
  }

  private prepare() {
    const tokens = this.rawTokens
      .map(this.normalizeToken)
      .map(this.classifyToken)
      .filter(this.filterToken);

    this.inlineValues(tokens);

    return tokens;
  }

  private groupByContext(tokens: TokenCollection<Token>) {
    const groups: Map<string, TokenCollection<Token>> = new Map();
    for (const context of this.contexts) {
      groups.set(
        context,
        tokens.filter(token => token.context === context)
      );
    }

    return groups;
  }

  private getContexts(tokens: TokenCollection<Token>): Set<string> {
    const contexts: Set<string> = new Set();
    for (const token of tokens) {
      contexts.add(token.context);
    }

    return contexts;
  }

  private inlineValues(tokens: TokenCollection<Token>) {
    for (const token of tokens) {
      if (token.reference) {
        const reference = this.findReference(token);

        if (reference) {
          token.value = reference.value;
          token.color = reference.color;
        }
      }
    }
  }

  private findReference(token: ReaderToken): ReaderToken | undefined {
    let reference = this.rawTokens.find(t => t.name === token.reference);
    if (reference?.reference) {
      reference = this.findReference(reference);
    }

    return reference;
  }

  private normalizeToken(token: ReaderToken): Token {
    const contextIndex = token.name.indexOf('.$');
    const context =
      contextIndex === -1 ? 'base' : token.name.slice(contextIndex + 2);

    const key = token.name
      .slice(0, contextIndex !== -1 ? contextIndex : undefined)
      .replace('/', '.')
      .replace(/\s/g, '');
    const slashIndex = token.name.indexOf('/');
    const path = token.name.slice(0, slashIndex);

    return {
      ...token,
      ...{
        type: TokenType.Basic,
        context,
        path,
        key
      }
    };
  }

  private classifyToken(token: Token): Token {
    const type = token.name.startsWith('.') ? TokenType.Basic : TokenType.Alias;

    return { ...token, ...{ type } };
  }

  private filterToken(token: Token): boolean {
    return token.type === TokenType.Alias;
  }
}
