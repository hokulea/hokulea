import { associateDestroyableChild } from '@ember/destroyable';
import { scheduleOnce } from '@ember/runloop';

import Modifier from 'ember-modifier';

import { FocusManagementOptions } from '@hokulea/controls/composites/features/focus-management-feature';
import { SelectionOptions } from '@hokulea/controls/composites/features/selection-feature';
import EmitStrategy from '@hokulea/controls/modifiers/-composite/emit-strategies/emit-strategy';
import IndexEmitStrategy from '@hokulea/controls/modifiers/-composite/emit-strategies/index-emit-strategy';
import ObjectEmitStrategy from '@hokulea/controls/modifiers/-composite/emit-strategies/object-emit-strategy';

import Composite, {
  CompositeElement,
  CompositeOptions,
  Emitter
} from '../composites/composite';
import CompositeFactory from '../composites/composite-factory';
import NoopEmitStrategy from './-composite/emit-strategies/noop-emit-strategy';
import DerievedUpdateStrategy from './-composite/update-strategies/derieved-update-strategy';
import DomObserverUpdateStrategy from './-composite/update-strategies/dom-observer-update-strategy';
import UpdateStrategy from './-composite/update-strategies/update-strategy';

export interface CompositeArgs<T = unknown>
  extends FocusManagementOptions,
    SelectionOptions {
  objects?: T[];
  focusObject?: T;
  focus?: (item?: number | T) => void;
  selection?: T[];
  select?: (selection: number[] | T[]) => void;
}

interface CompositeModifierArgs<T> {
  positional: [];
  named: CompositeArgs<T> & Record<string, unknown>;
}

interface Class<T> {
  new (...args: unknown[]): T;
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
  CompositeModifierArgs<T>
> {
  private composite?: Composite;

  private emitStrategy?: EmitStrategy;
  private updateStrategy?: UpdateStrategy<T>;
  private emitter: Emitter = {
    select(_selection: CompositeElement[]) {
      // eslint-disable-next-line unicorn/no-useless-undefined
      return undefined;
    },

    focus(_element: CompositeElement) {
      // eslint-disable-next-line unicorn/no-useless-undefined
      return undefined;
    }
  };

  // life-cycle hooks from `ember-modifier`

  didInstall(): void {
    this.setup();
  }

  didUpdateArguments(): void {
    this.update();
  }

  willDestroy(): void {
    this.teardown();
  }

  // what may be life-cycle hooks for modifiers, from `ember-could-get-used-to-this`

  setup(): void {
    if (this.element) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      this.emitter.select = (selection: CompositeElement[]) => {
        if (this.emitStrategy) {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          // eslint-disable-next-line ember/no-incorrect-calls-with-inline-anonymous-functions
          scheduleOnce('afterRender', () => {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            this.emitStrategy?.select?.(selection);
          });
        }
      };
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      this.emitter.focus = (item: CompositeElement) => {
        if (this.emitStrategy) {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          // eslint-disable-next-line ember/no-incorrect-calls-with-inline-anonymous-functions
          scheduleOnce('afterRender', () => {
            this.emitStrategy?.focus(item);
          });
        }
      };
      const options: Partial<CompositeOptions> = {};
      if (typeof this.args.named.persistFocus === 'boolean') {
        options.persistFocus = this.args.named.persistFocus;
      }
      if (typeof this.args.named.persistSelection === 'boolean') {
        options.persistSelection = this.args.named.persistSelection;
      }
      this.composite = CompositeFactory.createComposite(
        this.element as HTMLElement,
        this.emitter,
        options
      );
      if (this.composite) {
        this.emitStrategy = this.createOrUpdateEmitStrategy(this.composite);
        this.updateStrategy = this.createOrUpdateUpdateStrategy(this.composite);

        this.composite.read();
      }
    }
  }

  update(): void {
    if (this.composite) {
      this.emitStrategy = this.createOrUpdateEmitStrategy(this.composite);
      this.emitStrategy.updateArguments(this.args.named);

      this.updateStrategy = this.createOrUpdateUpdateStrategy(this.composite);
      this.updateStrategy.updateArguments(this.args.named);
    }
  }

  teardown(): void {
    if (this.composite) {
      this.composite.teardown();
    }
  }

  // factories

  private createOrUpdateUpdateStrategy(composite: Composite) {
    const args = this.args.named;

    const requiredArgsForDerieved = [args.objects, args.focusObject];
    if (composite.selection) {
      requiredArgsForDerieved.push(args.selection);
    }

    const useDerievedStrategy =
      requiredArgsForDerieved.filter(argument => argument !== undefined)
        .length > 0;

    if (useDerievedStrategy) {
      return this.createOrContainStrategy<UpdateStrategy<T>>(
        this.updateStrategy,
        DerievedUpdateStrategy,
        composite
      );
    }

    return this.createOrContainStrategy<UpdateStrategy<T>>(
      this.updateStrategy,
      DomObserverUpdateStrategy,
      composite
    );
  }

  private createOrUpdateEmitStrategy(composite: Composite) {
    const args = this.args.named;
    const selectable = Boolean(composite.selection);
    const useIndexStrategy =
      (selectable ? args.select !== undefined : true) &&
      args.focus !== undefined;
    const useItemStrategy = useIndexStrategy && args.objects !== undefined;

    if (useItemStrategy) {
      return this.createOrContainStrategy<EmitStrategy>(
        this.emitStrategy,
        ObjectEmitStrategy,
        args,
        composite
      );
    }

    if (useIndexStrategy) {
      return this.createOrContainStrategy<EmitStrategy>(
        this.emitStrategy,
        IndexEmitStrategy,
        args,
        composite
      );
    }

    return this.createOrContainStrategy<EmitStrategy>(
      this.emitStrategy,
      NoopEmitStrategy,
      this.args.named,
      composite
    );
  }

  private createOrContainStrategy<S>(
    actual: unknown,
    // eslint-disable-next-line @typescript-eslint/naming-convention
    Factory: Class<S>,
    ...args: unknown[]
  ): S {
    if (actual instanceof Factory) {
      return actual;
    }

    const strategy = new Factory(...args);
    // eslint-disable-next-line @typescript-eslint/ban-types
    associateDestroyableChild(this, strategy as Object);
    return strategy;
  }
}
