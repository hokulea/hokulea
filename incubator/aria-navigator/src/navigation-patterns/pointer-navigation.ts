import type { Control } from '..';
import type { Item } from '../controls/control';
import type { EventNames, NavigationParameterBag, NavigationPattern } from './navigation-pattern';

export class PointerNavigation implements NavigationPattern {
  eventListeners: EventNames[] = ['pointerup'];

  constructor(private control: Control) {}

  matches(event: Event): boolean {
    return event.type === 'pointerup';
  }

  handle(bag: NavigationParameterBag): NavigationParameterBag {
    const { event } = bag as NavigationParameterBag & { event: PointerEvent };
    const target = event.target as HTMLElement;
    let item: Item | undefined = undefined;

    if (this.control.items.includes(target)) {
      item = target;
    }

    return {
      ...bag,
      item
    };
  }
}
