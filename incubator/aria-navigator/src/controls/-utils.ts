import type { Control, Item } from './control';

export function isItemOf(item: Item, control: Control) {
  return control.items.includes(item);
}

export function asItemOf(item: Item, control: Control): Item | undefined {
  if (isItemOf(item, control)) {
    return item;
  }

  return undefined;
}

export function isItemEnabled(item: Item) {
  return !item.hasAttribute('aria-disabled') || item.getAttribute('aria-disabled') === 'false';
}
