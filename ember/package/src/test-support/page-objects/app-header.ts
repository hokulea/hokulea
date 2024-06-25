import { PageObject, selector as sel } from 'fractal-page-object';

import { IconPageObject } from './icon';
import { MenuItemPageObject } from './menu';

import type { Menu, MenuItem, MenuItemElement } from './-menu';
import type {
  ElementLike,
  GenericPageObject,
  PageObjectConstructor
} from 'fractal-page-object/dist/-private/types';

class AppNavPageObject extends PageObject<HTMLElement> implements Menu<HTMLElement> {
  $item = sel<MenuItemElement, MenuItem>(
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    NavItemPageObject.SELECTOR,
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment, @typescript-eslint/no-use-before-define
    NavItemPageObject as unknown as PageObjectConstructor<HTMLElement, MenuItem>
  );
}

export class NavItemPageObject extends MenuItemPageObject implements MenuItem {
  static SELECTOR = '[part="item"]';

  constructor(
    selector?: string,
    parent?: GenericPageObject | ElementLike | null,
    index?: number | null
  ) {
    super(selector ?? NavItemPageObject.SELECTOR, parent, index);
  }

  hasMenu() {
    return super.hasMenu() || this.element?.tagName.toLowerCase() === 'summary';
  }

  isPopupNavItem() {
    return (
      this.element?.tagName.toLowerCase() === 'summary' ||
      this.element?.parentElement?.tagName === 'details'
    );
  }

  get expanded() {
    return Boolean(
      this.isPopupNavItem()
        ? (this.element?.parentElement as HTMLElement).matches('[open]')
        : super.expanded
    );
  }

  get $menu() {
    if (this.isPopupNavItem()) {
      return sel<HTMLElement, Menu>(
        '+ div',
        AppNavPageObject as unknown as PageObjectConstructor<HTMLElement, Menu>
      );
    }

    return this.menu;
  }
}

export class AppHeaderPageObject extends PageObject<HTMLElement> {
  static SELECTOR = '[data-test-app-header]';

  constructor(
    selector?: string,
    parent?: GenericPageObject | ElementLike | null,
    index?: number | null
  ) {
    super(selector ?? AppHeaderPageObject.SELECTOR, parent, index);
  }

  get #prefix() {
    if (this.$menu.element) {
      return '[part="menu"]';
    }

    return '';
  }

  get $brand() {
    return sel<HTMLDivElement>(`${this.#prefix} [part="brand"]`);
  }

  get $nav() {
    return sel(`${this.#prefix} nav`, AppNavPageObject);
  }

  get $aux() {
    return sel<HTMLSpanElement>(`${this.#prefix} [part="aux"]`);
  }

  $menu = sel(
    '[part="menu"]',
    class extends PageObject<HTMLSpanElement> {
      $toggle = sel(
        '[data-test-toggle]',
        class extends PageObject<HTMLButtonElement> {
          $icon = sel('[data-test-toggle="icon"]', IconPageObject);
        }
      );

      $popover = sel(
        'section',
        class extends PageObject<HTMLElement> {
          get expanded() {
            return Boolean(this.element?.matches(':popover-open'));
          }
        }
      );
    }
  );
}
