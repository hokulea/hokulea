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
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        select(_indices: number[]) {},
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        activateItem(_index: number) {}
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
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        select(_indices: HTMLElement[]) {},
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        activateItem(_index: HTMLElement) {}
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

      it('reads options', async () => {
        expect(listbox.options.multiple).toBeFalsy();

        list.setAttribute('aria-multiselectable', 'true');

        await vi.waitUntil(() => list.getAttribute('aria-multiselectable') === 'true');

        expect(listbox.options.multiple).toBeTruthy();
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

      it('reads options', () => {
        expect(listbox.options.multiple).toBeFalsy();

        list.setAttribute('aria-multiselectable', 'true');

        updater.updateOptions();

        expect(listbox.options.multiple).toBeTruthy();
      });
    });
  });
});
