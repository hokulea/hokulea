import { describe, expect, test, vi } from 'vitest';

import { Menu } from '../../../../src';
import { createRefactorMenu, getItems } from '../../-shared';

describe('Menu > Navigation > With Keyboard', () => {
  describe('open with `ArrowRight`', () => {
    const { refactorMenu, shareMenu } = createRefactorMenu();

    const menu = new Menu(refactorMenu);

    expect(shareMenu.matches(':popover-open')).toBeFalsy();

    const { fourthItem } = getItems(menu);

    refactorMenu.dispatchEvent(new FocusEvent('focusin'));

    test('use `ArrowRight` to open submenu', () => {
      refactorMenu.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
      refactorMenu.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
      refactorMenu.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));

      expect(fourthItem.getAttribute('tabindex')).toBe('0');

      refactorMenu.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight' }));

      expect(shareMenu.matches(':popover-open')).toBeTruthy();
    });

    test('has focus on the first item of the submenu', async () => {
      const share = new Menu(shareMenu);
      const firstItem = share.items[0];

      await vi.waitFor(() => {
        expect(firstItem.getAttribute('tabindex')).toBe('0');
        expect(document.activeElement).toBe(firstItem);
      });
    });
  });
});
