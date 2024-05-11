import { describe, expect, it } from 'vitest';

import { Menu } from '../../src';
import { createMenuElement } from '../components/menu';
import { createRefactorMenu } from './-shared';

describe('Menu', () => {
  it('renders', () => {
    const { refactorMenu } = createRefactorMenu();

    const menu = new Menu(refactorMenu);

    expect(menu.items.length).toBe(7);
  });

  describe('setup', () => {
    it('has listbox role', () => {
      const menu = createMenuElement(document.body);

      new Menu(menu);

      expect(menu.getAttribute('role')).toBe('menu');
    });

    it('sets tabindex on the first item', () => {
      const { refactorMenu } = createRefactorMenu();

      new Menu(refactorMenu);

      const firstItem = refactorMenu.querySelector('[role="menuitem"]') as HTMLElement;

      expect(firstItem.getAttribute('tabindex')).toBe('0');
    });

    it('reads items', () => {
      const { refactorMenu } = createRefactorMenu();

      const menu = new Menu(refactorMenu);

      expect(menu.items.length).toBe(7);
    });

    it('items have tabindex', () => {
      const { refactorMenu } = createRefactorMenu();

      const menu = new Menu(refactorMenu);

      expect(menu.items.map((item) => item.getAttribute('tabindex')).every(Boolean)).toBeTruthy();
    });
  });

  // describe('disabled', () => {
  //   it('focus does not work', () => {
  //     const list = createListElement(document.body);

  //     list.setAttribute('aria-disabled', 'true');

  //     new Listbox(list);

  //     list.dispatchEvent(new FocusEvent('focusin'));

  //     expect([...list.children].every((elem) => !elem.hasAttribute('aria-selected'))).toBeTruthy();
  //   });
  // });
});
