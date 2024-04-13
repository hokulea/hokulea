import {
  IndexEmitStrategy,
  ItemEmitStrategy,
  Listbox,
  ReactiveUpdateStrategy
} from 'aria-navigator';
import Modifier from 'ember-modifier';
import isEqual from 'lodash.isequal';

import type { EmitStrategy } from 'aria-navigator';
import type { NamedArgs, PositionalArgs } from 'ember-modifier';

function asArray(val?: unknown) {
  if (val === undefined) {
    return [];
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return Array.isArray(val) ? val : [val];
}

function createItemEmitter<T>(listbox: Listbox, options: NamedArgs<ListboxSignature<T>>) {
  return new ItemEmitStrategy(listbox, {
    select: (selection: HTMLElement[]) => {
      (options.select as ((selection: HTMLElement | HTMLElement[]) => void) | undefined)?.(
        options.multi ? selection : (selection[0] as HTMLElement)
      );
    },

    activateItem: (item: HTMLElement) => {
      (options.activateItem as ((item: HTMLElement) => void) | undefined)?.(item);
    }
  });
}

function createIndexEmitter<T>(listbox: Listbox, options: NamedArgs<ListboxSignature<T>>) {
  const findByIndex = (index: number) => {
    return (options as WithItems<T>).items[index] ?? undefined;
  };

  return new IndexEmitStrategy(listbox, {
    select: (selection: number[]) => {
      if (options.multi) {
        const items = selection
          .map((index) => findByIndex(index))
          .filter((i) => i !== undefined) as T[];

        (options.select as ((selection: T[]) => void) | undefined)?.(items);
      } else {
        const item = findByIndex(selection[0] as number);

        if (item) {
          (options.select as ((selection: T) => void) | undefined)?.(item);
        }
      }
    },

    activateItem: (index: number) => {
      const item = findByIndex(index);

      if (item) {
        (options.activateItem as ((item: T) => void) | undefined)?.(item);
      }
    }
  });
}

type WithItems<T> = {
  items: T[];
  selection?: T | T[];
  activateItem?: (item: T) => void;
} & (
  | {
      multi: true;
      select?: (selection: T[]) => void;
    }
  | {
      multi?: false;
      select?: (selection: T) => void;
    }
);

type OptionalItems = {
  items?: HTMLElement[];
  selection?: HTMLElement | HTMLElement[];
  activateItem?: (item: HTMLElement) => void;
} & (
  | {
      multi: true;
      select?: (selection: HTMLElement[]) => void;
    }
  | {
      multi?: false;
      select?: (selection: HTMLElement) => void;
    }
);

interface ListboxSignature<T> {
  Args: {
    Positional: [];
    Named: { disabled?: boolean } & (WithItems<T> | OptionalItems);
  };
}

export default class ListboxModifier<T> extends Modifier<ListboxSignature<T>> {
  private listbox?: Listbox;
  private declare updater: ReactiveUpdateStrategy;
  private declare emitter: EmitStrategy;

  private prevItems?: T[];
  private prevSelection?: T | T[];
  private prevMulti?: boolean;
  private prevDisabled?: boolean;

  modify(
    element: Element,
    _: PositionalArgs<ListboxSignature<T>>,
    options: NamedArgs<ListboxSignature<T>>
  ) {
    if (!this.listbox) {
      this.updater = new ReactiveUpdateStrategy();

      this.listbox = new Listbox(element as HTMLElement, {
        updater: this.updater
      });
    }

    if (options.items && !(this.emitter instanceof IndexEmitStrategy)) {
      this.emitter = createIndexEmitter<T>(this.listbox, options);
    } else if (!options.items && !(this.emitter instanceof ItemEmitStrategy)) {
      this.emitter = createItemEmitter<T>(this.listbox, options);
    }

    if (options.items && !isEqual(this.prevItems, (options as WithItems<T>).items)) {
      this.updater.updateItems();
      this.prevItems = [...(options as WithItems<T>).items];
    }

    if (options.selection && !isEqual(asArray(this.prevSelection), asArray(options.selection))) {
      this.updater.updateSelection();
      this.prevSelection = asArray(options.selection);
    }

    let optionsChanged = false;

    if (this.prevMulti !== options.multi) {
      if (options.multi) {
        element.setAttribute('aria-multiselectable', 'true');
      } else {
        element.removeAttribute('aria-multiselectable');
      }

      optionsChanged = true;

      this.prevMulti = options.multi;
    }

    if (this.prevDisabled !== options.disabled) {
      if (options.disabled) {
        element.setAttribute('aria-disabled', 'true');
      } else {
        element.removeAttribute('aria-disabled');
      }

      optionsChanged = true;

      this.prevDisabled = options.disabled;
    }

    if (optionsChanged) {
      this.updater.updateOptions();
    }
  }
}
