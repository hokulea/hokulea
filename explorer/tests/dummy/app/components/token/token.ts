import tokens, { Token } from '@hokulea/tokens/tokens';

export function findToken(name: string): Token | undefined {
  const lookup = name.replace('--', '');
  if (tokens[lookup]) {
    return tokens[lookup];
  }

  // eslint-disable-next-line unicorn/no-useless-undefined
  return undefined;
}

export function findDescription(name: string): string | undefined {
  const token = findToken(name);

  if (token) {
    return token.comment;
  }

  // eslint-disable-next-line unicorn/no-useless-undefined
  return undefined;
}
