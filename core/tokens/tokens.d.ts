export interface Token {
  value: string;
  comment: string;
  type: string;
  attributes: Record<string, string>;
  filePath: string;
  isSource: boolean;
  original: Record<string, unknown>;
  name: string;
  figmaName: string;
  path: string[];
}

type Tokens = Record<string, Token>;

declare const tokens: Tokens;
export default tokens;