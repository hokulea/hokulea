import { describe, expect, test } from 'vitest';

import { Menu } from '../../../../src';
import { createRefactorMenu, getItems } from '../../-shared';

describe('Menu > Navigation > With Pointer', () => {
  describe('Hover through items opens and closes submenus', () => {
    const { refactorMenu, shareMenu } = createRefactorMenu();
    const menu = new Menu(refactorMenu);
    const { thirdItem, fourthItem, fifthItem } = getItems(menu);

    expect(shareMenu.matches(':popover-open')).toBeFalsy();

    test('hover third item', () => {
      thirdItem.dispatchEvent(new PointerEvent('pointerover', { bubbles: true }));

      expect(shareMenu.matches(':popover-open')).toBeFalsy();
    });

    test('hover forth item opens its submenu', () => {
      fourthItem.dispatchEvent(new PointerEvent('pointerover', { bubbles: true }));

      expect(shareMenu.matches(':popover-open')).toBeTruthy();
    });

    test('hover fifth item closes previous submenu', () => {
      fifthItem.dispatchEvent(new PointerEvent('pointerover', { bubbles: true }));

      expect(shareMenu.matches(':popover-open')).toBeFalsy();
    });
  });
});
