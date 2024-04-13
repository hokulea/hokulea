import type { Control } from '..';
import type { EventNames, NavigationParameterBag, NavigationPattern } from './navigation-pattern';

export function isHomeEvent(event: Event): boolean {
  return event instanceof KeyboardEvent && event.type === 'keydown' && event.key === 'Home';
}

export class HomeNavigation implements NavigationPattern {
  eventListeners: EventNames[] = ['keydown'];

  constructor(private control: Control) {}

  matches(event: Event): boolean {
    return isHomeEvent(event) && this.control.items.length > 0;
  }

  handle(bag: NavigationParameterBag): NavigationParameterBag {
    return {
      ...bag,
      item: this.control.items[0]
    };
  }
}
