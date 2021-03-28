import { action } from '@ember/object';

import FocusManagementFeature, {
  FocusManagementEmitter,
  FocusManagementOptions
} from './features/focus-management-feature';
import SelectionFeature, {
  SelectionEmitter,
  SelectionOptions
} from './features/selection-feature';
import FocusStrategy from './focus-management/focus-strategy';
import NavigationStrategy from './navigation-strategies/navigation-strategy';

export type CompositeElement = HTMLElement;
// export type List = CompositeElement[];
// export type Tree = TreeItem[];
// export type TreeItem = {
//   item: CompositeElement;
//   children: TreeItem[];
// };

export interface CompositeOptions {
  persistFocus?: boolean;
  persistSelection?: boolean;
}

export enum Features {
  FocusManagement,
  Selection,
  Hierarchy
}

interface Config<E, O> {
  emitter?: E;
  options?: O;
}

export interface Selectors {
  elements: string;
}

export type Emitter = SelectionEmitter | FocusManagementEmitter;
export type Options = SelectionOptions | FocusManagementOptions;

export default abstract class Composite<
  E extends Emitter = Emitter,
  O extends Options = Options
> {
  element: HTMLElement;
  elements: CompositeElement[] = [];
  protected selectors: {
    elements: string;
  };

  // features
  selection?: SelectionFeature;
  focusManagement?: FocusManagementFeature;

  protected abstract get focusStrategy(): FocusStrategy;
  protected navigationStrategies: NavigationStrategy[] = [];

  constructor(element: HTMLElement, selectors: Selectors) {
    this.element = element;
    this.selectors = selectors;

    element.addEventListener('mousedown', this.navigate);
    element.addEventListener('mouseup', this.navigate);
    element.addEventListener('keydown', this.navigate);
    element.addEventListener('keyup', this.navigate);
    element.addEventListener('focusin', this.focusIn);
    element.addEventListener('focusout', this.focusOut);
  }

  teardown(): void {
    this.element.removeEventListener('mousedown', this.navigate);
    this.element.removeEventListener('mouseup', this.navigate);
    this.element.removeEventListener('keydown', this.navigate);
    this.element.removeEventListener('keyup', this.navigate);
    this.element.removeEventListener('focusin', this.focusIn);
    this.element.removeEventListener('focusout', this.focusOut);
  }

  protected setup(
    navigation: NavigationStrategy[],
    features: Features[],
    config: Config<E, O>
  ): void {
    this.navigationStrategies = navigation;

    if (features.includes(Features.FocusManagement)) {
      this.focusManagement = new FocusManagementFeature(this, navigation, {
        ...config,
        focusStrategy: this.focusStrategy
      } as Config<FocusManagementEmitter, FocusManagementOptions> & {
        focusStrategy: FocusStrategy;
      });
    }

    if (features.includes(Features.Selection)) {
      this.selection = new SelectionFeature(
        this,
        navigation,
        config as Config<SelectionEmitter, SelectionOptions>
      );
      this.navigationStrategies.push(this.selection);
    }
  }

  // read in from DOM

  public read(): void {
    this.readElements();
    this.focusManagement?.read();
    this.selection?.read();
  }

  readElements(): void {
    this.elements = [
      ...this.element.querySelectorAll(this.selectors.elements)
    ] as CompositeElement[];
  }

  // event handlers

  @action
  focusIn(event: FocusEvent): void {
    if (this.elements.length === 0) {
      return;
    }

    if (this.focusManagement) {
      if (this.selection) {
        const { selection, multiple } = this.selection;

        if (selection.length > 0) {
          this.focusManagement.focus(selection[0]);
        } else {
          this.focusManagement.focus(this.elements[0]);

          if (!multiple) {
            this.selection.select([this.elements[0]]);
          }
        }
      } else if (!this.hasFocus(event)) {
        this.focusManagement.focus(this.elements[0]);
      }
    }
  }

  @action
  focusOut(): void {
    // implement this
  }

  @action
  navigate(event: MouseEvent | KeyboardEvent): void {
    for (const strategy of this.navigationStrategies) {
      strategy.navigate(event);
    }
  }

  protected hasFocus(event: FocusEvent): boolean {
    if (!document.activeElement) {
      return false;
    }

    // quick and cheap check if active element _IS_ the composite
    if (document.activeElement === this.element) {
      return true;
    }

    // check if activeElement is _WITHIN_ the composite
    return this.elements.includes(event.relatedTarget as HTMLElement);
  }
}
