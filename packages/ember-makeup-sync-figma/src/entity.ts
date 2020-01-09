export default interface Entity {
  type: 'token' | 'component';

  /** Path to the file */
  path: string;

  /** Name of the key (can contain dots) */
  key: string;

  /** ID is path/key */
  id: string;

  value?: string;

  reference?: string;

  color?: {
    r: number,
    g: number,
    b: number,
    a: number
  }
}