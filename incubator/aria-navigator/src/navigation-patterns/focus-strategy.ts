import type { Item } from '../controls/control';

export interface FocusStrategy {
  activeItem?: Item;
  prevActiveItem?: Item;
  activateItem(item: Item): void;
  updateItems(): void;
}
