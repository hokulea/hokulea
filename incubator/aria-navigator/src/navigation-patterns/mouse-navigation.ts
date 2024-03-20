import { Control } from '..';
import { EventNames, NavigationParameterBag, NavigationPattern } from './navigation-pattern';

export class MouseNavigation implements NavigationPattern {
  eventListeners: EventNames[] = ['mouseup'];

  constructor(_control: Control) {}

  matches(event: Event): boolean {
    return event.type === 'mouseup';
  }

  handle(bag: NavigationParameterBag): NavigationParameterBag {
    const { event } = bag as NavigationParameterBag & { event: MouseEvent };
    const item = event.target as HTMLElement;

    if (item !== null) {
      event.stopPropagation();
    }

    return {
      ...bag,
      item
    };
  }
}
