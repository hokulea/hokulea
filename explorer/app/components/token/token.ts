import { tokens } from '@hokulea/tokens';

import type { Token } from '@hokulea/tokens';

export function findToken(name: string): Token | undefined {
  const lookup = name.replace('--', '');

  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  if (tokens[lookup]) {
    return tokens[lookup];
  }

  return undefined;
}

export function findDescription(name: string): string | undefined {
  const token = findToken(name);

  if (token) {
    return token.description;
  }

  return undefined;
}

// eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents
export function findValue(name: string): string | number | unknown | undefined {
  const token = findToken(name);

  if (token) {
    return token.value;
  }

  return undefined;
}
