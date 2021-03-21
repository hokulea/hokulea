import { associateDestroyableChild } from '@ember/destroyable';
import { scheduleOnce } from '@ember/runloop';

import Modifier from 'ember-modifier';

import Control, { ControlOptions, Item } from '../controls/control';
import ControlFactory from '../controls/control-factory';
import EmitStrategy from './control/emit-strategies/emit-strategy';
import IndexEmitStrategy from './control/emit-strategies/index-emit-strategy';
import ItemEmitStrategy from './control/emit-strategies/item-emit-strategy';
import NoopEmitStrategy from './control/emit-strategies/noop-emit-strategy';
import DerievedUpdateStrategy from './control/update-strategies/derieved-update-strategy';
import DomObserverUpdateStrategy from './control/update-strategies/dom-observer-update-strategy';
import UpdateStrategy from './control/update-strategies/update-strategy';

export interface ControlArgs<T = unknown> {
  items?: T[];
  selection?: T[];
  activeItem?: T;
  select?: (selection: number[] | T[]) => void;
  activateItem?: (item: number | T) => void;
  /**
   * Tells the modifier to persist the active item. Set it to falls to control
   * this for yourself.
   *
   * @defaultValue true
   */
  persistActiveItem?: boolean;
  /**
   * Tells the modifier to persist the selection. Set it to falls to control
   * this for yourself.
   *
   * @defaultValue true
   */
  persistSelection?: boolean;
}

interface AllControlArgs<T> {
  positional: [];
  named: ControlArgs<T> & Record<string, unknown>;
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
export default class ControlControlModifier<T> extends Modifier<
  AllControlArgs<T>
> {
  private control?: Control;

  private emitStrategy?: EmitStrategy;
  private updateStrategy?: UpdateStrategy<T>;
  private emitter: EmitStrategy = {
    select(_selection: Item[]) {
      // eslint-disable-next-line unicorn/no-useless-undefined
      return undefined;
    },

    activateItem(_item: Item) {
      // eslint-disable-next-line unicorn/no-useless-undefined
      return undefined;
    }
  };

  // life-cycle hooks from `ember-modifier`

  didInstall() {
    this.setup();
  }

  didUpdateArguments() {
    this.update();
  }

  willDestroy() {
    this.teardown();
  }

  // what may be life-cycle hooks for modifiers, from `ember-could-get-used-to-this`

  setup() {
    if (this.element) {
      this.emitter.select = (selection: Item[]) => {
        if (this.emitStrategy) {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          // eslint-disable-next-line ember/no-incorrect-calls-with-inline-anonymous-functions
          scheduleOnce('afterRender', () => {
            this.emitStrategy?.select(selection);
          });
        }
      };
      this.emitter.activateItem = (item: Item) => {
        if (this.emitStrategy) {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          // eslint-disable-next-line ember/no-incorrect-calls-with-inline-anonymous-functions
          scheduleOnce('afterRender', () => {
            this.emitStrategy?.activateItem(item);
          });
        }
      };
      const options: Partial<ControlOptions> = {};
      if (typeof this.args.named.persistActiveItem === 'boolean') {
        options.persistActiveItem = this.args.named.persistActiveItem;
      }
      if (typeof this.args.named.persistSelection === 'boolean') {
        options.persistSelection = this.args.named.persistSelection;
      }
      this.control = ControlFactory.createControl(
        this.element as HTMLElement,
        this.emitter,
        options
      );
      this.emitStrategy = this.createOrUpdateEmitStrategy(this.control);
      this.updateStrategy = this.createOrUpdateUpdateStrategy(this.control);

      this.control.read();
    }
  }

  update() {
    if (this.control) {
      this.emitStrategy = this.createOrUpdateEmitStrategy(this.control);
      this.updateStrategy = this.createOrUpdateUpdateStrategy(this.control);

      this.updateStrategy.updateArguments(this.args.named);
    }
  }

  teardown() {
    if (this.control) {
      this.control.teardown();
    }
  }

  // factories

  private createOrUpdateUpdateStrategy(widget: Control) {
    const args = this.args.named;
    const canUseDerievedStrategy =
      [args.items, args.selection, args.activeItem].filter(
        argument => argument !== undefined
      ).length > 0;

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
    const args = this.args.named;
    const canUseIndexStrategy =
      args.select !== undefined && args.activateItem !== undefined;
    const canUseItemStrategy = canUseIndexStrategy && args.items !== undefined;

    if (canUseItemStrategy) {
      if (this.emitStrategy instanceof ItemEmitStrategy) {
        this.emitStrategy.updateArguments(this.args.named);
        return this.emitStrategy;
      }

      const strategy = new ItemEmitStrategy(this.args.named, control);
      associateDestroyableChild(this, strategy);
      return strategy;
    }

    if (canUseIndexStrategy) {
      if (this.emitStrategy instanceof IndexEmitStrategy) {
        this.emitStrategy.updateArguments(this.args.named);
        return this.emitStrategy;
      }

      const strategy = new IndexEmitStrategy(this.args.named, control);
      associateDestroyableChild(this, strategy);
      return strategy;
    }

    if (this.emitStrategy instanceof NoopEmitStrategy) {
      return this.emitStrategy;
    }

    const strategy = new NoopEmitStrategy();
    associateDestroyableChild(this, strategy);
    return strategy;
  }
}
