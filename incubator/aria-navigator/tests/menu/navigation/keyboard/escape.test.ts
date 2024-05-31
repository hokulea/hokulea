import { describe, expect, test, vi } from 'vitest';

import { Menu } from '../../../../src';
import { createRefactorMenu, getItems } from '../../-shared';

describe('Menu > Navigation > With Keyboard', () => {
  describe('close with `Escape`', async () => {
    const { refactorMenu, shareMenu } = createRefactorMenu();

    const menu = new Menu(refactorMenu);
    const share = new Menu(shareMenu);
    const codeItem = share.items[0];

    expect(shareMenu.matches(':popover-open')).toBeFalsy();

    const { fourthItem } = getItems(menu);

    refactorMenu.dispatchEvent(new FocusEvent('focusin'));
    refactorMenu.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
    refactorMenu.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
    refactorMenu.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));

    refactorMenu.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight' }));

    await vi.waitFor(() => {
      expect(shareMenu.matches(':popover-open')).toBeTruthy();
      expect(codeItem.getAttribute('tabindex')).toBe('0');
      expect(document.activeElement).toBe(codeItem);
    });

    test('use `Escape` to close submenu', () => {
      // this is our "Escape" *cough* *cough*
      // see enter.test.ts for more on this
      codeItem.click();

      shareMenu.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowLeft' }));
      expect(shareMenu.matches(':popover-open')).toBeFalsy();
    });

    test('has focus moved to the trigger of the submenu', async () => {
      await vi.waitFor(() => {
        expect(document.activeElement).toBe(fourthItem);
      });
    });
  });
});
