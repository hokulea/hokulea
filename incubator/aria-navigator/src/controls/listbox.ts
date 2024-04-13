import { v4 as uuidv4 } from 'uuid';

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
  #focusStrategy: ActiveDescendentStrategy = new ActiveDescendentStrategy(this);

  get selection() {
    return this.#selectionStrategy.selection;
  }

  get activeItem() {
    return this.#focusStrategy.activeItem;
  }

  get prevActiveItem() {
    return this.#focusStrategy.prevActiveItem;
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
      this.#focusStrategy,
      new ScrollToItem(this),
      this.#selectionStrategy
    ]);

    // setup
    element.role = 'listbox';

    if (!element.hasAttribute('tabindex')) {
      element.setAttribute('tabindex', '0');
    }

    this.readItems();
  }

  readItems() {
    this.items = [...this.element.querySelectorAll('[role="option"]')] as HTMLElement[];

    this.ensureIds();

    this.#selectionStrategy.select(
      this.selection.filter((selection) => this.items.includes(selection))
    );
  }

  readSelection(): void {
    this.#selectionStrategy.readSelection();
  }

  readOptions(): void {
    super.readOptions();

    this.element.setAttribute('tabindex', this.options.disabled ? '-1' : '0');
  }

  private ensureIds() {
    for (const item of this.items) {
      if (!item.id) {
        item.id = uuidv4();
      }
    }
  }
}
