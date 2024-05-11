import { describe, expect, it } from 'vitest';

import { Menu } from '../../src';
import { createRefactorMenu, getItems } from './-shared';

async function settled() {
  await new Promise((resolve) => window.setTimeout(resolve, 1));
}

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

    describe.shuffle('submenu navigation', () => {
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

          // await settled();

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

      describe('open with `Enter`', () => {
        const { refactorMenu, shareMenu } = createRefactorMenu();

        const menu = new Menu(refactorMenu);

        expect(shareMenu.matches(':popover-open')).toBeFalsy();

        const { fourthItem } = getItems(menu);

        refactorMenu.dispatchEvent(new FocusEvent('focusin'));

        it('use `Enter` to open submenu', () => {
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

        it('has focus on the first item of the submenu', async () => {
          const share = new Menu(shareMenu);
          const firstItem = share.items[0];

          await settled();

          expect(firstItem.getAttribute('tabindex')).toBe('0');
          expect(document.activeElement).toBe(firstItem);
        });
      });

      describe('close with `ArrowLeft`', async () => {
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
        await settled();

        expect(shareMenu.matches(':popover-open')).toBeTruthy();
        expect(codeItem.getAttribute('tabindex')).toBe('0');
        expect(document.activeElement).toBe(codeItem);

        it('use `ArrowLeft` to close submenu', () => {
          // await settled();
          shareMenu.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowLeft' }));
          expect(shareMenu.matches(':popover-open')).toBeFalsy();
        });

        it('has focus moved to the trigger of the submenu', async () => {
          await settled();
          expect(document.activeElement).toBe(fourthItem);
        });
      });
    });
  });
});
