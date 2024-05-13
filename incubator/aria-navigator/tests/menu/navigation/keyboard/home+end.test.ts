import { describe, expect, test } from 'vitest';

import { Menu } from '../../../../src';
import { createRefactorMenu, getItems } from '../../-shared';

describe('Menu > Navigation > With Keyboard', () => {
  describe('navigates with `Home` and `End`', () => {
    const { refactorMenu } = createRefactorMenu();

    const menu = new Menu(refactorMenu);

    const firstItem = menu.items[0];
    const lastItem = menu.items[menu.items.length - 1];

    expect(firstItem.getAttribute('tabindex')).toBe('0');
    expect(lastItem.getAttribute('tabindex')).toBe('-1');

    expect(menu.activeItem).toBeUndefined();

    test('focusing activates the first item', () => {
      refactorMenu.dispatchEvent(new FocusEvent('focusin'));

      expect(menu.activeItem).toBe(firstItem);
    });

    test('activates the last item with END', () => {
      refactorMenu.dispatchEvent(new KeyboardEvent('keydown', { key: 'End' }));

      expect(lastItem.getAttribute('tabindex')).toBe('0');
      expect(
        menu.items.slice(0, -1).every((item) => item.getAttribute('tabindex') === '-1')
      ).toBeTruthy();
    });

    test('activates the first item with HOME', () => {
      refactorMenu.dispatchEvent(new KeyboardEvent('keydown', { key: 'Home' }));

      expect(firstItem.getAttribute('tabindex')).toBe('0');
      expect(
        menu.items.slice(1).every((item) => item.getAttribute('tabindex') === '-1')
      ).toBeTruthy();
    });
  });

  describe('navigates with `Home` and `End`, skip disabled items', () => {
    const { refactorMenu } = createRefactorMenu();

    const menu = new Menu(refactorMenu);

    const { firstItem, secondItem, sixthItem, lastItem } = getItems(menu);

    expect(firstItem.getAttribute('tabindex')).toBe('0');
    expect(lastItem.getAttribute('tabindex')).toBe('-1');

    firstItem.setAttribute('aria-disabled', 'true');
    lastItem.setAttribute('aria-disabled', 'true');

    expect(menu.activeItem).toBeUndefined();

    test('focusing activates the first item', () => {
      refactorMenu.dispatchEvent(new FocusEvent('focusin'));

      expect(menu.activeItem).toBe(secondItem);
    });

    test('activates the last item with END', () => {
      refactorMenu.dispatchEvent(new KeyboardEvent('keydown', { key: 'End' }));

      expect(sixthItem.getAttribute('tabindex')).toBe('0');
      expect(
        menu.items
          .filter((_, idx) => idx !== 5)
          .every((item) => item.getAttribute('tabindex') === '-1')
      ).toBeTruthy();
    });

    test('activates the first item with HOME', () => {
      refactorMenu.dispatchEvent(new KeyboardEvent('keydown', { key: 'Home' }));

      expect(secondItem.getAttribute('tabindex')).toBe('0');
      expect(
        menu.items
          .filter((_, idx) => idx !== 1)
          .every((item) => item.getAttribute('tabindex') === '-1')
      ).toBeTruthy();
    });
  });
});
