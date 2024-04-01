import styles from '@hokulea/core/controls.module.css';

import { Listbox } from '../../src';

export class List {
  private element!: HTMLDivElement;
  private behavior!: Listbox;

  constructor(parent: HTMLElement) {
    this.createElement(parent);
  }

  createElement(parent: HTMLElement) {
    console.log('parent', parent);

    this.element = document.createElement('div');
    this.element.role = 'listbox';
    this.element.classList.add(styles.list);

    parent.appendChild(this.element);

    this.behavior = new Listbox(this.element);
  }

  setItems(items: string[]) {
    for (const item of items) {
      const elem = document.createElement('span');

      elem.append(item);
      elem.role = 'option';

      this.element.appendChild(elem);
    }
  }
}

export function createListElement(parent: HTMLElement) {
  const element = document.createElement('div') as HTMLDivElement;

  element.role = 'listbox';
  element.classList.add(styles.list);

  parent.appendChild(element);

  return element;
}

export function appendItemToList(item: string, parent: HTMLElement) {
  const elem = document.createElement('span');

  elem.append(item);
  elem.role = 'option';

  parent.appendChild(elem);

  return elem;
}
