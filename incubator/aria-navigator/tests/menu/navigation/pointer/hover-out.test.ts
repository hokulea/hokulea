import { describe, expect, test } from 'vitest';

import { Menu } from '../../../../src';
import { settled } from '../../../utils';
import { createRefactorMenu, getItems } from '../../-shared';

describe('Menu > Navigation > With Pointer', () => {
  describe('Hover out to trigger keeps submenu open', () => {
    const { refactorMenu, shareMenu } = createRefactorMenu();
    const menu = new Menu(refactorMenu);
    const share = new Menu(shareMenu);
    const codeItem = share.items[0];
    const { fourthItem } = getItems(menu);

    expect(shareMenu.matches(':popover-open')).toBeFalsy();

    test('hover item to show submenu', () => {
      fourthItem.dispatchEvent(new PointerEvent('pointerover', { bubbles: true }));

      expect(shareMenu.matches(':popover-open')).toBeTruthy();
    });

    test('hover into submenu moves focus', async () => {
      codeItem.dispatchEvent(new PointerEvent('pointerover', { bubbles: true }));

      await settled();

      expect(shareMenu.matches(':popover-open')).toBeTruthy();
      expect(document.activeElement).toBe(codeItem);
    });

    test('hover back to trigger moves focus and keeps the submenu open', async () => {
      shareMenu.dispatchEvent(
        new PointerEvent('pointerout', { bubbles: true, relatedTarget: fourthItem })
      );
      await settled();

      expect(shareMenu.matches(':popover-open')).toBeTruthy();
      expect(document.activeElement).toBe(fourthItem);
    });
  });
});
