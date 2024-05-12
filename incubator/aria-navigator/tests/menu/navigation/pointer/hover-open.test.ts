import { describe, expect, test } from 'vitest';

import { Menu } from '../../../../src';
import { settled } from '../../../utils';
import { createRefactorMenu, getItems } from '../../-shared';

describe('Menu > Navigation > With Pointer', () => {
  describe('Hover opens submenu', () => {
    const { refactorMenu, shareMenu } = createRefactorMenu();

    const menu = new Menu(refactorMenu);

    const { fourthItem } = getItems(menu);

    expect(shareMenu.matches(':popover-open')).toBeFalsy();

    test('hover item to show submenu', () => {
      fourthItem.dispatchEvent(new PointerEvent('pointerover', { bubbles: true }));

      expect(shareMenu.matches(':popover-open')).toBeTruthy();
    });

    test('keeps focus on trigger item', async () => {
      await settled();

      expect(document.activeElement).toBe(fourthItem);
    });
  });
});
