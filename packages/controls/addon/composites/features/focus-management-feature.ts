import Composite, { CompositeElement } from '../composite';
import FocusStrategy from '../focus-management/focus-strategy';
import KeyboardCollectionNavigationStrategy, {
  KeyboardCollectionNavigationListener
} from '../navigation-strategies/keyboard-collection-navigation';
import KeyboardEdgeNavigationStrategy, {
  KeyboardEdgeNavigationListener
} from '../navigation-strategies/keyboard-edge-navigation';
import MouseInvokeNavigationStrategy, {
  MouseInvokeNavigationListener
} from '../navigation-strategies/mouse-invoke-navigation';
import NavigationStrategy from '../navigation-strategies/navigation-strategy';
import Feature from './feature';

export interface FocusManagementEmitter {
  focus(element?: CompositeElement): void;
}

export interface FocusManagementOptions {
  persistFocus?: boolean;
}

export const DEFAULT_OPTIONS: FocusManagementOptions = {
  persistFocus: true
};

export default class FocusManagementFeature
  implements
    Feature,
    KeyboardCollectionNavigationListener,
    KeyboardEdgeNavigationListener,
    MouseInvokeNavigationListener {
  private composite: Composite;
  private options: FocusManagementOptions;
  private emitter?: FocusManagementEmitter;

  private focusStrategy: FocusStrategy;

  focusElement?: CompositeElement;

  constructor(
    composite: Composite,
    navigation: NavigationStrategy[],
    config: {
      emitter?: FocusManagementEmitter;
      options?: FocusManagementOptions;
      focusStrategy: FocusStrategy;
    }
  ) {
    this.composite = composite;
    this.emitter = config.emitter;
    this.focusStrategy = config.focusStrategy;
    this.options = {
      ...DEFAULT_OPTIONS,
      ...config.options
    };

    for (const strategy of navigation) {
      if (strategy instanceof KeyboardCollectionNavigationStrategy) {
        strategy.addListener(this);
      } else if (strategy instanceof KeyboardEdgeNavigationStrategy) {
        strategy.addListener(this);
      } else if (strategy instanceof MouseInvokeNavigationStrategy) {
        strategy.addListener(this);
      }
    }
  }

  read(): void {
    this.readFocus();
  }

  private readFocus(): void {
    const focusElement = this.focusStrategy.readFocus(this.composite.element);

    this.focus(focusElement);
  }

  // IO for focus management
  focus(element?: CompositeElement): void {
    if (element === this.focusElement) {
      return;
    }

    this.focusElement = element;
    this.emitter?.focus(this.focusElement);

    if (this.options.persistFocus && this.focusElement && this.focusStrategy) {
      this.focusStrategy.persistFocus(this.focusElement);
    }
  }

  // navigation strategy listeners

  invoke(element: HTMLElement, _event: MouseEvent): void {
    this.focus(element);
  }

  navigatePrevious(element: CompositeElement, _event: KeyboardEvent): void {
    this.focus(element);
  }

  navigateNext(element: CompositeElement, _event: KeyboardEvent): void {
    this.focus(element);
  }

  navigateHome(element: CompositeElement, _event: KeyboardEvent): void {
    this.focus(element);
  }

  navigateEnd(element: CompositeElement, _event: KeyboardEvent): void {
    this.focus(element);
  }
}
