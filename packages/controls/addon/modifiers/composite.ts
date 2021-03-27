import { associateDestroyableChild } from '@ember/destroyable';
import { scheduleOnce } from '@ember/runloop';

import Modifier from 'ember-modifier';

import EmitStrategy from '@hokulea/controls/modifiers/-composite/emit-strategies/emit-strategy';
import SelectEmitStrategy from '@hokulea/controls/modifiers/-composite/emit-strategies/select-emit-strategy';
import SelectIndexEmitStrategy from '@hokulea/controls/modifiers/-composite/emit-strategies/select-index-emit-strategy';
import SelectObjectEmitStrategy from '@hokulea/controls/modifiers/-composite/emit-strategies/select-object-emit-strategy';

import Composite, {
  CompositeOptions,
  CompositeElement
} from '../composites/composite';
import CompositeFactory from '../composites/composite-factory';
import SelectableComposite, {
  SelectEmitter,
  SelectableCompositeOptions
} from '../composites/selectable-composite';
import IndexEmitStrategy from './-composite/emit-strategies/index-emit-strategy';
import NoopEmitStrategy from './-composite/emit-strategies/noop-emit-strategy';
import ObjectEmitStrategy from './-composite/emit-strategies/object-emit-strategy';
import DerievedUpdateStrategy from './-composite/update-strategies/derieved-update-strategy';
import DomObserverUpdateStrategy from './-composite/update-strategies/dom-observer-update-strategy';
import UpdateStrategy from './-composite/update-strategies/update-strategy';

export interface CompositeArgs<T = unknown> extends CompositeOptions {
  objects?: T[];
  focusObject?: T;
  moveFocus?: (item?: number | T) => void;
}

export interface SelectCompositeArgs<T = unknown>
  extends CompositeArgs<T>,
    SelectableCompositeOptions {
  selection?: T[];
  select?: (selection: number[] | T[]) => void;
}

interface CompositeModifierArgs<T> {
  positional: [];
  named: SelectCompositeArgs<T> & Record<string, unknown>;
}

interface Class<T> {
  new (...args: unknown[]): T;
}

type EmitterStrategy = EmitStrategy | SelectEmitStrategy;

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

  private emitStrategy?: EmitterStrategy;
  private updateStrategy?: UpdateStrategy<T>;
  private emitter: SelectEmitter = {
    select(_selection: CompositeElement[]) {
      // eslint-disable-next-line unicorn/no-useless-undefined
      return undefined;
    },

    focus(_element: CompositeElement) {
      console.log('proxy emitter, focus');

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

  update() {
    if (this.composite) {
      this.emitStrategy = this.createOrUpdateEmitStrategy(this.composite);
      this.emitStrategy.updateArguments(this.args.named);

      this.updateStrategy = this.createOrUpdateUpdateStrategy(this.composite);
      this.updateStrategy.updateArguments(this.args.named);
    }
  }

  teardown() {
    if (this.composite) {
      this.composite.teardown();
    }
  }

  // factories

  private createOrUpdateUpdateStrategy(composite: Composite) {
    const args = this.args.named;

    const requiredArgsForDerieved = [args.objects, args.focusObject];
    if (composite instanceof SelectableComposite) {
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
    const selectable = composite instanceof SelectableComposite;
    const canUseIndexStrategy =
      (selectable ? args.select !== undefined : true) &&
      args.moveFocus !== undefined;
    const canUseItemStrategy =
      canUseIndexStrategy && args.objects !== undefined;

    if (canUseItemStrategy) {
      return this.createOrContainStrategy<EmitterStrategy>(
        this.updateStrategy,
        selectable ? SelectObjectEmitStrategy : ObjectEmitStrategy,
        this.args.named,
        composite
      );
    }

    if (canUseIndexStrategy) {
      return this.createOrContainStrategy<EmitterStrategy>(
        this.updateStrategy,
        selectable ? SelectIndexEmitStrategy : IndexEmitStrategy,
        this.args.named,
        composite
      );
    }

    return this.createOrContainStrategy<EmitterStrategy>(
      this.updateStrategy,
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
