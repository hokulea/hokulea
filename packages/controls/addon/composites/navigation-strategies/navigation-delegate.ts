import Composite from '../composite';
import NavigationStrategy from './navigation-strategy';

export default class NavigationDelegateStrategy {
  private strategies: NavigationStrategy[] = [];

  constructor(_: Composite, strategies: NavigationStrategy[] = []) {
    this.strategies = strategies;
  }

  navigate(event: Event): void {
    for (const strategy of this.strategies) {
      strategy.navigate(event);
    }
  }
}
