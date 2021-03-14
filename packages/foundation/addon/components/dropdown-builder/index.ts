import { getOwner } from '@ember/application';
import { assert } from '@ember/debug';
import { destroy, registerDestructor } from '@ember/destroyable';
import { action } from '@ember/object';
import { guidFor } from '@ember/object/internals';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

import Modifier, { modifier } from 'ember-modifier';

import PopupModifier from './popup-modifier';
import TriggerModifier from './trigger-modifier';

interface DropdownBuilderArgs {
  opened: () => void;
  closed: () => void;
}

export interface DropdownBuilderBlocks {
  default: [DropdownBuilderComponent];
}

/**
 * A modern dropdown builder component.
 *
 * It has the following feature set:
 *
 * - Let's you choose the trigger and popup
 * - Connects them two internally and markup-wise through `aria-*`
 * - Default trigger behavior to open the popup
 *   - Provide your own for detailed behavior
 * - Invokes passed-in action on open and close the popup
 * - Yield API to open/close commands
 *
 * What it does NOT:
 *
 * - Style elements (hidden/visible part of the, see tips below)
 * - Position the popup (this is your job, use `@open` and `@close`)
 *
 * PS. This component could be a helper... but the syntax as component looks
 * nicer than a helper with `{{#let (dropdown-builder) as |ddb|}}` :shrug:
 *
 * @example Basic Usage
 *
 * ```hbs
 * <DropdownBuilder as |ddb|>
 *   <button {{ddb.trigger}}>Toggle Fruits</button>
 *   <ul {{ddb.popup}}>
 *     <li>Apple</li>
 *     <li>Banana</li>
 *     <li>Orange</li>
 *   </ul>
 * </DropdownBuilder>
 * ```
 *
 * After rendering, the trigger and popup are connected through `aria-*`
 * attributes. Invoking the button will toggle `aria-expanded` on the button
 * (default behavior)
 *
 * @example Styling
 *
 * ```hbs
 * <DropdownBuilder as |ddb|>
 *   <button {{ddb.trigger}}>Toggle Fruits</button>
 *   <ul class="list" {{ddb.popup}}>
 *     <li>Apple</li>
 *     <li>Banana</li>
 *     <li>Orange</li>
 *   </ul>
 * </DropdownBuilder>
 * ```
 *
 * Use `aria-*` attributes for styling
 *
 * ```css
 *
 * .list {
 *   position: absolute;
 *
 *   // hidden
 *   opacity: 0;
 *   visibility: hidden;
 *   pointer-events: none;
 *
 *   // visible
 *   [aria-expanded="true"] + & {
 *     opacity: 1;
 *     visibility: visible;
 *     pointer-events: all;
 *   }
 * }
 * ```
 *
 * @example Positioning
 *
 * ```hbs
 * <DropdownBuilder @open={{this.positionPopup}} @close={{this.stopPositioningPopup}} as |ddb|>
 *   <button {{ddb.trigger}}>Toggle Fruits</button>
 *   <ul {{ddb.popup}} {{did-insert (set this 'popup')}}>
 *     <li>Apple</li>
 *     <li>Banana</li>
 *     <li>Orange</li>
 *   </ul>
 * </DropdownBuilder>
 * ```
 *
 * Pass in `@open` and `@close` action to be invoked then popup is being opened
 * and closed. Implement position algorithm on your own or pass it to some
 * third-party library/component/helper - however you delight.
 *
 * ```ts
 * export default class BackingComponent extends Component {
 *   popup: Element;
 *
 *   @action
 *   positionPopup() {
 *     window.addEventListener('resize', this.superHeftigPositionAlgorithm);
 *   }
 *
 *   @action
 *   superHeftigPositionAlgorithm() {
 *     // do sth with `this.element` ...
 *   }
 *
 *   @action
 *   stopPositioningPopup() {
 *     window.removeEventListener('resize', this.superHeftigPositionAlgorithm);
 *   }
 * }
 * ```
 *
 * @example Custom Trigger Behavior
 *
 * By default, dropdown builder will toggle the popup when the trigger element
 * is invoked. This is fine for basic behavior, your context might require a
 * more complex/conditioned behavior. In this case pass in your own listener for
 * the trigger:
 *
 * ```hbs
 * <DropdownBuilder as |ddb|>
 *   <button {{ddb.trigger installListener=this.installTriggerListener}}>Toggle Fruits</button>
 *   <ul {{ddb.popup}}>
 *     <li>Apple</li>
 *     <li>Banana</li>
 *     <li>Orange</li>
 *   </ul>
 * </DropdownBuilder>
 * ```
 *
 * ```ts
 * export default class BackingComponent extends Component {
 *   @action
 *   installTriggerListener(element: Element, ddb: DropdownBuilderComponent) {
 *     // for demo purposes, re-implement default behavior
 *     element.addEventListener('click', () =>  {
 *       ddb.toggle();
 *     });
 *   }
 * }
 * ```
 */
export default class DropdownBuilderComponent extends Component<
  DropdownBuilderArgs
> {
  id = guidFor(this);
  @tracked expanded = false;

  private triggerPart?: TriggerModifier;
  private popupPart?: PopupModifier;

  private curryModifier(
    // eslint-disable-next-line @typescript-eslint/naming-convention
    Factory: typeof Modifier,
    nameCurry: Record<string, unknown>
  ) {
    return modifier(
      (element, positional: unknown[], named: Record<string, unknown>) => {
        const instance = new Factory(getOwner(this), {
          positional,
          named: {
            ddb: this,
            ...nameCurry,
            ...named
          }
        });

        instance.element = element;
        instance.didInstall();

        registerDestructor(instance, (mod: Modifier) => {
          mod.willDestroy();
        });

        return () => {
          destroy(instance);
        };
      }
    );
  }

  get popup() {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return this.curryModifier(PopupModifier, {
      register: this.registerPopup
    });
  }

  get trigger() {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return this.curryModifier(TriggerModifier, {
      register: this.registerTrigger
    });
  }

  @action
  private registerTrigger(trigger: TriggerModifier) {
    this.triggerPart = trigger;
    this.registerCloseListener();
    this.setAriaPopupOnTrigger();
  }

  @action
  private registerPopup(popup: PopupModifier) {
    this.popupPart = popup;
    this.registerCloseListener();
    this.setAriaPopupOnTrigger();
  }

  private registerCloseListener() {
    if (this.triggerPart && this.popupPart) {
      document.body.addEventListener('click', (event: MouseEvent) => {
        const path = event.composedPath();

        if (
          path.includes((this.popupPart as PopupModifier).element) ||
          path.includes((this.triggerPart as TriggerModifier).element)
        ) {
          return;
        }

        this.close();
      });
    }
  }

  private setAriaPopupOnTrigger() {
    if (this.triggerPart && this.popupPart) {
      assert(
        'Please set `role` on popup for dropdown',
        this.popupPart.element.hasAttribute('role')
      );

      this.triggerPart.element.setAttribute(
        'aria-haspopup',
        this.popupPart.element.getAttribute('role') as string
      );
    }
  }

  @action
  isExpanded() {
    return this.expanded;
  }

  @action
  toggle() {
    this.updateExpanded(!this.expanded);
  }

  @action
  open() {
    this.updateExpanded(true);
  }

  @action
  close() {
    this.updateExpanded(false);
  }

  private updateExpanded(expanded: boolean) {
    this.expanded = expanded;

    this.triggerPart?.updateExpanded(expanded);
    // this.popupPart?.updateExpanded(expanded);

    if (expanded) {
      this.args.opened?.();
    } else {
      this.args.closed?.();
    }
  }
}
