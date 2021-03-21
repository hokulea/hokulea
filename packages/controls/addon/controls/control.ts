import { action } from '@ember/object';

import isEqual from 'lodash.isequal';

import EmitStrategy from '../modifiers/control/emit-strategies/emit-strategy';

export type Emitter = EmitStrategy;

export type Item = HTMLElement;
export type List = Item[];
export type Tree = TreeItem[];
export type TreeItem = {
  item: Item;
  children: TreeItem[];
};

export interface ControlOptions {
  persistActiveItem?: boolean;
  persistSelection?: boolean;
}

const DEFAULT_OPTIONS: ControlOptions = {
  persistActiveItem: true,
  persistSelection: true
};

export default class Control {
  items: Item[] = [];
  selection: Item[] = [];
  activeItem?: Item;

  multiple = false;

  element: HTMLElement;
  emitter?: EmitStrategy;

  private options: ControlOptions;
  private prevActiveItem?: Item;

  constructor(
    element: HTMLElement,
    emitter: Emitter,
    options?: ControlOptions
  ) {
    this.element = element;
    this.emitter = emitter;
    this.options = {
      ...DEFAULT_OPTIONS,
      ...options
    };

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
    const selection = [
      ...this.element.querySelectorAll('[aria-selected="true"]')
    ] as HTMLElement[];

    this.select(selection);
  }

  readActiveItem() {
    const activeItem = this.element.querySelector('[aria-current]') as
      | Item
      | undefined;

    this.activateItem(activeItem);
  }

  readItems() {
    this.items = [];
  }

  // mutate state

  activateItem(item?: Item) {
    if (item === this.activeItem) {
      return;
    }

    this.prevActiveItem = this.activeItem;
    this.activeItem = item;
    this.emitter?.activateItem(this.activeItem);

    if (this.options.persistActiveItem) {
      this.persistActivateItem(this.activeItem);
    }
  }

  private persistActivateItem(item?: Item) {
    this.prevActiveItem?.removeAttribute('aria-current');
    item?.setAttribute('aria-current', 'true');
  }

  select(selection: Item[]) {
    if (isEqual(selection, this.selection)) {
      return;
    }

    this.selection = selection;
    this.emitter?.select(this.selection);

    if (this.options.persistSelection) {
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

  // event handlers

  @action
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
