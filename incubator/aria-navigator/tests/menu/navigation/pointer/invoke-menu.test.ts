import { describe, expect, test, vi } from 'vitest';

import { Menu } from '../../../../src';
import { createRefactorMenuWithTriggerButton, getItems } from '../../-shared';

describe('Menu > Navigation > With Pointer', () => {
  describe('invoking a menu item closes the menu', () => {
    const { refactorMenu, shareMenu, socialMenu, triggerButton } =
      createRefactorMenuWithTriggerButton();
    const menu = new Menu(refactorMenu);
    const { fourthItem } = getItems(menu);
    const share = new Menu(shareMenu);
    const socialItem = share.items[1];
    const social = new Menu(socialMenu);
    const mastodonItem = social.items[1];

    expect(refactorMenu.matches(':popover-open')).toBeFalsy();
    expect(shareMenu.matches(':popover-open')).toBeFalsy();
    expect(socialMenu.matches(':popover-open')).toBeFalsy();

    test('open the menus', () => {
      triggerButton.click();
      expect(refactorMenu.matches(':popover-open')).toBeTruthy();

      fourthItem.dispatchEvent(new PointerEvent('pointerover', { bubbles: true }));
      socialItem.dispatchEvent(new PointerEvent('pointerover', { bubbles: true }));

      expect(shareMenu.matches(':popover-open')).toBeTruthy();
      expect(socialMenu.matches(':popover-open')).toBeTruthy();
    });

    test('clicking a menu item closes the menu', async () => {
      mastodonItem.dispatchEvent(new PointerEvent('pointerover', { bubbles: true }));
      mastodonItem.dispatchEvent(new PointerEvent('pointerup', { bubbles: true }));

      await vi.waitFor(() => {
        expect(refactorMenu.matches(':popover-open')).toBeFalsy();
        expect(shareMenu.matches(':popover-open')).toBeFalsy();
        expect(socialMenu.matches(':popover-open')).toBeFalsy();
      });
    });
  });
});
