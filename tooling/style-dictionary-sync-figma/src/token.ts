export enum TokenType {
  Basic,
  Alias,
  Component
}

export default interface Token {
  type: TokenType;

  /** Path to the file */
  path: string;

  /** Name of the key (can contain dots) */
  key: string;

  context: string;

  // Generic Properties
  name: string;

  description?: string;

  // Value Properties

  category?: string;

  /** Any  */
  reference?: string;

  value?: string;

  color?: {
    r: number;
    g: number;
    b: number;
    a: number;
    visible: boolean;
  };
}
