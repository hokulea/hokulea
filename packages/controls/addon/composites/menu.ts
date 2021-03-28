import {
  FocusManagementEmitter,
  FocusManagementOptions
} from '@hokulea/controls/composites/features/focus-management-feature';
import FocusStrategy from '@hokulea/controls/composites/focus-management/focus-strategy';

import Composite, { Features, Selectors } from './composite';
import TabindexStrategy from './focus-management/tabindex-strategy';
import KeyboardBlockNavigationStrategy from './navigation-strategies/keyboard-block-navigation';
import KeyboardEdgeNavigationStrategy from './navigation-strategies/keyboard-edge-navigation';

export type MenuEmitter = FocusManagementEmitter;
export type MenuOptions = FocusManagementOptions;

interface Config<E, O> {
  emitter?: E;
  options?: O;
  selectors?: Selectors;
}

export default class Menu<
  E extends MenuEmitter = MenuEmitter,
  O extends MenuOptions = MenuOptions
> extends Composite<E, O> {
  private collectionNavigation: KeyboardBlockNavigationStrategy;
  private edgeNavigation: KeyboardEdgeNavigationStrategy;

  protected focusStrategy: FocusStrategy;

  constructor(element: HTMLElement, config?: Config<E, O>) {
    const selectors = {
      ...{ elements: ':scope > * > [role="menuitem"]' },
      ...config?.selectors
    };
    super(element, selectors);

    this.focusStrategy = new TabindexStrategy(selectors.elements);
    this.edgeNavigation = new KeyboardEdgeNavigationStrategy(this);
    this.collectionNavigation = new KeyboardBlockNavigationStrategy(this);
    const navigations = [this.collectionNavigation, this.edgeNavigation];

    this.setup(navigations, [Features.FocusManagement], {
      emitter: config?.emitter,
      options: config?.options
    });
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
