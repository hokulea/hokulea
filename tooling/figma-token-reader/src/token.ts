export default interface Token {
  // Generic Properties
  name: string;

  description?: string;

  // Value Properties

  category?: string;

  /** Any  */
  value?: string;

  reference?: string;

  color?: {
    r: number;
    g: number;
    b: number;
    a: number;
    visible: boolean;
  };
}
