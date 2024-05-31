import type { Control } from '..';
import type { EventNames, NavigationParameterBag, NavigationPattern } from './navigation-pattern';

export function isEndEvent(event: Event): boolean {
  return event instanceof KeyboardEvent && event.type === 'keydown' && event.key === 'End';
}

export class EndNavigation implements NavigationPattern {
  eventListeners: EventNames[] = ['keydown'];

  constructor(private control: Control) {}

  matches(event: Event): boolean {
    return isEndEvent(event) && this.control.enabledItems.length > 0;
  }

  handle(bag: NavigationParameterBag): NavigationParameterBag {
    const lastOffset = this.control.enabledItems.length - 1;

    return {
      ...bag,
      item: this.control.enabledItems[lastOffset]
    };
  }
}
