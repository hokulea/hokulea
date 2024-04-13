import type { Item } from '../controls/control';

export type NavigationParameterBag = {
  event: Event;
  item?: Item;
};

export type EventNames = keyof HTMLElementEventMap;

export interface NavigationPattern {
  eventListeners?: EventNames[];

  matches(event: Event): boolean;

  prepare?(event: Event): void;

  handle(bag: NavigationParameterBag): NavigationParameterBag;
}
