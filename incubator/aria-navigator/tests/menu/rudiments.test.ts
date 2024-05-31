import { describe, expect, test } from 'vitest';

import { Menu } from '../../src';
import { createMenuElement } from '../components/menu';
import { createRefactorMenu } from './-shared';

describe('Menu', () => {
  test('renders', () => {
    const { refactorMenu } = createRefactorMenu();

    const menu = new Menu(refactorMenu);

    expect(menu.items.length).toBe(7);
  });

  describe('setup', () => {
    test('has menu role', () => {
      const menu = createMenuElement(document.body);

      new Menu(menu);

      expect(menu.getAttribute('role')).toBe('menu');
    });

    test('sets tabindex on the first item', () => {
      const { refactorMenu } = createRefactorMenu();

      new Menu(refactorMenu);

      const firstItem = refactorMenu.querySelector('[role="menuitem"]') as HTMLElement;

      expect(firstItem.getAttribute('tabindex')).toBe('0');
    });

    test('reads items', () => {
      const { refactorMenu } = createRefactorMenu();

      const menu = new Menu(refactorMenu);

      expect(menu.items.length).toBe(7);
    });

    test('items have tabindex', () => {
      const { refactorMenu } = createRefactorMenu();

      const menu = new Menu(refactorMenu);

      expect(menu.items.map((item) => item.getAttribute('tabindex')).every(Boolean)).toBeTruthy();
    });
  });

  describe('disabled', () => {
    test('focus does not work', () => {
      const { refactorMenu } = createRefactorMenu();

      refactorMenu.setAttribute('aria-disabled', 'true');

      const menu = new Menu(refactorMenu);

      expect(
        menu.items.map((item) => item.getAttribute('tabindex') === '-1').every(Boolean)
      ).toBeTruthy();

      refactorMenu.dispatchEvent(new FocusEvent('focusin'));
    });
  });
});
