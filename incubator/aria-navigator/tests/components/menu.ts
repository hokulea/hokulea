import { v4 as uuid } from 'uuid';

import styles from '@hokulea/core/navigation.module.css';

import { Menu as MenuBehavior } from '../../src';

export function createMenuElement(parent: HTMLElement) {
  const element = document.createElement('div');

  element.role = 'menu';
  element.classList.add(styles.menu);

  parent.append(element);

  return element;
}

export function appendItemToMenu(parent: HTMLElement, item: string) {
  const elem = document.createElement('button');

  elem.append(item);
  elem.type = 'button';
  elem.role = 'menuitem';

  parent.append(elem);

  return elem;
}

export function appendSubmenuToMenu(parent: HTMLElement, item: string, menu: HTMLElement) {
  menu.id = uuid();
  menu.setAttribute('popover', '');

  const elem = appendItemToMenu(parent, item);

  elem.setAttribute('popovertarget', menu.id);

  parent.append(menu);
}

export function withTriggerButton(parent: HTMLElement, menu: HTMLElement) {
  menu.id = uuid();
  menu.setAttribute('popover', '');

  const trigger = document.createElement('button');

  trigger.setAttribute('popovertarget', menu.id);

  parent.append(trigger);

  return trigger;
}

export class Menu {
  private element!: HTMLDivElement;

  constructor(parent: HTMLElement) {
    this.createElement(parent);
  }

  createElement(parent: HTMLElement) {
    this.element = createMenuElement(parent);

    new MenuBehavior(this.element);
  }

  setItems(items: string[]) {
    for (const item of items) {
      appendItemToMenu(this.element, item);
    }
  }
}
