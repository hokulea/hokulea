import { describe, expect, test } from 'vitest';

import { Menu } from '../../../../src';
import { createRefactorMenu, getItems } from '../../-shared';

describe('Menu > Navigation > With Pointer', () => {
  describe('Hover activates item', () => {
    const { refactorMenu } = createRefactorMenu();

    const menu = new Menu(refactorMenu);

    const { firstItem, secondItem } = getItems(menu);

    expect(
      menu.items.slice(1).every((item) => item.getAttribute('tabindex') === '-1')
    ).toBeTruthy();

    expect(menu.activeItem).toBeFalsy();

    test('hovers first item to make it active', () => {
      firstItem.dispatchEvent(new PointerEvent('pointerover', { bubbles: true }));

      expect(firstItem.getAttribute('tabindex')).toBe('0');

      expect(menu.activeItem).toBe(firstItem);
    });

    test('hovers second item to make it active', () => {
      secondItem.dispatchEvent(new PointerEvent('pointerover', { bubbles: true }));

      expect(menu.activeItem).toBe(secondItem);
      expect(
        menu.items
          .filter((_, idx) => idx !== 1)
          .every((item) => item.getAttribute('tabindex') === '-1')
      ).toBeTruthy();
      expect(secondItem.getAttribute('tabindex')).toBe('0');
    });
  });
});
