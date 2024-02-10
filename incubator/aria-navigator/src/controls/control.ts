import isEqual from 'lodash.isequal';

import type { EmitStrategy, PersistResult } from '../emit-strategies/emit-strategy';

export type Item = HTMLElement;
export type List = Item[];
export type Tree = TreeItem[];
export type TreeItem = {
  item: Item;
  children: TreeItem[];
};

export interface ControlArgs<T = unknown> {
  items?: T[];
  selection?: T[];
  activeItem: T;
  select?: (selection: number[] | T[]) => PersistResult;
  activateItem?: (item: number | T) => PersistResult;
}

export class Control {
  items: Item[] = [];
  selection: Item[] = [];
  activeItem?: Item;
  prevActiveItem?: Item;

  multiple = false;

  element: HTMLElement;
  emitter?: EmitStrategy;

  constructor(element: HTMLElement) {
    this.element = element;

    this.readOptions();
  }

  teardown() {
    // implements this
  }

  installRemote(_element: HTMLElement) {
    // implement this
  }

  uninstallRemote(_element: HTMLElement) {
    // implement this
  }

  setEmitter(emitter: EmitStrategy) {
    this.emitter = emitter;
  }

  // read in from DOM

  public read() {
    this.readOptions();
    this.readItems();
    this.readSelection();
    this.readActiveItem();
  }

  readOptions() {
    this.multiple =
      (this.element?.hasAttribute('aria-multiselectable') &&
        this.element.getAttribute('aria-multiselectable') === 'true') ||
      false;
  }

  readSelection() {
    const selection = [...this.element.querySelectorAll('[aria-selected="true"]')] as HTMLElement[];

    this.select(selection);
  }

  readActiveItem() {
    const activeItem = this.element.querySelector('[aria-current]') as Item | undefined;

    this.activateItem(activeItem);
  }

  readItems() {
    this.items = [];
  }

  // mutate state

  select(selection: Item[]) {
    if (isEqual(selection, this.selection)) {
      return;
    }

    this.selection = selection;

    this.emitSelection();
  }

  private emitSelection() {
    const persisted = this.emitter?.select(this.selection);

    if (persisted !== true) {
      this.persistSelection(this.selection);
    }
  }

  private persistSelection(selection: Item[]) {
    for (const element of this.items) {
      if (selection.includes(element)) {
        element.setAttribute('aria-selected', 'true');
      } else {
        element.removeAttribute('aria-selected');
      }
    }
  }

  activateItem(item?: Item) {
    if (item === this.activeItem) {
      return;
    }

    this.prevActiveItem = this.activeItem;
    this.activeItem = item;

    this.emitItemActivation();
  }

  private emitItemActivation() {
    const persisted = this.emitter?.activateItem(this.activeItem);

    if (persisted !== true) {
      this.persistActivateItem(this.activeItem);
    }
  }

  private persistActivateItem(item?: Item) {
    this.prevActiveItem?.removeAttribute('aria-current');
    item?.setAttribute('aria-current', 'true');
  }

  // event handlers
  focus() {
    if (this.items.length === 0) {
      return;
    }

    if (this.selection.length > 0) {
      this.activateItem(this.selection[0]);
    } else {
      this.activateItem(this.items[0]);

      if (!this.multiple) {
        this.select([this.items[0]]);
      }
    }
  }

  navigate(_event: MouseEvent | KeyboardEvent) {
    // implement this
  }
}
