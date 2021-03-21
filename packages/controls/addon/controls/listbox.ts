import { action } from '@ember/object';

import Control, { ControlOptions, Emitter } from './control';
import KeyboardBlockNavigationStrategy from './navigation-strategies/keyboard-block-navigation';
import KeyboardEdgeNavigationStrategy from './navigation-strategies/keyboard-edge-navigation';
import NavigationDelegateStrategy from './navigation-strategies/navigation-delegate';
import SelectionNavigation from './navigation-strategies/selection-navigation';

export default class Listbox extends Control {
  private navigationStrategy;

  private collectionNavigation: KeyboardBlockNavigationStrategy;
  private edgeNavigation: KeyboardEdgeNavigationStrategy;

  constructor(
    element: HTMLElement,
    emitter: Emitter,
    options?: ControlOptions
  ) {
    super(element, emitter, options);
    const selectionNavigation = new SelectionNavigation(this);

    this.edgeNavigation = new KeyboardEdgeNavigationStrategy(
      this,
      selectionNavigation
    );
    this.collectionNavigation = new KeyboardBlockNavigationStrategy(
      this,
      selectionNavigation
    );
    this.navigationStrategy = new NavigationDelegateStrategy(this, [
      this.collectionNavigation,
      this.edgeNavigation,
      selectionNavigation
    ]);

    element.addEventListener('mousedown', this.navigate);
    element.addEventListener('mouseup', this.navigate);
    element.addEventListener('keydown', this.navigate);
    element.addEventListener('keyup', this.navigate);
    element.addEventListener('focusin', this.focus);
    element.addEventListener('listbox', this.customHandler);

    if (!element.hasAttribute('tabindex')) {
      element.setAttribute('tabindex', '0');
    }
  }

  teardown() {
    this.element.removeEventListener('mousedown', this.navigate);
    this.element.removeEventListener('mouseup', this.navigate);
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

  // navigateHome(event: KeyboardEvent) {
  //   this.edgeNavigation.navigateHome(event);
  // }

  // navigateEnd(event: KeyboardEvent) {
  //   this.edgeNavigation.navigateEnd(event);
  // }

  @action
  customHandler(event: CustomEvent) {
    if (event.detail.command) {
      if (event.detail.command === 'navigate-next') {
        this.collectionNavigation.navigateNext(event.detail.originalEvent);
      } else if (event.detail.command === 'navigate-previous') {
        this.collectionNavigation.navigatePrevious(event.detail.originalEvent);
      } else if (event.detail.command === 'navigate-home') {
        this.edgeNavigation.navigateHome(event.detail.originalEvent);
      } else if (event.detail.command === 'navigate-end') {
        this.edgeNavigation.navigateEnd(event.detail.originalEvent);
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
