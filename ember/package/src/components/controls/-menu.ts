import type { ComponentLike } from '@glint/template';
import type { CommandAction } from 'ember-command';

export type MenuItemElement = HTMLAnchorElement | HTMLButtonElement | HTMLSpanElement;

export type MenuItemArgs = {
  push?: CommandAction;
  disabled?: boolean;
};

export interface MenuItemSignature {
  Element: MenuItemElement;
  Args: MenuItemArgs;
  Blocks: MenuItemBlocks;
}

export type MenuItemLike = ComponentLike<MenuItemSignature>;

export type MenuBlock = {
  Item: MenuItemLike;
};

export type MenuItemBlocks = {
  default?: [];
  label?: [];
  menu?: [MenuBlock];
};
