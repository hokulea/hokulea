import { describe, expect, it } from 'vitest';

import { Listbox } from '../../src';
import { createMultiSelectListWithFruits } from './-shared';

describe('Listbox Multi Selection', () => {
  describe('When Focus', () => {
    it('select no items', () => {
      const list = createMultiSelectListWithFruits();

      new Listbox(list);

      const firstItem = list.children[0];
      const secondItem = list.children[1];

      list.dispatchEvent(new FocusEvent('focusin'));

      expect(firstItem.getAttribute('aria-selected')).toBeNull();
      expect(secondItem.getAttribute('aria-selected')).toBeNull();
    });
  });

  describe('With Pointer', () => {
    const list = createMultiSelectListWithFruits();

    new Listbox(list);

    const firstItem = list.children[0];
    const secondItem = list.children[1];
    const thirdItem = list.children[2];

    expect(firstItem.getAttribute('aria-selected')).toBeNull();
    expect(secondItem.getAttribute('aria-selected')).toBeNull();
    expect(thirdItem.getAttribute('aria-selected')).toBeNull();

    it('select second item', () => {
      secondItem.dispatchEvent(new PointerEvent('pointerup', { bubbles: true }));

      expect(firstItem.getAttribute('aria-selected')).toBeNull();
      expect(secondItem.getAttribute('aria-selected')).toBe('true');
      expect(thirdItem.getAttribute('aria-selected')).toBeNull();
    });

    it('select third item with `Meta` key', () => {
      thirdItem.dispatchEvent(new PointerEvent('pointerup', { bubbles: true, metaKey: true }));

      expect(firstItem.getAttribute('aria-selected')).toBeNull();
      expect(secondItem.getAttribute('aria-selected')).toBe('true');
      expect(thirdItem.getAttribute('aria-selected')).toBe('true');
    });

    it('deselect second item with `Meta` key', () => {
      secondItem.dispatchEvent(new PointerEvent('pointerup', { bubbles: true, metaKey: true }));

      expect(firstItem.getAttribute('aria-selected')).toBeNull();
      expect(secondItem.getAttribute('aria-selected')).toBeNull();
      expect(thirdItem.getAttribute('aria-selected')).toBe('true');
    });

    it('select third to first item with `Shift` key', () => {
      firstItem.dispatchEvent(new PointerEvent('pointerup', { bubbles: true, shiftKey: true }));

      expect(firstItem.getAttribute('aria-selected')).toBe('true');
      expect(secondItem.getAttribute('aria-selected')).toBe('true');
      expect(thirdItem.getAttribute('aria-selected')).toBe('true');
    });
  });

  describe('With Keyboard', () => {
    describe('select with `Home`', () => {
      it('select from third to first item with `Home` and `Shift` key', () => {
        const list = createMultiSelectListWithFruits();

        new Listbox(list);

        const firstItem = list.children[0];
        const secondItem = list.children[1];
        const thirdItem = list.children[2];

        expect(firstItem.getAttribute('aria-selected')).toBeNull();
        expect(secondItem.getAttribute('aria-selected')).toBeNull();
        expect(thirdItem.getAttribute('aria-selected')).toBeNull();

        thirdItem.dispatchEvent(new PointerEvent('pointerup', { bubbles: true }));

        expect(firstItem.getAttribute('aria-selected')).toBeNull();
        expect(secondItem.getAttribute('aria-selected')).toBeNull();
        expect(thirdItem.getAttribute('aria-selected')).toBe('true');

        list.dispatchEvent(new KeyboardEvent('keydown', { key: 'Home', shiftKey: true }));

        expect(firstItem.getAttribute('aria-selected')).toBe('true');
        expect(secondItem.getAttribute('aria-selected')).toBe('true');
        expect(thirdItem.getAttribute('aria-selected')).toBe('true');
      });
    });

    describe('select with `End`', () => {
      it('select from third to first item with `Home` and `Shift` key', () => {
        const list = createMultiSelectListWithFruits();

        new Listbox(list);

        const firstItem = list.children[0];
        const secondItem = list.children[1];
        const thirdItem = list.children[2];

        expect(firstItem.getAttribute('aria-selected')).toBeNull();
        expect(secondItem.getAttribute('aria-selected')).toBeNull();
        expect(thirdItem.getAttribute('aria-selected')).toBeNull();

        thirdItem.dispatchEvent(new PointerEvent('pointerup', { bubbles: true }));

        expect(firstItem.getAttribute('aria-selected')).toBeNull();
        expect(secondItem.getAttribute('aria-selected')).toBeNull();
        expect(thirdItem.getAttribute('aria-selected')).toBe('true');

        list.dispatchEvent(new KeyboardEvent('keydown', { key: 'Home', shiftKey: true }));

        expect(firstItem.getAttribute('aria-selected')).toBe('true');
        expect(secondItem.getAttribute('aria-selected')).toBe('true');
        expect(thirdItem.getAttribute('aria-selected')).toBe('true');
      });
    });

    describe('select NEXT', () => {
      describe('select with `ArrowDown` and `Shift`', () => {
        const list = createMultiSelectListWithFruits();

        new Listbox(list);

        const firstItem = list.children[0];
        const secondItem = list.children[1];
        const thirdItem = list.children[2];

        // activate first item
        it('focus the list to activate first item', () => {
          list.dispatchEvent(new FocusEvent('focusin'));

          expect(firstItem.getAttribute('aria-selected')).toBeNull();
          expect(secondItem.getAttribute('aria-selected')).toBeNull();
          expect(thirdItem.getAttribute('aria-selected')).toBeNull();
        });

        it('use `ArrowDown` and `Shift` key to select from first to second item', () => {
          list.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', shiftKey: true }));

          expect(firstItem.getAttribute('aria-selected')).toBe('true');
          expect(secondItem.getAttribute('aria-selected')).toBe('true');
          expect(thirdItem.getAttribute('aria-selected')).toBeNull();
        });

        it('use `ArrowDown` and `Shift` key to select from first to third item', () => {
          list.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', shiftKey: true }));

          expect(firstItem.getAttribute('aria-selected')).toBe('true');
          expect(secondItem.getAttribute('aria-selected')).toBe('true');
          expect(thirdItem.getAttribute('aria-selected')).toBe('true');
        });
      });

      describe('select with `ArrowDown` and release `Shift`', () => {
        const list = createMultiSelectListWithFruits();

        new Listbox(list);

        const firstItem = list.children[0];
        const secondItem = list.children[1];
        const thirdItem = list.children[2];

        // activate first item
        it('focus the list to activate first item', () => {
          list.dispatchEvent(new FocusEvent('focusin'));

          expect(firstItem.getAttribute('aria-selected')).toBeNull();
          expect(secondItem.getAttribute('aria-selected')).toBeNull();
          expect(thirdItem.getAttribute('aria-selected')).toBeNull();
        });

        it('use `ArrowDown` and `Shift` key to select from first to second item', () => {
          list.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', shiftKey: true }));

          expect(firstItem.getAttribute('aria-selected')).toBe('true');
          expect(secondItem.getAttribute('aria-selected')).toBe('true');
          expect(thirdItem.getAttribute('aria-selected')).toBeNull();
        });

        it('Release shift', () => {
          list.dispatchEvent(new KeyboardEvent('keyup'));

          expect(firstItem.getAttribute('aria-selected')).toBe('true');
          expect(secondItem.getAttribute('aria-selected')).toBe('true');
          expect(thirdItem.getAttribute('aria-selected')).toBeNull();
        });
      });
    });

    describe('select with PREV', () => {
      const list = createMultiSelectListWithFruits();

      new Listbox(list);

      const firstItem = list.children[0];
      const secondItem = list.children[1];
      const thirdItem = list.children[2];

      it('use `End` key to activate last item', () => {
        list.dispatchEvent(new KeyboardEvent('keydown', { key: 'End' }));

        expect(firstItem.getAttribute('aria-selected')).toBeNull();
        expect(secondItem.getAttribute('aria-selected')).toBeNull();
        expect(thirdItem.getAttribute('aria-selected')).toBeNull();
      });

      it('use `ArrowUp` and `Shift` key to select third and second item', () => {
        list.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp', shiftKey: true }));

        expect(firstItem.getAttribute('aria-selected')).toBeNull();
        expect(secondItem.getAttribute('aria-selected')).toBe('true');
        expect(thirdItem.getAttribute('aria-selected')).toBe('true');
      });

      it('use `ArrowUp` and `Shift` key to select thirdt to first item', () => {
        list.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp', shiftKey: true }));

        expect(firstItem.getAttribute('aria-selected')).toBe('true');
        expect(secondItem.getAttribute('aria-selected')).toBe('true');
        expect(thirdItem.getAttribute('aria-selected')).toBe('true');
      });
    });

    describe('toggle selection with `Space` key', () => {
      const list = createMultiSelectListWithFruits();

      new Listbox(list);

      const firstItem = list.children[0];

      list.dispatchEvent(new FocusEvent('focusin'));

      expect(firstItem.getAttribute('aria-selected')).toBeNull();

      it('use `Space` to select active item', () => {
        list.dispatchEvent(new KeyboardEvent('keydown', { key: ' ' }));
        expect(firstItem.getAttribute('aria-selected')).toBe('true');
      });

      it('use `Space` to deselect active item', () => {
        list.dispatchEvent(new KeyboardEvent('keydown', { key: ' ' }));
        expect(firstItem.getAttribute('aria-selected')).toBeNull();
      });
    });

    describe('select all', () => {
      const list = createMultiSelectListWithFruits();

      const listbox = new Listbox(list);

      expect(
        listbox.items.map((item) => item.getAttribute('aria-selected')).every(Boolean)
      ).toBeFalsy();

      it('use `Meta` + `A` key to select all items', () => {
        list.dispatchEvent(new KeyboardEvent('keydown', { key: 'KeyA', metaKey: true }));

        expect(
          listbox.items.map((item) => item.getAttribute('aria-selected')).every(Boolean)
        ).toBeTruthy();
      });
    });
  });
});
