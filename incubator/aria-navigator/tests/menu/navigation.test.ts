import { describe, expect, it } from 'vitest';

import { Menu } from '../../src';
import { settled } from '../utils';
import { createRefactorMenu, createRefactorMenuWithTriggerButton, getItems } from './-shared';

describe('Menu Navigation', () => {
  describe('When Focus', () => {
    const { refactorMenu } = createRefactorMenu();

    const menu = new Menu(refactorMenu);

    const { firstItem } = getItems(menu);

    expect(firstItem.getAttribute('tabindex')).toBe('0');
    expect(
      menu.items.slice(1).every((item) => item.getAttribute('tabindex') === '-1')
    ).toBeTruthy();

    expect(menu.activeItem).toBeUndefined();

    it('focus activates the first item', () => {
      refactorMenu.dispatchEvent(new FocusEvent('focusin'));

      expect(menu.activeItem).toBe(firstItem);
    });
  });

  describe('With Keyboard', () => {
    describe('navigates with HOME and END', () => {
      const { refactorMenu } = createRefactorMenu();

      const menu = new Menu(refactorMenu);

      const firstItem = menu.items[0];
      const lastItem = menu.items[menu.items.length - 1];

      expect(firstItem.getAttribute('tabindex')).toBe('0');
      expect(lastItem.getAttribute('tabindex')).toBe('-1');

      expect(menu.activeItem).toBeUndefined();

      it('focusing activates the first item', () => {
        refactorMenu.dispatchEvent(new FocusEvent('focusin'));

        expect(menu.activeItem).toBe(firstItem);
      });

      it('activates the last item with END', () => {
        refactorMenu.dispatchEvent(new KeyboardEvent('keydown', { key: 'End' }));

        expect(lastItem.getAttribute('tabindex')).toBe('0');
        expect(
          menu.items.slice(0, -1).every((item) => item.getAttribute('tabindex') === '-1')
        ).toBeTruthy();
      });

      it('activates the first item with HOME', () => {
        refactorMenu.dispatchEvent(new KeyboardEvent('keydown', { key: 'Home' }));

        expect(firstItem.getAttribute('tabindex')).toBe('0');
        expect(
          menu.items.slice(1).every((item) => item.getAttribute('tabindex') === '-1')
        ).toBeTruthy();
      });
    });

    describe('navigate with NEXT', () => {
      const { refactorMenu } = createRefactorMenu();

      const menu = new Menu(refactorMenu);

      const { firstItem, secondItem, thirdItem, lastItem } = getItems(menu);

      expect(firstItem.getAttribute('tabindex')).toBe('0');
      expect(
        menu.items.slice(1).every((item) => item.getAttribute('tabindex') === '-1')
      ).toBeTruthy();

      refactorMenu.dispatchEvent(new FocusEvent('focusin'));

      it('use `ArrowDown` key to activate second item', () => {
        refactorMenu.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));

        expect(secondItem.getAttribute('tabindex')).toBe('0');
        expect(
          menu.items
            .filter((_, idx) => idx !== 1)
            .every((item) => item.getAttribute('tabindex') === '-1')
        ).toBeTruthy();
      });

      it('use `ArrowDown` key to activate third item', () => {
        refactorMenu.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));

        expect(thirdItem.getAttribute('tabindex')).toBe('0');
        expect(
          menu.items
            .filter((_, idx) => idx !== 2)
            .every((item) => item.getAttribute('tabindex') === '-1')
        ).toBeTruthy();
      });

      it('use `ArrowDown` key at the last item does nothing', () => {
        refactorMenu.dispatchEvent(new KeyboardEvent('keydown', { key: 'End' }));
        refactorMenu.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));

        expect(lastItem.getAttribute('tabindex')).toBe('0');
        expect(
          menu.items.slice(0, -1).every((item) => item.getAttribute('tabindex') === '-1')
        ).toBeTruthy();
      });
    });

    describe('navigate with PREV', () => {
      const { refactorMenu } = createRefactorMenu();

      const menu = new Menu(refactorMenu);

      const { firstItem, fifthItem, sixthItem, lastItem } = getItems(menu);

      expect(firstItem.getAttribute('tabindex')).toBe('0');
      expect(
        menu.items.slice(1).every((item) => item.getAttribute('tabindex') === '-1')
      ).toBeTruthy();

      refactorMenu.dispatchEvent(new FocusEvent('focusin'));

      it('use `ArrowUp` at first item does nothing', () => {
        refactorMenu.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp' }));

        expect(firstItem.getAttribute('tabindex')).toBe('0');
        expect(
          menu.items.slice(1).every((item) => item.getAttribute('tabindex') === '-1')
        ).toBeTruthy();
      });

      it('use `END` to jump to the last item', () => {
        refactorMenu.dispatchEvent(new KeyboardEvent('keydown', { key: 'End' }));

        expect(lastItem.getAttribute('tabindex')).toBe('0');
        expect(
          menu.items.slice(0, -1).every((item) => item.getAttribute('tabindex') === '-1')
        ).toBeTruthy();
      });

      it('use `ArrowUp` key to activate sixth item', () => {
        refactorMenu.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp' }));

        expect(sixthItem.getAttribute('tabindex')).toBe('0');
        expect(
          menu.items
            .filter((_, idx) => idx !== 5)
            .every((item) => item.getAttribute('tabindex') === '-1')
        ).toBeTruthy();
      });

      it('use `ArrowUp` key to activate fifth item', () => {
        refactorMenu.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp' }));

        expect(fifthItem.getAttribute('tabindex')).toBe('0');
        expect(
          menu.items
            .filter((_, idx) => idx !== 4)
            .every((item) => item.getAttribute('tabindex') === '-1')
        ).toBeTruthy();
      });
    });
  });

  describe('With Pointer', () => {
    describe('Hover activates item', () => {
      const { refactorMenu } = createRefactorMenu();

      const menu = new Menu(refactorMenu);

      const { firstItem, secondItem } = getItems(menu);

      expect(
        menu.items.slice(1).every((item) => item.getAttribute('tabindex') === '-1')
      ).toBeTruthy();

      expect(menu.activeItem).toBeFalsy();

      it('hovers first item to make it active', () => {
        firstItem.dispatchEvent(new PointerEvent('pointerover', { bubbles: true }));

        expect(firstItem.getAttribute('tabindex')).toBe('0');

        expect(menu.activeItem).toBe(firstItem);
      });

      it('hovers second item to make it active', () => {
        secondItem.dispatchEvent(new PointerEvent('pointerover', { bubbles: true }));

        expect(menu.activeItem).toBe(secondItem);
        expect(
          menu.items
            .filter((_, idx) => idx !== 1)
            .every((item) => item.getAttribute('tabindex') === '-1')
        ).toBeTruthy();
        expect(secondItem.getAttribute('tabindex')).toBe('0');
      });
    });

    describe('Hover opens submenu', () => {
      const { refactorMenu, shareMenu } = createRefactorMenu();

      const menu = new Menu(refactorMenu);

      const { fourthItem } = getItems(menu);

      expect(shareMenu.matches(':popover-open')).toBeFalsy();

      it('hover item to show submenu', () => {
        fourthItem.dispatchEvent(new PointerEvent('pointerover', { bubbles: true }));

        expect(shareMenu.matches(':popover-open')).toBeTruthy();
      });

      it('keeps focus on trigger item', async () => {
        await settled();

        expect(document.activeElement).toBe(fourthItem);
      });
    });

    describe('Hover out to trigger keeps submenu open', () => {
      const { refactorMenu, shareMenu } = createRefactorMenu();
      const menu = new Menu(refactorMenu);
      const share = new Menu(shareMenu);
      const codeItem = share.items[0];
      const { fourthItem } = getItems(menu);

      expect(shareMenu.matches(':popover-open')).toBeFalsy();

      it('hover item to show submenu', () => {
        fourthItem.dispatchEvent(new PointerEvent('pointerover', { bubbles: true }));

        expect(shareMenu.matches(':popover-open')).toBeTruthy();
      });

      it('hover into submenu moves focus', async () => {
        codeItem.dispatchEvent(new PointerEvent('pointerover', { bubbles: true }));

        await settled();

        expect(shareMenu.matches(':popover-open')).toBeTruthy();
        expect(document.activeElement).toBe(codeItem);
      });

      it('hover back to trigger moves focus and keeps the submenu open', async () => {
        shareMenu.dispatchEvent(
          new PointerEvent('pointerout', { bubbles: true, relatedTarget: fourthItem })
        );
        await settled();

        expect(shareMenu.matches(':popover-open')).toBeTruthy();
        expect(document.activeElement).toBe(fourthItem);
      });
    });

    describe('Hover through items opens and closes submenus', () => {
      const { refactorMenu, shareMenu } = createRefactorMenu();
      const menu = new Menu(refactorMenu);
      const { thirdItem, fourthItem, fifthItem } = getItems(menu);

      expect(shareMenu.matches(':popover-open')).toBeFalsy();

      it('hover third item', () => {
        thirdItem.dispatchEvent(new PointerEvent('pointerover', { bubbles: true }));

        expect(shareMenu.matches(':popover-open')).toBeFalsy();
      });

      it('hover forth item opens its submenu', () => {
        fourthItem.dispatchEvent(new PointerEvent('pointerover', { bubbles: true }));

        expect(shareMenu.matches(':popover-open')).toBeTruthy();
      });

      it('hover fifth item closes previous submenu', () => {
        fifthItem.dispatchEvent(new PointerEvent('pointerover', { bubbles: true }));

        expect(shareMenu.matches(':popover-open')).toBeFalsy();
      });
    });

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

      it('open the sub- submenu', () => {
        fourthItem.dispatchEvent(new PointerEvent('pointerover', { bubbles: true }));
        socialItem.dispatchEvent(new PointerEvent('pointerover', { bubbles: true }));

        expect(shareMenu.matches(':popover-open')).toBeTruthy();
        expect(socialMenu.matches(':popover-open')).toBeTruthy();
      });

      it('clicking a menu item closes all submenus', async () => {
        mastodonItem.dispatchEvent(new PointerEvent('pointerover', { bubbles: true }));
        mastodonItem.dispatchEvent(new PointerEvent('pointerup', { bubbles: true }));

        await settled();

        expect(shareMenu.matches(':popover-open')).toBeFalsy();
        expect(socialMenu.matches(':popover-open')).toBeFalsy();
      });
    });

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

      it('open the menus', () => {
        triggerButton.click();
        expect(refactorMenu.matches(':popover-open')).toBeTruthy();

        fourthItem.dispatchEvent(new PointerEvent('pointerover', { bubbles: true }));
        socialItem.dispatchEvent(new PointerEvent('pointerover', { bubbles: true }));

        expect(shareMenu.matches(':popover-open')).toBeTruthy();
        expect(socialMenu.matches(':popover-open')).toBeTruthy();
      });

      it('clicking a menu item closes the menu', async () => {
        mastodonItem.dispatchEvent(new PointerEvent('pointerover', { bubbles: true }));
        mastodonItem.dispatchEvent(new PointerEvent('pointerup', { bubbles: true }));

        await settled();

        expect(refactorMenu.matches(':popover-open')).toBeFalsy();
        expect(shareMenu.matches(':popover-open')).toBeFalsy();
        expect(socialMenu.matches(':popover-open')).toBeFalsy();
      });
    });
  });
});
