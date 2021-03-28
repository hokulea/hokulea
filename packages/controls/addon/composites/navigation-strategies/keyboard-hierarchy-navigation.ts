import Composite from '../composite';
import NavigationStrategy from './navigation-strategy';

export default class KeyboardHierarchyNavigationStrategy
  implements NavigationStrategy {
  protected composite: Composite;

  constructor(composite: Composite) {
    this.composite = composite;
  }

  navigate(event: Event): void {
    if (event instanceof KeyboardEvent && event.type === 'keydown') {
      if (event.key === 'ArrowRight') {
        this.expand(event);
      } else if (event.key === 'Escape') {
        this.collapse(event);
      }
    }
  }

  protected setupCollapseListener(event: KeyboardEvent, key: string) {
    if (event.key === 'Escape' || event.key === key) {
      this.collapse(event);
    }
  }

  protected expand(event: KeyboardEvent) {}

  protected collapse(event: KeyboardEvent) {}
}
