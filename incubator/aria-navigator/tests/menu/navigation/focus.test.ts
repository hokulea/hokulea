import { describe, expect, it } from 'vitest';

import { Menu } from '../../../src';
import { createRefactorMenu, getItems } from '../-shared';

describe('Menu > Navigation', () => {
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
});
