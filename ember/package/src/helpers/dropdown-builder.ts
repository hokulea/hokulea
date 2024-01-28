import { tracked } from '@glimmer/tracking';
import Helper from '@ember/component/helper';
import { assert } from '@ember/debug';
import { registerDestructor } from '@ember/destroyable';
import { action } from '@ember/object';
import { guidFor } from '@ember/object/internals';

import { modifier } from 'ember-modifier';

import type { FunctionBasedModifier } from 'ember-modifier';

interface TriggerOptions {
  installListener?: (element: Element, ddb: DropdownBuilder) => void;
}

interface TriggerSignature {
  Element: Element;
  Args: {
    Positional: unknown[];
    Named: TriggerOptions;
  };
}

class Trigger {
  ddb: DropdownBuilder;
  element: HTMLElement;

  private handler?: () => void;

  constructor(dropdown: DropdownBuilder, element: HTMLElement, options: TriggerOptions) {
    this.ddb = dropdown;
    this.element = element;

    this.install(options);
  }

  uninstall() {
    if (this.handler) {
      this.element.removeEventListener('click', this.handler);
    }
  }

  private install(options: TriggerOptions) {
    this.ddb.registerTrigger(this);

    if (this.element) {
      const { element, ddb } = this;

      if (options.installListener) {
        options.installListener(element, ddb);
      } else {
        this.installDefaultListener();
      }

      element.setAttribute('aria-owns', ddb.id);
      element.setAttribute('aria-controls', ddb.id);
      element.setAttribute('aria-expanded', 'false');
    }
  }

  private installDefaultListener() {
    this.handler = () => {
      this.ddb.toggle();
    };

    this.element.addEventListener('click', this.handler);
  }

  updateExpanded(expanded: boolean) {
    if (this.element) {
      this.element.setAttribute('aria-expanded', `${expanded}`);
    }
  }
}

//

class Popup {
  ddb: DropdownBuilder;
  element: HTMLElement;

  constructor(dropdown: DropdownBuilder, element: HTMLElement) {
    this.ddb = dropdown;
    this.element = element;

    this.install();
  }

  private install() {
    this.element.id = this.ddb.id;
  }
}

type EmptySignature = { Element: Element; Args: { Named: {}; Positional: [] } };

interface DropdownBuilderArgs {
  opened: () => void;
  closed: () => void;
}

