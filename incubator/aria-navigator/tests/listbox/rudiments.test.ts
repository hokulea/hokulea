import { describe, expect, it } from 'vitest';

import { Listbox } from '../../src';
import { createListElement } from '../components/list';
import { createListWithFruits } from './-shared';

describe('Listbox', () => {
  it('renders', () => {
    const list = createListWithFruits();

    expect(list.children.length).toBe(3);
  });

  describe('setup', () => {
    it('has listbox role', () => {
      const list = createListElement(document.body);

      new Listbox(list);

      expect(list.getAttribute('role')).toBe('listbox');
    });

    it('sets tabindex', () => {
      const list = createListElement(document.body);

      new Listbox(list);

      expect(list.getAttribute('tabindex')).toBe('0');
    });

    it('reads items', () => {
      const list = createListWithFruits();

      const listbox = new Listbox(list);

      expect(listbox.items.length).toBe(3);
    });

    it('items have ids', () => {
      const list = createListWithFruits();

      const listbox = new Listbox(list);

      expect(listbox.items.map((item) => item.id).every(Boolean)).toBeTruthy();
    });
  });

  describe('disabled', () => {
    it('focus does not work', () => {
      const list = createListElement(document.body);

      list.setAttribute('aria-disabled', 'true');

      new Listbox(list);

      list.dispatchEvent(new FocusEvent('focusin'));

      expect([...list.children].every((elem) => !elem.hasAttribute('aria-selected'))).toBeTruthy();
    });
  });
});
