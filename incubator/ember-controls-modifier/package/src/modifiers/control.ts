import { associateDestroyableChild, registerDestructor } from '@ember/destroyable';

import {
  ControlFactory,
  DerievedUpdateStrategy,
  DomObserverUpdateStrategy,
  IndexEmitStrategy,
  ItemEmitStrategy,
  NoopEmitStrategy
} from 'aria-navigator';
import Modifier from 'ember-modifier';

import type Owner from '@ember/owner';

import type { Control, EmitStrategy, PersistResult, UpdateStrategy } from 'aria-navigator';
import type { ArgsFor, NamedArgs, PositionalArgs } from 'ember-modifier';

export interface ControlArgs<T = unknown> {
  [key: string]: unknown;
  items?: T[];
  selection?: T[];
  activeItem: T;
  select?: (selection: number[] | T[]) => PersistResult;
  activateItem?: (item: number | T) => PersistResult;
}

interface ControlSignature<T> {
  Args: {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    Positional: [];
    // eslint-disable-next-line @typescript-eslint/naming-convention
    Named: ControlArgs<T>;
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
export default class ControlControlModifier<T> extends Modifier<ControlSignature<T>> {
  declare element: HTMLElement;
  private declare options: NamedArgs<ControlSignature<T>>;
  private control?: Control;

  private emitStrategy?: EmitStrategy;
  private updateStrategy?: UpdateStrategy<T>;

  constructor(owner: Owner, args: ArgsFor<ControlSignature<T>>) {
    super(owner, args);

    registerDestructor(this, this.teardown);
  }

  modify(
    element: Element,
    _: PositionalArgs<ControlSignature<T>>,
    options: NamedArgs<ControlSignature<T>>
  ) {
    this.element = element as HTMLElement;
    this.options = options;

    // update
    if (this.control) {
      this.emitStrategy = this.createOrUpdateEmitStrategy(this.control);
      this.updateStrategy = this.createOrUpdateUpdateStrategy(this.control);

      (this.updateStrategy as UpdateStrategy<T>).updateArguments(this.options);
    }

    // setup
    if (this.element) {
      if (!this.element.hasAttribute('tabindex')) {
        this.element.setAttribute('tabindex', '0');
      }

      this.control = ControlFactory.createControl(this.element);
      this.emitStrategy = this.createOrUpdateEmitStrategy(this.control);
      this.updateStrategy = this.createOrUpdateUpdateStrategy(this.control);

      this.control.read();
    }
  }

  teardown() {
    if (this.control) {
      this.control.teardown();
    }
  }

  // factories

  private createOrUpdateUpdateStrategy(widget: Control) {
    const args = this.options;
    const canUseDerievedStrategy =
      [args.items, args.selection, args.activeItem].filter((argument) => argument !== undefined)
        .length > 0;

    if (canUseDerievedStrategy) {
      if (this.updateStrategy instanceof DerievedUpdateStrategy) {
        return this.updateStrategy;
      }

      const strategy = new DerievedUpdateStrategy(widget);

      associateDestroyableChild(this, strategy);

      return strategy;
    }

    if (this.updateStrategy instanceof DomObserverUpdateStrategy) {
      return this.updateStrategy;
    }

    const strategy = new DomObserverUpdateStrategy(widget);

    associateDestroyableChild(this, strategy);

    return strategy;
  }

  private createOrUpdateEmitStrategy(control: Control) {
    const args = this.options;
    const canUseIndexStrategy = args.select !== undefined && args.activateItem !== undefined;

    const canUseItemStrategy = canUseIndexStrategy && args.items !== undefined;

    if (canUseItemStrategy) {
      if (this.emitStrategy instanceof ItemEmitStrategy) {
        this.emitStrategy.updateArguments(this.options as ControlArgs<unknown>);

        return this.emitStrategy;
      }

      const strategy = new ItemEmitStrategy(this.options as ControlArgs<unknown>, control);

      associateDestroyableChild(this, strategy);

      return strategy;
    }

    if (canUseIndexStrategy) {
      if (this.emitStrategy instanceof IndexEmitStrategy) {
        this.emitStrategy.updateArguments(this.options as ControlArgs<unknown>);

        return this.emitStrategy;
      }

      const strategy = new IndexEmitStrategy(this.options as ControlArgs<unknown>, control);

      associateDestroyableChild(this, strategy);

      return strategy;
    }

    if (this.emitStrategy instanceof NoopEmitStrategy) {
      return this.emitStrategy;
    }

    const strategy = new NoopEmitStrategy(args as ControlArgs<unknown>, control);

    associateDestroyableChild(this, strategy);

    return strategy;
  }
}
