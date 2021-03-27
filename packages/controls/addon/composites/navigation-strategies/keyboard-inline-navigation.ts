import KeyboardCollectionNavigationStrategy from './keyboard-collection-navigation';
import NavigationStrategy from './navigation-strategy';
import { scrollLeftwardsToItem, scrollRightwardsToItem } from './utils';

/**
 * Horizontal keyboard navigation coordinates left and right arrow keys
 */
export default class KeyboardInlineNavigationStrategy
  extends KeyboardCollectionNavigationStrategy
  implements NavigationStrategy {
  protected scrollTowardsPreviousItem = scrollLeftwardsToItem;
  protected scrollTowardsNextItem = scrollRightwardsToItem;

  navigate(event: Event): void {
    if (event instanceof KeyboardEvent && event.type === 'keydown') {
      // prev
      if (event.key === 'ArrowLeft') {
        this.navigatePrevious(event);
      }

      // next
      else if (event.key === 'ArrowRight') {
        this.navigateNext(event);
      }
    }
  }
}
