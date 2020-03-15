// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import cc from 'color-converter';
// import yaml from 'js-yaml';
import path from 'path';
import fs from 'fs';
import { SyncOptions } from './package';
import TokenCollection from 'figma-token-reader/token-collection';
import Token from './token';

function set(object: object, keyPath: string[], value: unknown) {
  const lastKeyIndex = keyPath.length - 1;
  for (let i = 0; i < lastKeyIndex; ++i) {
    const key = keyPath[i] as keyof object;
    if (!(key in object)) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      // eslint-disable-next-line no-param-reassign
      object[key] = {};
    }
    // eslint-disable-next-line no-param-reassign
    object = object[key];
  }

  // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
  // @ts-ignore
  if (typeof object[keyPath[lastKeyIndex]] !== 'object') {
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    // eslint-disable-next-line no-param-reassign
    object[keyPath[lastKeyIndex]] = value;
  }
}

interface WriterOptions extends SyncOptions {
  directory: string;
}

export default class Writer {
  private options: WriterOptions;

  constructor(options: WriterOptions) {
    // this.tokens = Array.from(this.entities.values()).filter(entity => entity.type === 'token');
    // this.components = Array.from(this.entities.values()).filter(entity => entity.type === 'component');
    this.options = { color: 'hex', colorAlpha: 'rgb', ...options };
  }

  write(tokens: TokenCollection<Token>) {
    // collect files and entites
    const files: Map<string, Set<Token>> = new Map();
    for (const token of tokens) {
      if (!files.has(token.path)) {
        files.set(token.path, new Set());
      }

      files.get(token.path)?.add(token);
    }

    // create file structure
    for (const [file, fileTokens] of files.entries()) {
      const contents = {};
      for (const token of fileTokens) {
        set(contents, token.key.split('.'), {
          value: this.getValue(token),
          description: token.description,
          context: token.context
        });
      }

      this.writeFile(file, contents);
    }
  }

  private writeFile(file: string, data: object) {
    const target = `${path.join(
      this.options.directory,
      file.replace(/\./g, '/')
    )}.json`;
    const contents = JSON.stringify(data, null, '  ');
    const parent = path.dirname(target);

    if (!fs.existsSync(parent)) {
      fs.mkdirSync(parent, { recursive: true });
    }

    fs.writeFileSync(target, contents);
  }

  private getValue(token: Token): string {
    if (token.color) {
      const c = token.color;
      const color = cc.fromRGBA(c.r * 255, c.g * 255, c.b * 255, c.a);

      if (c.visible === false) {
        return 'transparent';
      }

      if (color.alpha === 1) {
        switch (this.options.color) {
          case 'rgb':
            return color.toRGB();

          case 'hsl':
            return color.toHSL();

          case 'hex':
          default:
            return color.toHex();
        }
      }

      switch (this.options.colorAlpha) {
        case 'hsl':
          return color.toHSLA();

        case 'rgb':
        default:
          return color.toRGBA();
      }
    }

    return token.value ?? '';
  }
}
