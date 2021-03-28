import KeyboardCollectionNavigationStrategy from './keyboard-collection-navigation';
import NavigationStrategy from './navigation-strategy';

/**
 * Horizontal keyboard navigation coordinates up and down arrow keys
 */
export default class KeyboardBlockNavigationStrategy
  extends KeyboardCollectionNavigationStrategy
  implements NavigationStrategy {
  navigate(event: Event): void {
    if (event instanceof KeyboardEvent && event.type === 'keydown') {
      // prev
      if (event.key === 'ArrowUp') {
        this.navigatePrevious(event);
      }

      // next
      else if (event.key === 'ArrowDown') {
        this.navigateNext(event);
      }
    }
  }
}
