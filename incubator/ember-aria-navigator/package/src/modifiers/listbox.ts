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

function asArray(val: unknown | unknown[] | undefined) {
  if (val === undefined) {
    return [];
  }

  return Array.isArray(val) ? val : [val];
}

function createItemEmitter<T>(listbox: Listbox, options: NamedArgs<ListboxSignature<T>>) {
  return new ItemEmitStrategy(listbox, {
    select: (selection: HTMLElement[]) => {
      (options as NamedArgs<ListboxSignature<undefined>>).select?.(
        options.multi ? selection : selection[0]
      );
    },

    activateItem: (item: HTMLElement) => {
      (options as NamedArgs<ListboxSignature<undefined>>).activateItem?.(item);
    }
  });
}

function createIndexEmitter<T>(listbox: Listbox, options: NamedArgs<ListboxSignature<T>>) {
  const findByIndex = (index: number) => {
    return options.items?.[index] ?? undefined;
  };

  return new IndexEmitStrategy(listbox, {
    select: (selection: number[]) => {
      if (options.multi) {
        const items = selection
          .map((index) => findByIndex(index))
          .filter((i) => i !== undefined) as T[];

        (options.select as (selection: T[]) => void | undefined)?.(items);
      } else {
        const item = findByIndex(selection[0]);

        if (item) {
          (options.select as (selection: T) => void | undefined)?.(item);
        }
      }
    },

    activateItem: (index: number) => {
      const item = findByIndex(index);

      if (item) {
        (options.activateItem as (item: T) => void | undefined)?.(item);
      }
    }
  });
}

interface ListboxSignature<T> {
  Args: {
    Positional: [];
    Named: {
      items: T[];
      selection?: T | T[];
      multi?: boolean;
      disabled?: boolean;
      select?: (selection: T | T[] | HTMLElement | HTMLElement[]) => void;
      activateItem?: (item: T | HTMLElement) => void;
    };
  };
}

/**
 * Modifier to add controls to an aria widget
 *
 * @remark
 *
 * ## Usage
 *
 * Prepare your markup with the required accessibility attributes and use the
 * modifier to enable keyboard navigation, selection and active/current item
 * management.
 *
 * - Pass in actions that will be invoked once an event happened.
 * - Pass in data to fully manage the modifier from the outside
 *
 * ### Persisting aria to the DOM
 *
 * By nature the modifier will do that for you and change `aria-*` attributes
 * accordingly. However, if you wish to take over this process for yourself,
 * then the actions you pass in to be notified on happened events (`select` and
 * `activateItem`) can return `true` to indicate you will take over state
 * management in DOM yourself.
 *
 * ### Caveat
 *
 * Although a `<ul>` with `<li>` is a proper accessible markup, the modifier
 * has no built-in semantic evaluation as of yet. Even with the markup described
 * here, you need to add `role="listbox"` and `role="option"` as this is what
 * the modifier is selecting for.
 *
 * @example
 *
 * Plain Example
 *
 * The modifier will manage everything on its own:
 *
 * ```hbs
 * <ul
 *   role="listbox"
 *   {{control}}
 * >
 *   <li role="option">Banana</li>
 *   <li role="option">Apple</li>
 *   <li role="option">Citrus</li>
 * </ul>
 * ```
 *
 * @example
 *
 * Pass in actions to handle updates
 *
 * The modifier will manage everything plus will invoke your passed in actions
 * for you to handle updates
 *
 * ```hbs
 * <ul
 *   role="listbox"
 *   {{control
 *     select=this.select
 *     activateItem=this.activateItem
 *   }}
 * >
 *   <li role="option">Banana</li>
 *   <li role="option">Apple</li>
 *   <li role="option">Citrus</li>
 * </ul>
 * ```
 *
 * @example
 *
 * Pass in actions to handle updates with items and selection
 *
 * The modifier will manage everything plus will invoke your passed in actions
 * for you to handle updates. Also it will receive updates through ember's
 * reactivitiy system
 *
 * ```hbs
 * <ul
 *   role="listbox"
 *   {{control
 *     items=this.items
 *     selection=this.selection
 *     select=this.select
 *     activateItem=this.activateItem
 *   }}
 * >
 *  {{#each this.items as |item|}}
 *    <li role="option">{{item}}</li>
 *  {{/each}}
 * </ul>
 * ```
 *
 * @example
 *
 * Pass in actions to handle updates with items and selection
 * with multiselect
 *
 * The modifier will manage everything plus will invoke your passed in actions
 * for you to handle updates. Also it will receive updates through ember's
 * reactivitiy system
 *
 * ```hbs
 * <ul
 *   role="listbox"
 *   aria-multiselectable="true"
 *   {{control
 *     items=this.items
 *     selection=this.selection
 *     select=this.select
 *     activateItem=this.activateItem
 *   }}
 * >
 *  {{#each this.items as |item|}}
 *    <li role="option">{{item}}</li>
 *  {{/each}}
 * </ul>
 * ```
 */
export default class ListboxModifier<T> extends Modifier<ListboxSignature<T>> {
  private declare listbox: Listbox;
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

    if (options.items && !isEqual(this.prevItems, options.items)) {
      this.updater.updateItems();
      this.prevItems = [...options.items];
    }

    if (options.selection && !isEqual(asArray(this.prevSelection), asArray(options.selection))) {
      this.updater.updateSelection();
      this.prevSelection = [...asArray(options.selection)];
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
