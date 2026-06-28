import { Link } from 'ember-link';

import type { Importance, Intent, Spacing } from '@hokulea/tokens';
import type { CommandAction } from 'ember-command';

const LINK_PROPERTIES = [
  'active',
  'activeWithoutModels',
  'activeWithoutQueryParams',
  'entering',
  'exiting',
  // 'open', // as of `ember-link@3`
  'transitionTo',
  'replaceWith',
  'qualifiedRouteName',
  'url',
  'models',
  'queryParams'
];

function getAllPropertyNames(obj: object) {
  const names: string[] = [];

  do {
    names.push(...Object.getOwnPropertyNames(obj));
    obj = Object.getPrototypeOf(obj) as object;
  } while (obj !== Object.prototype);

  return names.filter((name) => name !== 'constructor');
}

export function isLink(commandable?: CommandAction): commandable is Link {
  if (commandable === undefined) {
    return false;
  }

  // `instanceOf` is not a reliable check, only when the host app runs with
  // embroider. In classic mode, the ember-link instance in the host app and in
  // ember-command addon are different and the check will fail, so this performs
  // some duck-type check
  const props = getAllPropertyNames(commandable);

  // the first check should be sufficient enough, but isn't due to:
  // https://github.com/gossi/ember-command/issues/23
  // so, there is another duck-type check for the link
  return commandable instanceof Link || LINK_PROPERTIES.every((prop) => props.includes(prop));
}

export interface ButtonArgs {
  intent?: Intent;
  importance?: Importance;
  spacing?: Spacing;
  disabled?: boolean;
}

export interface IconButtonArgs {
  label: string;
  /**
   * A string containing a `<svg>` element.
   * Make sure to use `currentColor` to comply with the styling
   */
  icon: string;
}

export interface ButtonBlocks {
  /** The label for the button */
  default: [];

  /** The label for the button */
  label: [];

  /** A slot in front of the label */
  before: [];

  /** A slot after the label */
  after: [];
}

export type ToggleFn = (value: boolean) => void;

export interface PressedButtonArgs {
  push?: ToggleFn;
  pressed?: boolean;
}

export function pushOrToggle(push?: ToggleFn | CommandAction, press?: boolean) {
  if (press !== undefined) {
    return () => (push as ToggleFn)(!press);
  }

  return push;
}
