import { getProperty } from 'dot-prop';

export function pick<V = unknown>(path: string, action?: (value: V) => void) {
  return function (event: object): V | void {
    // eslint-disable-next-line @typescript-eslint/no-confusing-void-expression
    const value = getProperty(event, path) as V;

    if (!action) {
      return value;
    }

    action(value);
  };
}
