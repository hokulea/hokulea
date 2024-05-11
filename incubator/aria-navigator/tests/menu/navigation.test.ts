import { describe, expect, it } from 'vitest';

import { Menu } from '../../src';
import { createRefactorMenu, getItems } from './-shared';

describe('Menu Navigation', () => {
  // describe('When Focus', () => {
  //   it('focus activates the first item', () => {
  //     const menu = createRefactorMenu();

  //     new Menu(menu);

  //     const firstItem = menu.children[0];
  //     const secondItem = menu.children[1];

  //     firstItem.dispatchEvent(new FocusEvent('focusin'));

  //     expect(menu.getAttribute('aria-activedescendant')).toBe(firstItem.id);
  //     expect(firstItem.getAttribute('aria-current')).toBe('true');
  //     expect(secondItem.getAttribute('aria-current')).toBeNull();
  //   });
  // });

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
});
