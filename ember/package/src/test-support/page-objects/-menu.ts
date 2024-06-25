import type { ElementLike, PageObject } from 'fractal-page-object';

export type MenuElement = HTMLDivElement;
export type MenuItemElement = HTMLButtonElement | HTMLAnchorElement;

export interface Menu<ElementType extends ElementLike = MenuElement>
  extends PageObject<ElementType> {
  $item: MenuItem | undefined;
}

export interface MenuItem<ElementType extends ElementLike = MenuItemElement>
  extends PageObject<ElementType> {
  disabled: boolean;
  expanded: boolean;
  $menu: Menu | undefined;
}
