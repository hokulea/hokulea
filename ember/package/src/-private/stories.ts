export function parseOptionalBooleanArg(arg: boolean | string): boolean | undefined {
  return typeof arg === 'boolean'
    ? arg
    : typeof arg === 'string'
      ? (JSON.parse(arg) as boolean)
      : undefined;
}
