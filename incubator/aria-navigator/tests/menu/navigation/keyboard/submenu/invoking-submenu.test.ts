import { describe, expect, it } from 'vitest';

import { Menu } from '../../../../../src';
import { settled } from '../../../../utils';
import { createRefactorMenu, getItems } from '../../../-shared';

describe('Menu Navigation', () => {
  describe('submenu navigation', () => {
    describe('invoking a menu item closes all submenus', () => {
      const { refactorMenu, shareMenu, socialMenu } = createRefactorMenu();
      const menu = new Menu(refactorMenu);
      const { fourthItem } = getItems(menu);
      const share = new Menu(shareMenu);
      const socialItem = share.items[1];
      const social = new Menu(socialMenu);
      const mastodonItem = social.items[1];

      expect(shareMenu.matches(':popover-open')).toBeFalsy();
      expect(socialMenu.matches(':popover-open')).toBeFalsy();

      it('open submenus', () => {
        fourthItem.dispatchEvent(new PointerEvent('pointerover', { bubbles: true }));
        socialItem.dispatchEvent(new PointerEvent('pointerover', { bubbles: true }));

        expect(shareMenu.matches(':popover-open')).toBeTruthy();
        expect(socialMenu.matches(':popover-open')).toBeTruthy();
      });

      it('use `Enter` on a menu item closes all submenus', async () => {
        mastodonItem.dispatchEvent(new PointerEvent('pointerover', { bubbles: true }));
        socialMenu.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));

        await settled();

        expect(shareMenu.matches(':popover-open')).toBeFalsy();
        expect(socialMenu.matches(':popover-open')).toBeFalsy();
      });
    });
  });
});
