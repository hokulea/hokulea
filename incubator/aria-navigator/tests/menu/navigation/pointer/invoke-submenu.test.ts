import { describe, expect, test, vi } from 'vitest';

import { Menu } from '../../../../src';
import { createRefactorMenu, getItems } from '../../-shared';

describe('Menu > Navigation > With Pointer', () => {
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

    test('open the sub- submenu', () => {
      fourthItem.dispatchEvent(new PointerEvent('pointerover', { bubbles: true }));
      socialItem.dispatchEvent(new PointerEvent('pointerover', { bubbles: true }));

      expect(shareMenu.matches(':popover-open')).toBeTruthy();
      expect(socialMenu.matches(':popover-open')).toBeTruthy();
    });

    test('clicking a menu item closes all submenus', async () => {
      mastodonItem.dispatchEvent(new PointerEvent('pointerover', { bubbles: true }));
      mastodonItem.dispatchEvent(new PointerEvent('pointerup', { bubbles: true }));

      await vi.waitFor(() => {
        expect(shareMenu.matches(':popover-open')).toBeFalsy();
        expect(socialMenu.matches(':popover-open')).toBeFalsy();
      });
    });
  });
});
