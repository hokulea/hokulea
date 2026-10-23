import { globalSelector, PageObject, selector as sel } from 'fractal-page-object';

import type {
  Menu,
  MenuCheckItem,
  MenuElement,
  MenuItem,
  MenuItemCheckElement,
  MenuItemElement
} from './-menu.ts';
import type { ElementLike } from 'fractal-page-object';

export class MenuCheckItemPageObject
  extends PageObject<MenuItemCheckElement>
  implements MenuCheckItem
{
  get disabled() {
    return this.element?.getAttribute('aria-disabled') === 'true';
  }

  get checked() {
    return this.element?.getAttribute('aria-checked') === 'true';
  }
}

export class MenuCheckboxPageObject extends MenuCheckItemPageObject {
  static SELECTOR = '[role="menuitemcheckbox"]';

  constructor(selector?: string, parent?: PageObject | ElementLike | null, index?: number | null) {
    super(selector ?? MenuCheckboxPageObject.SELECTOR, parent, index);
  }
}

export class MenuRadioPageObject extends MenuCheckItemPageObject {
  static SELECTOR = '[role="menuitemradio"]';

  constructor(selector?: string, parent?: PageObject | ElementLike | null, index?: number | null) {
    super(selector ?? MenuRadioPageObject.SELECTOR, parent, index);
  }
}

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

  $checkbox = sel<MenuItemCheckElement, MenuCheckItem>(
    MenuCheckboxPageObject.SELECTOR,
    MenuCheckboxPageObject
  );

  $radio = sel<MenuItemCheckElement, MenuCheckItem>(
    MenuRadioPageObject.SELECTOR,
    MenuRadioPageObject
  );
}
