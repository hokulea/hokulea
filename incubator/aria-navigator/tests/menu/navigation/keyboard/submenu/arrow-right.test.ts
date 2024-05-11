import { describe, expect, it } from 'vitest';

import { Menu } from '../../../../../src';
import { settled } from '../../../../utils';
import { createRefactorMenu, getItems } from '../../../-shared';

describe('Menu Navigation', () => {
  describe('submenu navigation', () => {
    describe('open with `ArrowRight`', () => {
      const { refactorMenu, shareMenu } = createRefactorMenu();

      const menu = new Menu(refactorMenu);

      expect(shareMenu.matches(':popover-open')).toBeFalsy();

      const { fourthItem } = getItems(menu);

      refactorMenu.dispatchEvent(new FocusEvent('focusin'));

      it('use `ArrowRight` to open submenu', () => {
        refactorMenu.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
        refactorMenu.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
        refactorMenu.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));

        expect(fourthItem.getAttribute('tabindex')).toBe('0');

        refactorMenu.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight' }));

        expect(shareMenu.matches(':popover-open')).toBeTruthy();
      });

      it('has focus on the first item of the submenu', async () => {
        const share = new Menu(shareMenu);
        const firstItem = share.items[0];

        await settled();

        expect(firstItem.getAttribute('tabindex')).toBe('0');
        expect(document.activeElement).toBe(firstItem);
      });
    });
  });
});
