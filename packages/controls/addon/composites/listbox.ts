import { action } from '@ember/object';

import AriaCurrentStrategy from './focus-management/aria-current-strategy';
import KeyboardBlockNavigationStrategy from './navigation-strategies/keyboard-block-navigation';
import KeyboardEdgeNavigationStrategy from './navigation-strategies/keyboard-edge-navigation';
import NavigationDelegateStrategy from './navigation-strategies/navigation-delegate';
import NavigationStrategy from './navigation-strategies/navigation-strategy';
import SelectionNavigation from './navigation-strategies/selection-navigation';
import SelectableComposite, {
  SelectableCompositeOptions,
  SelectEmitter
} from './selectable-composite';

export default class Listbox extends SelectableComposite {
  private collectionNavigation: KeyboardBlockNavigationStrategy;
  private edgeNavigation: KeyboardEdgeNavigationStrategy;
  private navigationDelegate: NavigationDelegateStrategy;

  protected focusStrategy = new AriaCurrentStrategy();
  protected get navigationStrategy(): NavigationStrategy {
    return this.navigationDelegate;
  }

  constructor(
    element: HTMLElement,
    emitter: SelectEmitter,
    options?: SelectableCompositeOptions
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
    this.navigationDelegate = new NavigationDelegateStrategy(this, [
      this.collectionNavigation,
      this.edgeNavigation,
      selectionNavigation
    ]);

    element.addEventListener('listbox', this.customHandler);

    if (!element.hasAttribute('tabindex')) {
      element.setAttribute('tabindex', '0');
    }
  }

  teardown(): void {
    this.element.removeEventListener('listbox', this.customHandler);
  }

  readElements(): void {
    this.elements = [
      ...this.element.querySelectorAll('[role="option"]')
    ] as HTMLElement[];
  }

  @action
  customHandler(event: CustomEvent): void {
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
        this.focusIn();
      } else if (event.detail.command === 'select') {
        this.select(event.detail.selection);
      } else if (event.detail.command === 'activate-item') {
        this.moveFocus(event.detail.item);
      }
    }
  }
}