interface DropdownBuilderSignature {
  Args: {
    Named: DropdownBuilderArgs;
  };
  Return: {
    trigger: FunctionBasedModifier<TriggerSignature>;
    popup: FunctionBasedModifier<EmptySignature>;
    open: () => void;
    close: () => void;
    toggle: () => void;
  };
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
 * {{#let (dropdownBuilder) as |ddb|}}
 *   <button {{ddb.trigger}}>Toggle Fruits</button>
 *   <ul {{ddb.popup}}>
 *     <li>Apple</li>
 *     <li>Banana</li>
 *     <li>Orange</li>
 *   </ul>
 * {{/let}}
 * ```
 *
 * After rendering, the trigger and popup are connected through `aria-*`
 * attributes. Invoking the button will toggle `aria-expanded` on the button
 * (default behavior)
 *
 * @example Styling
 *
 * ```hbs
 * {{#let (dropdownBuilder) as |ddb|}}
 *   <button {{ddb.trigger}}>Toggle Fruits</button>
 *   <ul class="list" {{ddb.popup}}>
 *     <li>Apple</li>
 *     <li>Banana</li>
 *     <li>Orange</li>
 *   </ul>
 * {{/let}}
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
 * {{#let (dropdownBuilder opened=this.positionPopup closed=this.stopPositioningPopup) as |ddb|}}
 *   <button {{ddb.trigger}}>Toggle Fruits</button>
 *   <ul {{ddb.popup}} {{did-insert (set this 'popup')}}>
 *     <li>Apple</li>
 *     <li>Banana</li>
 *     <li>Orange</li>
 *   </ul>
 * {{/let}}
 * ```
 *
 * Used `opened` and `closed` for actions to be invoked then popup is being opened
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
 * {{#let (dropdownBuilder) as |ddb|}}
 *   <button {{ddb.trigger installListener=this.installTriggerListener}}>Toggle Fruits</button>
 *   <ul {{ddb.popup}}>
 *     <li>Apple</li>
 *     <li>Banana</li>
 *     <li>Orange</li>
 *   </ul>
 * {{/let}}
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
 *
 * @example Imperative Toggle API
 *
 * You can call `open()` and `close()` imperatively... well, kinda... hmm somewhat
 * partially.
 *
 * ```hbs
 * {{#let (dropdownBuilder) as |ddb|}}
 *   <button {{ddb.trigger>Toggle Fruits</button>
 *   <ul {{ddb.popup}} {{on "mouseup" (fn this.close ddb.close)}}>
 *     <li>Apple</li>
 *     <li>Banana</li>
 *     <li>Orange</li>
 *   </ul>
 * {{/let}}
 * ```
 *
 * Pass the `ddb.close` method on to a listener of yours:
 *
 * ```ts
 * export default class BackingComponent extends Component {
 *   @action
 *   close(close: () => void, event: MouseEvent) {
 *     if (this.someImportantConditionIsTrue) {
 *       close();
 *     } else {
 *       event.stopPropagation();
 *     }
 *   }
 * }
 * ```
 */
export default class DropdownBuilder extends Helper<DropdownBuilderSignature> {
  id = guidFor(this);

  private triggerModifier: FunctionBasedModifier<TriggerSignature>;
  private popupModifier: FunctionBasedModifier<EmptySignature>;

  private triggerPart?: Trigger;
  private popupPart?: Popup;

  /** Whether the popup is expanded or not */
  @tracked expanded = false;

  private args?: DropdownBuilderArgs;

  constructor() {
    super();

    this.triggerModifier = modifier<TriggerSignature>((element, _positional, options) => {
      const trigger = new Trigger(this, element as HTMLElement, options);

      return () => {
        trigger.uninstall();
      };
    });

    this.popupModifier = modifier((element) => {
      new Popup(this, element as HTMLElement);
    });
  }

  compute(_positional: [], named: DropdownBuilderArgs) {
    this.args = named;

    return {
      trigger: this.triggerModifier,
      popup: this.popupModifier,
      open: this.open,
      close: this.close,
      toggle: this.toggle
    };
  }

  registerTrigger(trigger: Trigger) {
    this.triggerPart = trigger;
    this.registerCloseListener();
    this.setAriaPopupOnTrigger();
  }

  registerPopup(popup: Popup) {
    this.popupPart = popup;
    this.registerCloseListener();
    this.setAriaPopupOnTrigger();
  }

  private registerCloseListener() {
    if (this.triggerPart && this.popupPart) {
      const closePopup = (event: MouseEvent) => {
        const path = event.composedPath();

        if (
          path.includes((this.popupPart as Popup).element) ||
          path.includes((this.triggerPart as Trigger).element)
        ) {
          return;
        }

        this.close();
      };

      document.body.addEventListener('click', closePopup);

      registerDestructor(this, () => {
        document.body.removeEventListener('click', closePopup);
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

  /**
   * Toggles the popup
   */
  @action
  toggle(): void {
    this.updateExpanded(!this.expanded);
  }

  /**
   * Opens the popup
   */
  @action
  open(): void {
    this.updateExpanded(true);
  }

  /**
   * Closes the popup
   */
  @action
  close(): void {
    this.updateExpanded(false);
  }

  private updateExpanded(expanded: boolean) {
    this.expanded = expanded;

    this.triggerPart?.updateExpanded(expanded);
    // this.popupPart?.updateExpanded(expanded);

    if (expanded) {
      this.args?.opened?.();
    } else {
      this.args?.closed?.();
    }
  }
}
