import { ActiveDescendentStrategy } from '../navigation-patterns/active-descendent-strategy';
import { EndNavigation } from '../navigation-patterns/end-navigation';
import { HomeNavigation } from '../navigation-patterns/home-navigation';
import { NextNavigation } from '../navigation-patterns/next-navigation';
import { PointerNavigation } from '../navigation-patterns/pointer-navigation';
import { PreviousNavigation } from '../navigation-patterns/previous-navigation';
import { ScrollToItem } from '../navigation-patterns/scroll-to-item';
import { SelectionStrategy } from '../navigation-patterns/selection-strategy';
import { Control } from './control';

import type { EmitStrategy, UpdateStrategy } from '..';

interface ListboxOptions {
  updater?: UpdateStrategy;
  emitter?: EmitStrategy;
}

export class Listbox extends Control {
  #selectionStrategy: SelectionStrategy = new SelectionStrategy(this);
  protected focusStrategy: ActiveDescendentStrategy = new ActiveDescendentStrategy(this);

  get selection() {
    return this.#selectionStrategy.selection;
  }

  get activeItem() {
    return this.focusStrategy.activeItem;
  }

  get prevActiveItem() {
    return this.focusStrategy.prevActiveItem;
  }

  constructor(element: HTMLElement, options?: ListboxOptions) {
    super(element, {
      capabilities: {
        singleSelection: true,
        multiSelection: true
      },
      optionAttributes: ['aria-multiselectable'],
      ...options
    });

    this.registerNavigationPatterns([
      new NextNavigation(this, ['ArrowDown', 'ArrowRight']),
      new PreviousNavigation(this, ['ArrowUp', 'ArrowLeft']),
      new HomeNavigation(this),
      new EndNavigation(this),
      new PointerNavigation(this),
      this.focusStrategy,
      new ScrollToItem(this),
      this.#selectionStrategy
    ]);

    // setup
    element.role = 'listbox';

    if (!element.hasAttribute('tabindex')) {
      element.setAttribute('tabindex', '0');
    }

    this.readOptions();
    this.readItems();
  }

  readItems() {
    this.items = [...this.element.querySelectorAll('[role="option"]')] as HTMLElement[];

    this.#selectionStrategy.select(
      this.selection.filter((selection) => this.items.includes(selection))
    );

    this.focusStrategy.updateItems();
  }

  readSelection(): void {
    this.#selectionStrategy.readSelection();
  }

  readOptions(): void {
    super.readOptions();

    this.element.setAttribute('tabindex', this.options.disabled ? '-1' : '0');

    this.focusStrategy.updateItems();
  }
}
