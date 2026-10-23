import type { PushArgs } from '../../-private/push.gts';
import type { ComponentLike } from '@glint/template';

export type MenuItemElement = HTMLAnchorElement | HTMLButtonElement | HTMLSpanElement;

export type MenuItemArgs = PushArgs & {
  disabled?: boolean;
};

export interface MenuItemSignature {
  Element: MenuItemElement;
  Args: MenuItemArgs;
  Blocks: MenuItemBlocks;
}

export type MenuItemLike = ComponentLike<MenuItemSignature>;

export type MenuBuilder = {
  Item: MenuItemLike;
};

export type MenuItemBlocks = {
  default?: [];
  label?: [];
  menu?: [MenuBuilder];
};
