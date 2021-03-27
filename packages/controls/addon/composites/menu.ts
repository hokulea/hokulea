import Composite, { CompositeOptions, Emitter } from './composite';
import TabindexStrategy from './focus-management/tabindex-strategy';
import KeyboardBlockNavigationStrategy from './navigation-strategies/keyboard-block-navigation';
import KeyboardEdgeNavigationStrategy from './navigation-strategies/keyboard-edge-navigation';
import NavigationDelegateStrategy from './navigation-strategies/navigation-delegate';
import NavigationStrategy from './navigation-strategies/navigation-strategy';

export default class Menu extends Composite {
  private collectionNavigation: KeyboardBlockNavigationStrategy;
  private edgeNavigation: KeyboardEdgeNavigationStrategy;
  private navigationDelegate: NavigationDelegateStrategy;

  protected focusStrategy = new TabindexStrategy(':scope > * > [tabindex="0"]');
  protected get navigationStrategy(): NavigationStrategy {
    return this.navigationDelegate;
  }

  constructor(
    element: HTMLElement,
    emitter: Emitter,
    options?: CompositeOptions
  ) {
    super(element, emitter, options);

    this.edgeNavigation = new KeyboardEdgeNavigationStrategy(this);
    this.collectionNavigation = new KeyboardBlockNavigationStrategy(this);
    this.navigationDelegate = new NavigationDelegateStrategy(this, [
      this.collectionNavigation,
      this.edgeNavigation
    ]);
  }

  readElements(): void {
    this.elements = [
      ...this.element.querySelectorAll(':scope > * > [role="menuitem"]')
    ] as HTMLElement[];
  }

  read(): void {
    super.read();

    const needToMakeFocussableElement = ![
      ...(this.element.parentElement?.children ?? [])
    ].some(
      sibling =>
        sibling.getAttribute('role') === 'menuitem' &&
        sibling.getAttribute('aria-haspopup') === 'true'
    );

    if (needToMakeFocussableElement) {
      const focussable = this.elements
        .map(
          item =>
            item.hasAttribute('tabindex') &&
            item.getAttribute('tabindex') === '0'
        )
        .includes(true);

      if (!focussable && this.elements.length > 0) {
        this.elements[0].setAttribute('tabindex', '0');
      }
    }
  }
}
