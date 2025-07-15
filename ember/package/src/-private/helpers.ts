import { get } from '@ember/object';

/* Shamelessly stolen from: https://github.com/DockYard/ember-composable-helpers/blob/master/addon/helpers/pick.js */
function pick<V = unknown>(path: string, action?: (value: V) => void) {
  return function (event: object): V | void {
    const value = get(event, path) as V;

    if (!action) {
      return value;
    }

    action(value);
  };
}

// eslint-disable-next-line unicorn/no-array-reduce, @typescript-eslint/prefer-nullish-coalescing
const or = (...conditions: unknown[]) => conditions.reduce((a, b) => a || b, false);

const and = (a: unknown, b: unknown) => a && b;

const eq = (a: unknown, b: unknown) => a === b;

const not = (a: boolean) => !a;

const notEq = (a: unknown, b: unknown) => a !== b;

const asString = (value: unknown): string => {
  return value as string;
};

const asNumber = (value: unknown): number => {
  return value as number;
};

const asBoolean = (value: unknown): boolean => {
  return value as boolean;
};

export { and, asBoolean, asNumber, asString, eq, not, notEq, or, pick };
