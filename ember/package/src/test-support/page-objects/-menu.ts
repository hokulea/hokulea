import type { PageObject } from 'fractal-page-object';

export type MenuElement = HTMLDivElement | HTMLElement;
export type MenuItemElement = HTMLButtonElement | HTMLAnchorElement;
export type MenuItemCheckElement = HTMLSpanElement;

export interface Menu<ElementType extends Element = MenuElement> extends PageObject<ElementType> {
  $item: MenuItem | undefined;
}

export interface MenuItem<
  ElementType extends Element = MenuItemElement
> extends PageObject<ElementType> {
  disabled: boolean;
  expanded: boolean;
  $menu: Menu | undefined;
}

export interface MenuCheckItem<
  ElementType extends Element = MenuItemCheckElement
> extends PageObject<ElementType> {
  disabled: boolean;
  checked: boolean;
}
