import { describe, expect, it } from 'vitest';

import { Listbox } from '../../src';
import { createListWithFruits } from './-shared';

describe('Listbox Single Selection', () => {
  describe('When Focus', () => {
    it('select first item with FOCUS', () => {
      const list = createListWithFruits();

      new Listbox(list);

      const firstItem = list.children[0];
      const secondItem = list.children[1];

      list.dispatchEvent(new FocusEvent('focusin'));

      expect(firstItem.getAttribute('aria-selected')).toBe('true');
      expect(secondItem.getAttribute('aria-selected')).toBeNull();
    });
  });

  describe('With Pointer', () => {
    const list = createListWithFruits();

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

    it('select third item', () => {
      thirdItem.dispatchEvent(new PointerEvent('pointerup', { bubbles: true }));

      expect(firstItem.getAttribute('aria-selected')).toBeNull();
      expect(secondItem.getAttribute('aria-selected')).toBeNull();
      expect(thirdItem.getAttribute('aria-selected')).toBe('true');
    });
  });

  describe('With Keyboard', () => {
    it('select first item with `Home` key', () => {
      const list = createListWithFruits();

      new Listbox(list);

      const firstItem = list.children[0];
      const secondItem = list.children[1];
      const thirdItem = list.children[2];

      expect(firstItem.getAttribute('aria-selected')).toBeNull();
      expect(secondItem.getAttribute('aria-selected')).toBeNull();
      expect(thirdItem.getAttribute('aria-selected')).toBeNull();

      list.dispatchEvent(new KeyboardEvent('keydown', { key: 'Home' }));

      expect(firstItem.getAttribute('aria-selected')).toBe('true');
      expect(secondItem.getAttribute('aria-selected')).toBeNull();
      expect(thirdItem.getAttribute('aria-selected')).toBeNull();
    });

    it('select last item with `End` key', () => {
      const list = createListWithFruits();

      new Listbox(list);

      const firstItem = list.children[0];
      const secondItem = list.children[1];
      const thirdItem = list.children[2];

      expect(firstItem.getAttribute('aria-selected')).toBeNull();
      expect(secondItem.getAttribute('aria-selected')).toBeNull();
      expect(thirdItem.getAttribute('aria-selected')).toBeNull();

      list.dispatchEvent(new KeyboardEvent('keydown', { key: 'End' }));

      expect(firstItem.getAttribute('aria-selected')).toBeNull();
      expect(secondItem.getAttribute('aria-selected')).toBeNull();
      expect(thirdItem.getAttribute('aria-selected')).toBe('true');
    });

    describe('select with NEXT', () => {
      const list = createListWithFruits();

      new Listbox(list);

      const firstItem = list.children[0];
      const secondItem = list.children[1];
      const thirdItem = list.children[2];

      it('focus list to select first item', () => {
        list.dispatchEvent(new FocusEvent('focusin'));

        expect(firstItem.getAttribute('aria-selected')).toBe('true');
        expect(secondItem.getAttribute('aria-selected')).toBeNull();
        expect(thirdItem.getAttribute('aria-selected')).toBeNull();
      });

      it('use `ArrowDown` key to select second item', () => {
        list.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));

        expect(firstItem.getAttribute('aria-selected')).toBeNull();
        expect(secondItem.getAttribute('aria-selected')).toBe('true');
        expect(thirdItem.getAttribute('aria-selected')).toBeNull();
      });

      it('use `ArrowDown` key to select third item', () => {
        list.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));

        expect(firstItem.getAttribute('aria-selected')).toBeNull();
        expect(secondItem.getAttribute('aria-selected')).toBeNull();
        expect(thirdItem.getAttribute('aria-selected')).toBe('true');
      });

      it('use `ArrowDown` key, but keep third item selected (hit end of list)', () => {
        list.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));

        expect(firstItem.getAttribute('aria-selected')).toBeNull();
        expect(secondItem.getAttribute('aria-selected')).toBeNull();
        expect(thirdItem.getAttribute('aria-selected')).toBe('true');
      });
    });

    describe('select with PREV', () => {
      const list = createListWithFruits();

      new Listbox(list);

      const firstItem = list.children[0];
      const secondItem = list.children[1];
      const thirdItem = list.children[2];

      it('use End key to select last item', () => {
        list.dispatchEvent(new KeyboardEvent('keydown', { key: 'End' }));

        expect(firstItem.getAttribute('aria-selected')).toBeNull();
        expect(secondItem.getAttribute('aria-selected')).toBeNull();
        expect(thirdItem.getAttribute('aria-selected')).toBe('true');
      });

      it('use `ArrowUp` key to select second item', () => {
        list.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp' }));

        expect(firstItem.getAttribute('aria-selected')).toBeNull();
        expect(secondItem.getAttribute('aria-selected')).toBe('true');
        expect(thirdItem.getAttribute('aria-selected')).toBeNull();
      });

      it('use `ArrowUp` key to select first item', () => {
        list.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp' }));

        expect(firstItem.getAttribute('aria-selected')).toBe('true');
        expect(secondItem.getAttribute('aria-selected')).toBeNull();
        expect(thirdItem.getAttribute('aria-selected')).toBeNull();
      });

      it('use `ArrowUp` key to, but keep first item selected (hit beginning of list)', () => {
        list.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp' }));

        expect(firstItem.getAttribute('aria-selected')).toBe('true');
        expect(secondItem.getAttribute('aria-selected')).toBeNull();
        expect(thirdItem.getAttribute('aria-selected')).toBeNull();
      });
    });
  });
});
