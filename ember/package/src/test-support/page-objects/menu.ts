import { globalSelector, PageObject, selector as sel } from 'fractal-page-object';

import type { Menu, MenuElement, MenuItem, MenuItemElement } from './-menu';
import type { ElementLike } from 'fractal-page-object';

export class MenuItemPageObject extends PageObject<MenuItemElement> implements MenuItem {
  static SELECTOR = '[role="menuitem"]';

  constructor(selector?: string, parent?: PageObject | ElementLike | null, index?: number | null) {
    super(selector ?? MenuItemPageObject.SELECTOR, parent, index);
  }

  get disabled() {
    return Boolean(this.element?.hasAttribute('aria-disabled'));
  }

  get expanded(): boolean {
    return Boolean(this.menu?.element?.matches(':popover-open'));
  }

  hasMenu() {
    return this.element?.getAttribute('aria-haspopup') === 'menu';
  }

  protected get menuId() {
    return this.element?.getAttribute('popovertarget');
  }

  protected get menu(): Menu | undefined {
    return this.menuId
      ? // eslint-disable-next-line @typescript-eslint/no-use-before-define
        globalSelector<MenuElement, Menu>(`#${this.menuId}`, MenuPageObject)
      : undefined;
  }

  get $menu() {
    return this.menu;
  }
}

export class MenuPageObject extends PageObject<MenuElement> implements Menu {
  static SELECTOR = '[data-test-menu]';

  constructor(selector?: string, parent?: PageObject | ElementLike | null, index?: number | null) {
    super(selector ?? MenuPageObject.SELECTOR, parent, index);
  }

  get control() {
    return this.element as HTMLDivElement;
  }

  $item = sel<MenuItemElement, MenuItem>(MenuItemPageObject.SELECTOR, MenuItemPageObject);
}
