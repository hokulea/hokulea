import { DomObserverUpdateStrategy } from '..';

import type { UpdateStrategy } from '..';
import type { EmitStrategy } from '../emit-strategies/emit-strategy';
import type {
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

interface ControlOptions {
  capabilities?: Capabilities;
  optionAttributes?: string[];
  updater?: UpdateStrategy;
}

interface Options {
  multiple: boolean;
}

export type Item = HTMLElement;
export type List = Item[];
export type Tree = TreeItem[];
export type TreeItem = {
  item: Item;
  children: TreeItem[];
};

export abstract class Control {
  items: Item[] = [];

  abstract get selection(): Item[];
  abstract get activeItem(): Item | undefined;
  abstract get prevActiveItem(): Item | undefined;

  element: HTMLElement;
  emitter?: EmitStrategy;
  updater: UpdateStrategy;

  /**
   * Capabilities define, which _behaviors_ are applicable to the given control
   */
  #capabilities: Capabilities = {
    singleSelection: false,
    multiSelection: false
  };

  get capabilities() {
    return this.#capabilities;
  }

  #optionAttributes: string[] = [];

  get optionAttributes() {
    return this.#optionAttributes;
  }

  /**
   * Options instruct, which behaviors are actually _active_
   */
  options: Options = {
    multiple: false
  };

  private navigationPatterns: NavigationPattern[] = [];

  constructor(element: HTMLElement, options: ControlOptions) {
    this.element = element;

    this.#capabilities = options.capabilities ?? this.#capabilities;
    this.#optionAttributes = options.optionAttributes ?? this.#optionAttributes;
    this.updater = options.updater ?? new DomObserverUpdateStrategy(this);

    if (options.updater) {
      options.updater.setControl(this);
    }

    this.readOptions();
  }

  setEmitStrategy(emitter: EmitStrategy) {
    this.emitter = emitter;
  }

  setUpdateStrategy(updater: UpdateStrategy) {
    if (this.updater) {
      this.updater.teardown?.();
    }

    this.updater = updater;
  }

  protected registerNavigationPatterns(patterns: NavigationPattern[]) {
    this.navigationPatterns = patterns;

    const eventNames = new Set(this.navigationPatterns.map((p) => p.eventListeners ?? []).flat());

    for (const eventName of eventNames) {
      this.element.addEventListener(eventName, this.handleEvent.bind(this));
    }
  }

  private handleEvent(event: Event) {
    const patterns = this.navigationPatterns.filter((p) => p.matches(event));

    patterns.forEach((p) => p.prepare?.(event));

    pipe({ event } as NavigationParameterBag, ...patterns.map((p) => p.handle.bind(p)));

    event.stopPropagation();
  }

  // read in from DOM

  readOptions() {
    this.options.multiple =
      (this.element?.hasAttribute('aria-multiselectable') &&
        this.element.getAttribute('aria-multiselectable') === 'true') ||
      false;
  }

  readItems() {
    this.items = [];
  }

  readSelection() {
    // no-op, please implement
  }
}
