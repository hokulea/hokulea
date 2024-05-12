import { describe, expect, test, vi } from 'vitest';

import { Menu } from '../../../../src';
import { createRefactorMenu, getItems } from '../../-shared';

describe('Menu > Navigation > With Pointer', () => {
  describe('Hover through items opens and closes submenus', () => {
    const { refactorMenu, shareMenu } = createRefactorMenu();
    const menu = new Menu(refactorMenu);
    const { thirdItem, fourthItem, fifthItem } = getItems(menu);

    expect(shareMenu.matches(':popover-open')).toBeFalsy();

    test('hover third item', async () => {
      thirdItem.dispatchEvent(new PointerEvent('pointerover', { bubbles: true }));

      expect(shareMenu.matches(':popover-open')).toBeFalsy();

      await vi.waitFor(() => {
        expect(document.activeElement).toBe(thirdItem);
      });
    });

    test('hover forth item opens its submenu', async () => {
      fourthItem.dispatchEvent(new PointerEvent('pointerover', { bubbles: true }));

      expect(shareMenu.matches(':popover-open')).toBeTruthy();

      await vi.waitFor(() => {
        expect(document.activeElement).toBe(fourthItem);
      });
    });

    test('hover fifth item closes previous submenu', async () => {
      fifthItem.dispatchEvent(new PointerEvent('pointerover', { bubbles: true }));

      expect(shareMenu.matches(':popover-open')).toBeFalsy();

      await vi.waitFor(() => {
        expect(document.activeElement).toBe(fifthItem);
      });
    });
  });
});
