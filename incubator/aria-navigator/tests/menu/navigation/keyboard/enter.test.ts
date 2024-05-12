import { describe, expect, test, vi } from 'vitest';

import { Menu } from '../../../../src';
import { createRefactorMenu, getItems } from '../../-shared';

describe('Menu > Navigation > With Keyboard', () => {
  describe('open with `Enter`', () => {
    const { refactorMenu, shareMenu } = createRefactorMenu();

    const menu = new Menu(refactorMenu);

    expect(shareMenu.matches(':popover-open')).toBeFalsy();

    const { fourthItem } = getItems(menu);

    refactorMenu.dispatchEvent(new FocusEvent('focusin'));

    test('use `Enter` to open submenu', () => {
      refactorMenu.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
      refactorMenu.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
      refactorMenu.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));

      expect(fourthItem.getAttribute('tabindex')).toBe('0');

      // Apparently, it is not really possible to trigger native behavior
      // The keyboard event is the same as the native recorded one,
      // though the native one has an `isTrusted` property set to true, which is
      // not simulatable.
      //
      // My hunch is, it needs to be a trusted event in order to trigger the popover
      //
      // @see https://developer.mozilla.org/en-US/docs/Web/API/Event/isTrusted

      // fourthItem.dispatchEvent(
      //   new KeyboardEvent('keydown', {
      //     key: 'Enter',
      //     code: 'Enter',
      //     which: 13,
      //     keyCode: 13,
      //     view: window,
      //     bubbles: true
      //   })
      // );

      // `click()` invokes the popover and is the `Enter` simulation
      // the pointer tests checking for hover anyway, so seems good here
      fourthItem.click();

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
