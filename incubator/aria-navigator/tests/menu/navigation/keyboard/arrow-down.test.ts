import { describe, expect, test } from 'vitest';

import { Menu } from '../../../../src';
import { createRefactorMenu, getItems } from '../../-shared';

describe('Menu > Navigation > With Keyboard', () => {
  describe('navigate with `ArrowDown`', () => {
    const { refactorMenu } = createRefactorMenu();

    const menu = new Menu(refactorMenu);

    const { firstItem, secondItem, thirdItem, lastItem } = getItems(menu);

    expect(firstItem.getAttribute('tabindex')).toBe('0');
    expect(
      menu.items.slice(1).every((item) => item.getAttribute('tabindex') === '-1')
    ).toBeTruthy();

    refactorMenu.dispatchEvent(new FocusEvent('focusin'));

    test('use `ArrowDown` key to activate second item', () => {
      refactorMenu.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));

      expect(secondItem.getAttribute('tabindex')).toBe('0');
      expect(
        menu.items
          .filter((_, idx) => idx !== 1)
          .every((item) => item.getAttribute('tabindex') === '-1')
      ).toBeTruthy();
    });

    test('use `ArrowDown` key to activate third item', () => {
      refactorMenu.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));

      expect(thirdItem.getAttribute('tabindex')).toBe('0');
      expect(
        menu.items
          .filter((_, idx) => idx !== 2)
          .every((item) => item.getAttribute('tabindex') === '-1')
      ).toBeTruthy();
    });

    test('use `ArrowDown` key at the last item does nothing', () => {
      refactorMenu.dispatchEvent(new KeyboardEvent('keydown', { key: 'End' }));
      refactorMenu.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));

      expect(lastItem.getAttribute('tabindex')).toBe('0');
      expect(
        menu.items.slice(0, -1).every((item) => item.getAttribute('tabindex') === '-1')
      ).toBeTruthy();
    });
  });

  describe('navigate with `ArrowDown`, skipping disabled items', () => {
    const { refactorMenu } = createRefactorMenu();

    const menu = new Menu(refactorMenu);

    const { firstItem, secondItem, thirdItem, fourthItem } = getItems(menu);

    expect(firstItem.getAttribute('tabindex')).toBe('0');
    expect(
      menu.items.slice(1).every((item) => item.getAttribute('tabindex') === '-1')
    ).toBeTruthy();

    thirdItem.setAttribute('aria-disabled', 'true');

    refactorMenu.dispatchEvent(new FocusEvent('focusin'));

    test('use `ArrowDown` key to activate second item', () => {
      refactorMenu.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));

      expect(secondItem.getAttribute('tabindex')).toBe('0');
      expect(
        menu.items
          .filter((_, idx) => idx !== 1)
          .every((item) => item.getAttribute('tabindex') === '-1')
      ).toBeTruthy();
    });

    test('use `ArrowDown` key to activate fourth item', () => {
      refactorMenu.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));

      expect(fourthItem.getAttribute('tabindex')).toBe('0');
      expect(
        menu.items
          .filter((_, idx) => idx !== 3)
          .every((item) => item.getAttribute('tabindex') === '-1')
      ).toBeTruthy();
    });
  });
});
