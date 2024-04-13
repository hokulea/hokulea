import { describe, expect, it, vi } from 'vitest';

import { IndexEmitStrategy, ItemEmitStrategy, Listbox, ReactiveUpdateStrategy } from '../../src';
import { appendItemToList } from '../components/list';
import { createListWithFruits } from './-shared';

describe('Listbox', () => {
  describe('Emitter', () => {
    describe('IndexEmitter', () => {
      const list = createListWithFruits();
      const listbox = new Listbox(list);

      const secondItem = list.children[1];
      const thirdItem = list.children[2];

      const listeners = {
        select() {},
        activateItem() {}
      };

      new IndexEmitStrategy(listbox, listeners);

      it('emits selection', () => {
        const selectSpy = vi.spyOn(listeners, 'select');

        secondItem.dispatchEvent(new PointerEvent('pointerup', { bubbles: true }));

        expect(selectSpy).toHaveBeenCalledWith([1]);
      });

      it('emits active item', () => {
        const activateItemSpy = vi.spyOn(listeners, 'activateItem');

        thirdItem.dispatchEvent(new PointerEvent('pointerup', { bubbles: true }));

        expect(activateItemSpy).toHaveBeenCalledWith(2);
      });
    });

    describe('ItemEmitter', () => {
      const list = createListWithFruits();
      const listbox = new Listbox(list);

      const secondItem = list.children[1];
      const thirdItem = list.children[2];

      const listeners = {
        select() {},
        activateItem() {}
      };

      new ItemEmitStrategy(listbox, listeners);

      it('emits selection', () => {
        const selectSpy = vi.spyOn(listeners, 'select');

        secondItem.dispatchEvent(new PointerEvent('pointerup', { bubbles: true }));

        expect(selectSpy).toHaveBeenCalledWith([secondItem]);
      });

      it('emits active item', () => {
        const activateItemSpy = vi.spyOn(listeners, 'activateItem');

        thirdItem.dispatchEvent(new PointerEvent('pointerup', { bubbles: true }));

        expect(activateItemSpy).toHaveBeenCalledWith(thirdItem);
      });
    });
  });

  describe('Updates', () => {
    describe('DOM Observer', () => {
      const list = createListWithFruits();
      const listbox = new Listbox(list);

      expect(listbox.items.length).toBe(3);

      it('reads elements on appending', async () => {
        appendItemToList('Grapefruit', list);

        await vi.waitUntil(() => list.querySelectorAll('[role="option"]').length === 4);

        expect(listbox.items.length).toBe(4);
      });

      it('reads selection on external update', async () => {
        const secondItem = list.children[1];

        expect(listbox.selection.length).toBe(0);

        secondItem.setAttribute('aria-selected', 'true');

        await vi.waitUntil(() => secondItem.getAttribute('aria-selected') === 'true');

        expect(listbox.selection.length).toBe(1);
      });

      it('removes items that contain selection', async () => {
        expect(listbox.selection.length).toBe(1);
        expect(listbox.items.length).toBe(4);

        const secondItem = list.children[1];

        list.removeChild(secondItem);

        await vi.waitUntil(() => list.querySelectorAll('[role="option"]').length === 3);

        expect(listbox.items.length).toBe(3);
        expect(listbox.selection.length).toBe(0);
      });

      describe('read options', () => {
        it('detects multi-select', async () => {
          expect(listbox.options.multiple).toBeFalsy();

          list.setAttribute('aria-multiselectable', 'true');

          await vi.waitUntil(() => list.getAttribute('aria-multiselectable') === 'true');

          expect(listbox.options.multiple).toBeTruthy();
        });

        it('detects single-select', async () => {
          expect(listbox.options.multiple).toBeTruthy();

          list.removeAttribute('aria-multiselectable');

          await vi.waitUntil(() => list.getAttribute('aria-multiselectable') === null);

          expect(listbox.options.multiple).toBeFalsy();
        });

        it('sets tabindex to -1 when the aria-disabled is `true`', async () => {
          expect(list.getAttribute('tabindex')).toBe('0');

          list.setAttribute('aria-disabled', 'true');

          await vi.waitUntil(() => list.getAttribute('aria-disabled') === 'true');

          expect(list.getAttribute('tabindex')).toBe('-1');
        });

        it('re-sets tabindex to 0 when the aria-disabled is removed', async () => {
          expect(list.getAttribute('tabindex')).toBe('-1');

          list.removeAttribute('aria-disabled');

          await vi.waitUntil(() => list.getAttribute('aria-disabled') === null);

          expect(list.getAttribute('tabindex')).toBe('0');
        });
      });
    });

    // simulating a framework with a reactive library
    describe('Reactive Updater', () => {
      const list = createListWithFruits();
      const updater = new ReactiveUpdateStrategy();
      const listbox = new Listbox(list, {
        updater
      });

      expect(listbox.items.length).toBe(3);

      it('reads elements on appending', () => {
        appendItemToList('Grapefruit', list);

        updater.updateItems();

        expect(listbox.items.length).toBe(4);
      });

      it('reads selection on external update', () => {
        const secondItem = list.children[1];

        expect(listbox.selection.length).toBe(0);

        secondItem.setAttribute('aria-selected', 'true');

        updater.updateSelection();

        expect(listbox.selection.length).toBe(1);
      });

      describe('read options', () => {
        it('detects multi-select', () => {
          expect(listbox.options.multiple).toBeFalsy();

          list.setAttribute('aria-multiselectable', 'true');

          updater.updateOptions();

          expect(listbox.options.multiple).toBeTruthy();
        });

        it('detects single-select', () => {
          expect(listbox.options.multiple).toBeTruthy();

          list.removeAttribute('aria-multiselectable');

          updater.updateOptions();

          expect(listbox.options.multiple).toBeFalsy();
        });

        it('sets tabindex to -1 when the aria-disabled is `true`', () => {
          expect(list.getAttribute('tabindex')).toBe('0');

          list.setAttribute('aria-disabled', 'true');

          updater.updateOptions();

          expect(list.getAttribute('tabindex')).toBe('-1');
        });

        it('re-sets tabindex to 0 when the aria-disabled is removed', () => {
          expect(list.getAttribute('tabindex')).toBe('-1');

          list.removeAttribute('aria-disabled');

          updater.updateOptions();

          expect(list.getAttribute('tabindex')).toBe('0');
        });
      });
    });
  });
});
