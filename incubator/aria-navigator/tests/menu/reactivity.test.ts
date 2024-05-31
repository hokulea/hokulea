import { describe, expect, it, vi } from 'vitest';

import { Menu, ReactiveUpdateStrategy } from '../../src';
import { appendItemToMenu } from '../components/menu';
import { createRefactorMenu } from './-shared';

describe('Menu', () => {
  describe('Updates', () => {
    describe('DOM Observer', () => {
      const { refactorMenu } = createRefactorMenu();

      const menu = new Menu(refactorMenu);

      expect(menu.items.length).toBe(7);

      it('reads elements on appending', async () => {
        appendItemToMenu(refactorMenu, 'Command Palette');

        await vi.waitUntil(
          () => refactorMenu.querySelectorAll('& > [role="menuitem"]').length === 8
        );

        expect(menu.items.length).toBe(8);
      });

      describe('read options', () => {
        it('sets tabindex to -1 when the aria-disabled is `true`', async () => {
          expect(menu.items[0].getAttribute('tabindex')).toBe('0');
          expect(
            menu.items
              .slice(1)
              .map((item) => item.getAttribute('tabindex') === '-1')
              .every(Boolean)
          ).toBeTruthy();

          refactorMenu.setAttribute('aria-disabled', 'true');

          await vi.waitUntil(() => refactorMenu.getAttribute('aria-disabled') === 'true');

          expect(
            menu.items.map((item) => item.getAttribute('tabindex') === '-1').every(Boolean)
          ).toBeTruthy();
        });

        it('re-sets tabindex to 0 when the aria-disabled is removed', async () => {
          expect(
            menu.items.map((item) => item.getAttribute('tabindex') === '-1').every(Boolean)
          ).toBeTruthy();

          refactorMenu.removeAttribute('aria-disabled');

          await vi.waitUntil(() => refactorMenu.getAttribute('aria-disabled') === null);

          expect(menu.items[0].getAttribute('tabindex')).toBe('0');
          expect(
            menu.items
              .slice(1)
              .map((item) => item.getAttribute('tabindex') === '-1')
              .every(Boolean)
          ).toBeTruthy();
        });
      });
    });

    // simulating a framework with a reactive library
    describe('Reactive Updater', () => {
      const { refactorMenu } = createRefactorMenu();
      const updater = new ReactiveUpdateStrategy();
      const menu = new Menu(refactorMenu, {
        updater
      });

      expect(menu.items.length).toBe(7);

      it('reads elements on appending', () => {
        appendItemToMenu(refactorMenu, 'Command Palette');

        updater.updateItems();

        expect(menu.items.length).toBe(8);
      });

      describe('read options', () => {
        it('sets tabindex to -1 when the aria-disabled is `true`', () => {
          expect(menu.items[0].getAttribute('tabindex')).toBe('0');
          expect(
            menu.items
              .slice(1)
              .map((item) => item.getAttribute('tabindex') === '-1')
              .every(Boolean)
          ).toBeTruthy();

          refactorMenu.setAttribute('aria-disabled', 'true');

          updater.updateOptions();

          expect(
            menu.items.map((item) => item.getAttribute('tabindex') === '-1').every(Boolean)
          ).toBeTruthy();
        });

        it('re-sets tabindex to 0 when the aria-disabled is removed', () => {
          expect(
            menu.items.map((item) => item.getAttribute('tabindex') === '-1').every(Boolean)
          ).toBeTruthy();

          refactorMenu.removeAttribute('aria-disabled');

          updater.updateOptions();

          expect(menu.items[0].getAttribute('tabindex')).toBe('0');
          expect(
            menu.items
              .slice(1)
              .map((item) => item.getAttribute('tabindex') === '-1')
              .every(Boolean)
          ).toBeTruthy();
        });
      });
    });
  });
});
