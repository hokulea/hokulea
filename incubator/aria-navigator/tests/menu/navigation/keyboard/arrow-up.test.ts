import { describe, expect, test } from 'vitest';

import { Menu } from '../../../../src';
import { createRefactorMenu, getItems } from '../../-shared';

describe('Menu > Navigation > With Keyboard', () => {
  describe('navigate with `ArrowUp`', () => {
    const { refactorMenu } = createRefactorMenu();

    const menu = new Menu(refactorMenu);

    const { firstItem, fifthItem, sixthItem, lastItem } = getItems(menu);

    expect(firstItem.getAttribute('tabindex')).toBe('0');
    expect(
      menu.items.slice(1).every((item) => item.getAttribute('tabindex') === '-1')
    ).toBeTruthy();

    refactorMenu.dispatchEvent(new FocusEvent('focusin'));

    test('use `ArrowUp` at first item does nothing', () => {
      refactorMenu.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp' }));

      expect(firstItem.getAttribute('tabindex')).toBe('0');
      expect(
        menu.items.slice(1).every((item) => item.getAttribute('tabindex') === '-1')
      ).toBeTruthy();
    });

    test('use `END` to jump to the last item', () => {
      refactorMenu.dispatchEvent(new KeyboardEvent('keydown', { key: 'End' }));

      expect(lastItem.getAttribute('tabindex')).toBe('0');
      expect(
        menu.items.slice(0, -1).every((item) => item.getAttribute('tabindex') === '-1')
      ).toBeTruthy();
    });

    test('use `ArrowUp` key to activate sixth item', () => {
      refactorMenu.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp' }));

      expect(sixthItem.getAttribute('tabindex')).toBe('0');
      expect(
        menu.items
          .filter((_, idx) => idx !== 5)
          .every((item) => item.getAttribute('tabindex') === '-1')
      ).toBeTruthy();
    });

    test('use `ArrowUp` key to activate fifth item', () => {
      refactorMenu.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp' }));

      expect(fifthItem.getAttribute('tabindex')).toBe('0');
      expect(
        menu.items
          .filter((_, idx) => idx !== 4)
          .every((item) => item.getAttribute('tabindex') === '-1')
      ).toBeTruthy();
    });
  });

  describe('navigate with `ArrowUp`, skip disabled items', () => {
    const { refactorMenu } = createRefactorMenu();

    const menu = new Menu(refactorMenu);

    const { firstItem, fourthItem, fifthItem, sixthItem, lastItem } = getItems(menu);

    expect(firstItem.getAttribute('tabindex')).toBe('0');
    expect(
      menu.items.slice(1).every((item) => item.getAttribute('tabindex') === '-1')
    ).toBeTruthy();

    fifthItem.setAttribute('aria-disabled', 'true');

    refactorMenu.dispatchEvent(new FocusEvent('focusin'));

    test('use `END` to jump to the last item', () => {
      refactorMenu.dispatchEvent(new KeyboardEvent('keydown', { key: 'End' }));

      expect(lastItem.getAttribute('tabindex')).toBe('0');
      expect(
        menu.items.slice(0, -1).every((item) => item.getAttribute('tabindex') === '-1')
      ).toBeTruthy();
    });

    test('use `ArrowUp` key to activate sixth item', () => {
      refactorMenu.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp' }));

      expect(sixthItem.getAttribute('tabindex')).toBe('0');
      expect(
        menu.items
          .filter((_, idx) => idx !== 5)
          .every((item) => item.getAttribute('tabindex') === '-1')
      ).toBeTruthy();
    });

    test('use `ArrowUp` key to activate fourth item', () => {
      refactorMenu.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp' }));

      expect(fourthItem.getAttribute('tabindex')).toBe('0');
      expect(
        menu.items
          .filter((_, idx) => idx !== 3)
          .every((item) => item.getAttribute('tabindex') === '-1')
      ).toBeTruthy();
    });
  });
});
