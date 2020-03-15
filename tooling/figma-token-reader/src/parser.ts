import { GetFileResult } from 'figma-api/lib/api-types';
import Referencer from './referencers/referencer';
import Token from './token';
import TokenCollection from './token-collection';
import { Node, StylesMap, Style } from 'figma-api';
import { ReaderConfig, Complete } from '.';

type CompositeNode = Node & {
  children: Node[];
};

function isCompositeNode(node: Node) {
  return [
    'DOCUMENT',
    'FRAME',
    'GROUP',
    'CANVAS',
    'BOOLEAN',
    ' BOOLEAN_OPERATION',
    'COMPONENT'
  ].includes(node.type);
}

function isVectorNode(node: Node) {
  return [
    'VECTOR',
    'BOOLEAN',
    'BOOLEAN_OPERATION',
    'STAR',
    'LINE',
    'ELLIPSE',
    'REGULAR_POLYGON',
    'RECTANGLE',
    'TEXT'
  ].includes(node.type);
}

export default class TokenParser {
  private file: GetFileResult;
  private referencer: Referencer;
  private config: Complete<ReaderConfig>;

  private tokens!: TokenCollection<Token>;

  constructor(
    file: GetFileResult,
    referencer: Referencer,
    config: Complete<ReaderConfig>
  ) {
    this.file = file;
    this.referencer = referencer;
    this.config = config;
  }

  parse() {
    this.tokens = new TokenCollection();
    this.parseNode(this.file.document);

    return this.tokens;
  }

  private parseNode(node: Node) {
    // if (node.type === 'TEXT') {
    //   this.parseTextNode(node as Node<'TEXT'>);
    // }

    if (isVectorNode(node)) {
      this.parseVectorNode(node as Node<'VECTOR'>);
    }

    if (isCompositeNode(node)) {
      for (const child of (node as CompositeNode).children) {
        this.parseNode(child);
      }
    }
  }

  private getCategoryFromType(type: string) {
    // 'FILL' | 'STROKE' | 'TEXT' | 'EFFECT' | 'GRID'
    switch (type.toLowerCase()) {
      case 'fill':
      case 'stroke':
        return 'color';

      // case 'TEXT':
      //   return 'typography';

      default:
        return type.toLowerCase();
    }
  }

  private parseVectorNode(node: Node<'VECTOR'>) {
    if (node.styles) {
      for (const type of Object.keys(node.styles)) {
        const id = node.styles[type as keyof StylesMap];
        const style = this.getStyle(id);

        if (this.isToken(style.name)) {
          const token = this.createToken(style.name);
          token.description = style.description;
          token.category = this.getCategoryFromType(type);
          const reference = this.referencer.find(
            style.name,
            type.toLowerCase()
          );

          // see if we have a reference
          if (reference) {
            token.reference = this.normalizeTokenName(reference);
          }

          // anyway look for the value
          else {
            const key = `${type.toLowerCase()}s` as keyof Node<'VECTOR'>;
            if (key === 'fills' && node[key]) {
              // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
              // @ts-ignore
              token.color = {
                ...node[key][0].color,
                visible: node[key][0].visible ?? true
              };
            }
          }
          this.tokens.add(token);
        }
      }
    }
  }

  private getStyle(id: string) {
    return this.file.styles[id] as Style & { description: string };
  }

  private createToken(name: string): Token {
    return {
      name: this.normalizeTokenName(name)
    };
  }

  private normalizeTokenName(name: string) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    return this.config.normalizeTokenName(name);
  }

  private isToken(name: string) {
    return this.config.isToken(this.normalizeTokenName(name));
  }
}
