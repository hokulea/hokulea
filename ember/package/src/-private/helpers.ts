import { get } from '@ember/object';

/* Shamelessly stolen from: https://github.com/DockYard/ember-composable-helpers/blob/master/addon/helpers/pick.js */
function pick<V = unknown>(path: string, action?: (value: V) => void) {
  return function (event: object): V | void {
    let value = get(event, path) as V;

    if (!action) {
      return value;
    }

    action(value);
  };
}

const or = (a: unknown, b: unknown) => a || b;

const and = (a: unknown, b: unknown) => a && b;

const eq = (a: unknown, b: unknown) => a === b;

const not = (a: boolean) => !a;

const asString = (value: unknown): string => {
  return value as string;
};

const asNumber = (value: unknown): number => {
  return value as number;
};

const asBoolean = (value: unknown): boolean => {
  return value as boolean;
};

export { and, asBoolean, asNumber, asString, eq, not, or, pick };
