import { action } from '@ember/object';

import ListNavigationStrategy from '../navigation-strategies/list-navigation';
import Control from './control';

export default class Listbox extends Control {
  private navigationStrategy;

  constructor(element: HTMLElement) {
    super(element);
    this.navigationStrategy = new ListNavigationStrategy(this);
  }

  readItems() {
    this.items = [
      ...this.element.querySelectorAll('[role="option"]')
    ] as HTMLElement[];
  }

  @action
  navigate(event: MouseEvent | KeyboardEvent) {
    this.navigationStrategy.navigate(event);
  }
}
