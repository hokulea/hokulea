import { action } from '@ember/object';

import ListNavigationStrategy from '../navigation-strategies/list-navigation';
import Control from './control';

export default class Listbox extends Control {
  private navigationStrategy;

  constructor(element: HTMLElement) {
    super(element);
    this.navigationStrategy = new ListNavigationStrategy(this);

    element.addEventListener('mousedown', this.navigate);
    element.addEventListener('keydown', this.navigate);
    element.addEventListener('keyup', this.navigate);
    element.addEventListener('focusin', this.focus);
    element.addEventListener('listbox', this.customHandler);
  }

  teardown() {
    this.element.removeEventListener('mousedown', this.navigate);
    this.element.removeEventListener('keydown', this.navigate);
    this.element.removeEventListener('keyup', this.navigate);
    this.element.removeEventListener('focusin', this.focus);
    this.element.removeEventListener('listbox', this.customHandler);
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

  navigateHome(event: KeyboardEvent) {
    this.navigationStrategy.navigateHome(event);
  }

  navigateEnd(event: KeyboardEvent) {
    this.navigationStrategy.navigateEnd(event);
  }

  @action
  customHandler(event: CustomEvent) {
    if (event.detail.command) {
      if (event.detail.command === 'navigate-next') {
        this.navigationStrategy.navigateNext(event.detail.originalEvent);
      } else if (event.detail.command === 'navigate-previous') {
        this.navigationStrategy.navigatePrevious(event.detail.originalEvent);
      } else if (event.detail.command === 'navigate-home') {
        this.navigationStrategy.navigateHome(event.detail.originalEvent);
      } else if (event.detail.command === 'navigate-end') {
        this.navigationStrategy.navigateEnd(event.detail.originalEvent);
      } else if (event.detail.command === 'focus') {
        this.focus();
      } else if (event.detail.command === 'select') {
        this.select(event.detail.selection);
      } else if (event.detail.command === 'activate-item') {
        this.activateItem(event.detail.item);
      }
    }
  }
}
