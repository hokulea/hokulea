import KeyboardCollectionNavigationStrategy from './keyboard-collection-navigation';
import NavigationStrategy from './navigation-strategy';
import { scrollDownwardsToItem, scrollUpwardsToItem } from './utils';

/**
 * Horizontal keyboard navigation coordinates up and down arrow keys
 */
export default class KeyboardBlockNavigationStrategy
  extends KeyboardCollectionNavigationStrategy
  implements NavigationStrategy {
  protected scrollTowardsPreviousItem = scrollUpwardsToItem;
  protected scrollTowardsNextItem = scrollDownwardsToItem;

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
