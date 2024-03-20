import isEqual from 'lodash.isequal';

import type { EmitStrategy } from '../emit-strategies/emit-strategy';
import {
  NavigationParameterBag,
  NavigationPattern
} from '../navigation-patterns/navigation-pattern';

function pipe<Value>(input: Value, ...fns: ((input: Value) => Value)[]) {
  let lastResult = input;

  for (let fn of fns) {
    lastResult = fn(lastResult);
  }

  return lastResult;
}

interface Capabilities {
  singleSelection: boolean;
  multiSelection: boolean;
}

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
  activeItem?: T;
  select?: (selection: number[] | T[]) => void;
  activateItem?: (item: number | T) => void;
}

export class Control {
  items: Item[] = [];
  selection: Item[] = [];
  shiftItem?: Item;
  activeItem?: Item;
  prevActiveItem?: Item;

  multiple = false;

  element: HTMLElement;
  emitter?: EmitStrategy;

  capabilities: Capabilities = {
    singleSelection: false,
    multiSelection: false
  };

  private navigationPatterns: NavigationPattern[] = [];

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

  protected registerNavigationPatterns(patterns: NavigationPattern[]) {
    this.navigationPatterns = patterns;
    const eventNames = new Set(...this.navigationPatterns.map((p) => p.eventListeners ?? []));

    for (const eventName of eventNames) {
      this.element.addEventListener(eventName, this.handleEvent.bind(this));
    }
  }

  handleEvent(event: Event) {
    const patterns = this.navigationPatterns.filter((p) => p.matches(event));

    patterns.forEach((p) => p.prepare?.(event));

    pipe({ event } as NavigationParameterBag, ...patterns.map((p) => p.handle.bind(p)));
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

    this.emitter?.select(this.selection);
  }

  activateItem(item?: Item) {
    if (item === this.activeItem) {
      return;
    }

    this.prevActiveItem = this.activeItem;
    this.activeItem = item;

    this.emitter?.activateItem(this.activeItem);
  }

  navigate(_event: MouseEvent | KeyboardEvent) {
    // implement this
  }
}
