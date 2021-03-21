import Control from '../control';
import NavigationStrategy from './navigation-strategy';

export default class NavigationDelegateStrategy {
  private strategies: NavigationStrategy[] = [];

  constructor(_control: Control, strategies: NavigationStrategy[] = []) {
    this.strategies = strategies;
  }

  navigate(event: Event) {
    for (const strategy of this.strategies) {
      strategy.navigate(event);
    }
  }
}
