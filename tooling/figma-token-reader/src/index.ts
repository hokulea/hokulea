import { Api as FigmaClient } from 'figma-api';
import TokenParser from './parser';
import Referencer from './referencers/referencer';
import ReferencerFactory from './referencers/referencer-factory';

export interface ReaderConfig {
  referencer?: ReferencerConfig;
  isToken: (name: string) => boolean;
  normalizeTokenName?: (name: string) => string;
}

export enum ReferencerType {
  FigmaPlugin = 'figma-plugin'
}

export type ReferencerConfig = FigmaPlugin & {
  type: ReferencerType;
};

export interface FigmaPlugin {
  type: ReferencerType.FigmaPlugin;
  plugin: string;
  options: object;
}

/**
 * From https://medium.com/terria/typescript-transforming-optional-properties-to-required-properties-that-may-be-undefined-7482cb4e1585
 */
export type Complete<T> = {
  [P in keyof Required<T>]: Pick<T, P> extends Required<Pick<T, P>>
    ? T[P]
    : T[P] | undefined;
};

export default class FigmaTokenReader {
  private config: Complete<ReaderConfig>;
  private referencer!: Referencer;

  constructor(config: ReaderConfig) {
    this.config = {
      ...{
        referencer: undefined,
        normalizeTokenName(name) {
          return name.replace(/\s/, '');
        }
      },
      ...config
    };

    this.referencer = ReferencerFactory.create(this.config.referencer);
  }

  async read(figmaFile: string, figmaSecret: string) {
    // read figma
    const figmaClient = new FigmaClient({
      personalAccessToken: figmaSecret
    });

    const file = await figmaClient.getFile(figmaFile);

    // create referencer
    await this.referencer.setup();

    const parser = new TokenParser(file, this.referencer, this.config);
    return parser.parse();
  }
}
