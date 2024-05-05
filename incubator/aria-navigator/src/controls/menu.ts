import { EndNavigation } from '../navigation-patterns/end-navigation';
import { HomeNavigation } from '../navigation-patterns/home-navigation';
import { MenuNavigation } from '../navigation-patterns/menu-navigation';
import { NextNavigation } from '../navigation-patterns/next-navigation';
import { PointerNavigation } from '../navigation-patterns/pointer-navigation';
import { PreviousNavigation } from '../navigation-patterns/previous-navigation';
import { RovingTabindexStrategy } from '../navigation-patterns/roving-tabindex-strategy';
import { ScrollToItem } from '../navigation-patterns/scroll-to-item';
import { Control } from './control';

import type { EmitStrategy, UpdateStrategy } from '..';

interface MenuOptions {
  updater?: UpdateStrategy;
  emitter?: EmitStrategy;
}

export class Menu extends Control {
  #focusStrategy: RovingTabindexStrategy = new RovingTabindexStrategy(this);

  get selection() {
    return [];
  }

  get activeItem() {
    return this.#focusStrategy.activeItem;
  }

  get prevActiveItem() {
    return this.#focusStrategy.prevActiveItem;
  }

  constructor(element: HTMLElement, options?: MenuOptions) {
    super(element, {
      capabilities: {
        singleSelection: false,
        multiSelection: false
      },
      ...options
    });

    this.registerNavigationPatterns([
      new NextNavigation(this, ['ArrowDown']),
      new PreviousNavigation(this, ['ArrowUp']),
      new HomeNavigation(this),
      new EndNavigation(this),
      new PointerNavigation(this, 'pointerover'),
      this.#focusStrategy,
      new MenuNavigation(this, this.#focusStrategy),
      new ScrollToItem(this)
    ]);

    // setup
    element.role = 'menu';

    this.readItems();
  }

  readItems() {
    this.items = [...this.element.querySelectorAll('& > [role="menuitem"]')] as HTMLElement[];

    this.ensureTabindex();
  }

  // readOptions(): void {
  //   super.readOptions();

  //   this.element.setAttribute('tabindex', this.options.disabled ? '-1' : '0');
  // }

  private ensureTabindex() {
    for (const item of this.items) {
      if (!item.getAttribute('tabindex')) {
        item.setAttribute('tabindex', '-1');
      }
    }

    if (!this.activeItem && this.items.length > 0) {
      this.items[0].setAttribute('tabindex', '0');
    }
  }
}
