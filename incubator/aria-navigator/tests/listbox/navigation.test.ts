import { describe, expect, it } from 'vitest';

import { Listbox } from '../../src';
import { createListWithFruits, createMultiSelectListWithFruits } from './-shared';

describe('Listbox Navigation', () => {
  describe('When Focus', () => {
    it('focus activates the first item', () => {
      const list = createListWithFruits();

      new Listbox(list);

      const firstItem = list.children[0];
      const secondItem = list.children[1];

      list.dispatchEvent(new FocusEvent('focusin'));

      expect(list.getAttribute('aria-activedescendant')).toBe(firstItem.id);
      expect(firstItem.getAttribute('aria-current')).toBe('true');
      expect(secondItem.getAttribute('aria-current')).toBeNull();
    });

    it('focus activates first item of selection (Multi Select)', () => {
      const list = createMultiSelectListWithFruits();
      const listbox = new Listbox(list);

      const firstItem = list.children[0];
      const secondItem = list.children[1];
      const thirdItem = list.children[2];

      secondItem.dispatchEvent(new PointerEvent('pointerup', { bubbles: true }));
      thirdItem.dispatchEvent(new PointerEvent('pointerup', { bubbles: true, shiftKey: true }));

      expect(firstItem.getAttribute('aria-selected')).toBeNull();
      expect(secondItem.getAttribute('aria-selected')).toBe('true');
      expect(thirdItem.getAttribute('aria-selected')).toBe('true');

      expect(
        listbox.items.map((item) => item.getAttribute('aria-current')).every(Boolean)
      ).toBeFalsy();

      list.dispatchEvent(new FocusEvent('focusin'));

      expect(list.getAttribute('aria-activedescendant')).toBe(secondItem.id);
      expect(firstItem.getAttribute('aria-current')).toBeNull();
      expect(secondItem.getAttribute('aria-current')).toBe('true');
      expect(thirdItem.getAttribute('aria-current')).toBeNull();
    });
  });

  describe('With Pointer', () => {
    // describe('propagation is stopped for items', () => {
    //   let propagationStopped = false;

    //   const event = new PointerEvent('pointerup', { bubbles: true });

    //   // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //   // @ts-ignore
    //   event.__TEST__ = true;

    //   const nativeStopPropagation = event.stopPropagation;

    //   event.stopPropagation = function () {
    //     propagationStopped = true;
    //     nativeStopPropagation.call(this);
    //   };

    //   const list = createListWithFruits();

    //   new Listbox(list);

    //   it('propagation stops on item', () => {
    //     propagationStopped = false;
    //     list.children[1].dispatchEvent(event);
    //     expect(propagationStopped).toBeTruthy();
    //   });

    //   it('propagation continues when not on item', () => {
    //     propagationStopped = false;
    //     list.dispatchEvent(event);
    //     expect(propagationStopped).toBeFalsy();
    //   });
    // });

    describe('use pointer to activate items', () => {
      const list = createListWithFruits();

      new Listbox(list);

      const firstItem = list.children[0];
      const secondItem = list.children[1];
      const thirdItem = list.children[2];

      expect(list.getAttribute('aria-activedescendant')).toBeNull();
      expect(firstItem.getAttribute('aria-current')).toBeNull();
      expect(secondItem.getAttribute('aria-current')).toBeNull();
      expect(thirdItem.getAttribute('aria-current')).toBeNull();

      it('select not an item does nothing', () => {
        list.dispatchEvent(new PointerEvent('pointerup', { bubbles: true }));

        expect(list.getAttribute('aria-activedescendant')).toBeNull();
        expect(firstItem.getAttribute('aria-current')).toBeNull();
        expect(secondItem.getAttribute('aria-current')).toBeNull();
        expect(thirdItem.getAttribute('aria-current')).toBeNull();
      });

      it('select second item', () => {
        secondItem.dispatchEvent(new PointerEvent('pointerup', { bubbles: true }));

        expect(list.getAttribute('aria-activedescendant')).toBe(secondItem.id);
        expect(firstItem.getAttribute('aria-current')).toBeNull();
        expect(secondItem.getAttribute('aria-current')).toBe('true');
        expect(thirdItem.getAttribute('aria-current')).toBeNull();
      });

      it('select third item', () => {
        thirdItem.dispatchEvent(new PointerEvent('pointerup', { bubbles: true }));

        expect(list.getAttribute('aria-activedescendant')).toBe(thirdItem.id);
        expect(firstItem.getAttribute('aria-current')).toBeNull();
        expect(secondItem.getAttribute('aria-current')).toBeNull();
        expect(thirdItem.getAttribute('aria-current')).toBe('true');
      });
    });
  });

  describe('With Keyboard', () => {
    describe('navigates with HOME', () => {
      const list = createListWithFruits();

      new Listbox(list);

      const firstItem = list.children[0];
      const secondItem = list.children[1];
      const thirdItem = list.children[2];

      expect(list.getAttribute('aria-activedescendant')).toBeNull();
      expect(firstItem.getAttribute('aria-current')).toBeNull();
      expect(secondItem.getAttribute('aria-current')).toBeNull();
      expect(thirdItem.getAttribute('aria-current')).toBeNull();

      list.dispatchEvent(new KeyboardEvent('keydown', { key: 'Home' }));

      it('moves aria-activedescendant', () => {
        expect(list.getAttribute('aria-activedescendant')).toBe(firstItem.id);
      });

      it('marks items with aria-current', () => {
        expect(firstItem.getAttribute('aria-current')).toBe('true');
        expect(secondItem.getAttribute('aria-current')).toBeNull();
        expect(thirdItem.getAttribute('aria-current')).toBeNull();
      });
    });

    describe('navigates with END', () => {
      const list = createListWithFruits();

      new Listbox(list);

      const firstItem = list.children[0];
      const secondItem = list.children[1];
      const thirdItem = list.children[2];

      expect(list.getAttribute('aria-activedescendant')).toBeNull();
      expect(firstItem.getAttribute('aria-current')).toBeNull();
      expect(secondItem.getAttribute('aria-current')).toBeNull();
      expect(thirdItem.getAttribute('aria-current')).toBeNull();

      list.dispatchEvent(new KeyboardEvent('keydown', { key: 'End' }));

      it('moves aria-activedescendant', () => {
        expect(list.getAttribute('aria-activedescendant')).toBe(thirdItem.id);
      });

      it('marks items with aria-current', () => {
        expect(firstItem.getAttribute('aria-current')).toBeNull();
        expect(secondItem.getAttribute('aria-current')).toBeNull();
        expect(thirdItem.getAttribute('aria-current')).toBe('true');
      });
    });

    describe('navigate with NEXT', () => {
      const list = createListWithFruits();

      new Listbox(list);

      const firstItem = list.children[0];
      const secondItem = list.children[1];
      const thirdItem = list.children[2];

      expect(list.getAttribute('aria-activedescendant')).toBeNull();
      expect(firstItem.getAttribute('aria-current')).toBeNull();
      expect(secondItem.getAttribute('aria-current')).toBeNull();
      expect(thirdItem.getAttribute('aria-current')).toBeNull();

      it('use `ArrowDown` key when there is no active item does nothing', () => {
        list.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));

        expect(list.getAttribute('aria-activedescendant')).toBeNull();
        expect(firstItem.getAttribute('aria-current')).toBeNull();
        expect(secondItem.getAttribute('aria-current')).toBeNull();
        expect(thirdItem.getAttribute('aria-current')).toBeNull();
      });

      it('use Home key to activate first item', () => {
        list.dispatchEvent(new KeyboardEvent('keydown', { key: 'Home' }));

        expect(list.getAttribute('aria-activedescendant')).toBe(firstItem.id);
        expect(firstItem.getAttribute('aria-selected')).toBe('true');
        expect(secondItem.getAttribute('aria-selected')).toBeNull();
        expect(thirdItem.getAttribute('aria-selected')).toBeNull();
      });

      it('use ArrowDow key to activate second item', () => {
        list.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));

        expect(list.getAttribute('aria-activedescendant')).toBe(secondItem.id);
        expect(firstItem.getAttribute('aria-current')).toBeNull();
        expect(secondItem.getAttribute('aria-current')).toBe('true');
        expect(thirdItem.getAttribute('aria-current')).toBeNull();
      });

      it('use ArrowDown key to activate third item', () => {
        list.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));

        expect(list.getAttribute('aria-activedescendant')).toBe(thirdItem.id);
        expect(firstItem.getAttribute('aria-current')).toBeNull();
        expect(secondItem.getAttribute('aria-current')).toBeNull();
        expect(thirdItem.getAttribute('aria-current')).toBe('true');
      });

      it('use ArrowDown key, but keep third item activated (hit end of list)', () => {
        list.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));

        expect(list.getAttribute('aria-activedescendant')).toBe(thirdItem.id);
        expect(firstItem.getAttribute('aria-current')).toBeNull();
        expect(secondItem.getAttribute('aria-current')).toBeNull();
        expect(thirdItem.getAttribute('aria-current')).toBe('true');
      });
    });

    describe('navigate with PREV', () => {
      const list = createListWithFruits();

      new Listbox(list);

      const firstItem = list.children[0];
      const secondItem = list.children[1];
      const thirdItem = list.children[2];

      expect(list.getAttribute('aria-activedescendant')).toBeNull();
      expect(firstItem.getAttribute('aria-current')).toBeNull();
      expect(secondItem.getAttribute('aria-current')).toBeNull();
      expect(thirdItem.getAttribute('aria-current')).toBeNull();

      it('use `ArrowUp` key when there is no active item does nothing', () => {
        list.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp' }));

        expect(list.getAttribute('aria-activedescendant')).toBeNull();
        expect(firstItem.getAttribute('aria-current')).toBeNull();
        expect(secondItem.getAttribute('aria-current')).toBeNull();
        expect(thirdItem.getAttribute('aria-current')).toBeNull();
      });

      it('use End key to activate last item', () => {
        list.dispatchEvent(new KeyboardEvent('keydown', { key: 'End' }));

        expect(list.getAttribute('aria-activedescendant')).toBe(thirdItem.id);
        expect(firstItem.getAttribute('aria-current')).toBeNull();
        expect(secondItem.getAttribute('aria-current')).toBeNull();
        expect(thirdItem.getAttribute('aria-current')).toBe('true');
      });

      it('use ArrowUp key to activate second item', () => {
        list.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp' }));

        expect(list.getAttribute('aria-activedescendant')).toBe(secondItem.id);
        expect(firstItem.getAttribute('aria-current')).toBeNull();
        expect(secondItem.getAttribute('aria-current')).toBe('true');
        expect(thirdItem.getAttribute('aria-current')).toBeNull();
      });

      it('use ArrowUp key to activate first item', () => {
        list.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp' }));

        expect(list.getAttribute('aria-activedescendant')).toBe(firstItem.id);
        expect(firstItem.getAttribute('aria-current')).toBe('true');
        expect(secondItem.getAttribute('aria-current')).toBeNull();
        expect(thirdItem.getAttribute('aria-current')).toBeNull();
      });

      it('use ArrowUp key to, but keep first item activated (hit beginning of list)', () => {
        list.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp' }));

        expect(list.getAttribute('aria-activedescendant')).toBe(firstItem.id);
        expect(firstItem.getAttribute('aria-current')).toBe('true');
        expect(secondItem.getAttribute('aria-current')).toBeNull();
        expect(thirdItem.getAttribute('aria-current')).toBeNull();
      });
    });
  });
});
