import { isItemOf } from '../controls/control';

import type { Control } from '..';
import type { Item } from '../controls/control';
import type { FocusStrategy } from './focus-strategy';
import type { EventNames, NavigationParameterBag, NavigationPattern } from './navigation-pattern';

const OPENER = Symbol('Opener');
const FOCUS_ON_OPEN = Symbol('FocusOnOpen');
const FOCUS_TRIGGER_ON_CLOSE = Symbol('FocusTriggerOnClose');

type MenuElement = HTMLElement & {
  [OPENER]?: HTMLElement;
  [FOCUS_ON_OPEN]?: boolean;
  [FOCUS_TRIGGER_ON_CLOSE]?: boolean;
};

function isToggleEvent(event: Event): event is ToggleEvent {
  return event.type === 'toggle';
}

function getMenuFromItem(item: Item): MenuElement | null {
  return document.getElementById(
    item.getAttribute('popovertarget') as string
  ) as MenuElement | null;
}

export class MenuNavigation implements NavigationPattern {
  eventListeners: EventNames[] = ['keydown', 'toggle', 'pointerover', 'pointerout'];

  constructor(
    private control: Control,
    private focusStrategy: FocusStrategy
  ) {}

  matches(event: Event): boolean {
    return (
      (event instanceof KeyboardEvent &&
        (event.code === ' ' ||
          event.code === 'Enter' ||
          event.code === 'ArrowRight' ||
          event.code === 'ArrowLeft')) ||
      event.type === 'toggle' ||
      event.type === 'pointerover' ||
      event.type === 'pointerout'
    );
  }

  handle(bag: NavigationParameterBag): NavigationParameterBag {
    const { event } = bag;

    // navigation handlers
    if (event.type === 'keydown') {
      this.navigateWithKeyboard(event as KeyboardEvent);
    } else if (event instanceof PointerEvent) {
      this.navigateWithPointer(event);
    }

    // submenu behavior
    else if (isToggleEvent(event)) {
      if (event.newState === 'open') {
        this.show();
      } else {
        this.hide();
      }
    }

    return bag;
  }

  navigateWithKeyboard(event: KeyboardEvent) {
    if (
      event.code === 'ArrowRight' /* || event.code === 'Enter'*/ &&
      this.control.activeItem?.hasAttribute('popovertarget')
    ) {
      this.showSubmenu(true);
    }

    if (event.code === 'ArrowLeft') {
      this.hideSubmenu();
    }
  }

  navigateWithPointer(event: PointerEvent) {
    // hover ...
    if (event.type === 'pointerover') {
      // close sibling menus
      this.control.items
        .filter((item) => item !== this.control.activeItem)
        .filter((item) => item.hasAttribute('popovertarget'))
        .forEach((item) => {
          const menu = getMenuFromItem(item);

          if (menu) {
            menu[FOCUS_TRIGGER_ON_CLOSE] = false;
            menu.hidePopover();
          }
        });
      // for (const item of this.control.items) {
      //   if (item !== )
      // }

      if (this.control.activeItem?.hasAttribute('popovertarget')) {
        this.showSubmenu();
      }
    }

    // ... and out
    else if (event.type === 'pointerout') {
      const target = event.target as HTMLElement;

      // moving pointer from menu to trigger
      if (
        target === this.control.element &&
        event.relatedTarget === (this.control.element as MenuElement)[OPENER]
      ) {
        (event.relatedTarget as HTMLElement).focus();
      }

      // // target is menu
      // if (
      //   target === this.control.element &&
      //   !this.control.element.contains(event.relatedTarget as Node) &&
      //   // @ts-expect-error yep, we add out own secret type
      //   event.relatedTarget !== this.control.element[OPENER]
      // ) {
      //   this.hideSubmenu();
      // }

      // moving pointer away from trigger
      // if (isItemOf(target, this.control) && target.hasAttribute('popovertarget')) {
      //   const menu = getMenuFromItem(target);

      //   if (menu && event.relatedTarget !== menu) {
      //     menu[FOCUS_TRIGGER_ON_CLOSE] = false;
      //     menu.hidePopover();
      //   }
      // }
    }
  }

  showSubmenu(moveFocus = false) {
    if (this.control.activeItem) {
      const menu = getMenuFromItem(this.control.activeItem);

      if (menu) {
        menu[OPENER] = this.control.activeItem;
        menu[FOCUS_ON_OPEN] = moveFocus;
        menu.showPopover();
      }
    }
  }

  hideSubmenu() {
    this.control.element.hidePopover();
  }

  show() {
    // move focus to first element
    if ((this.control.element as MenuElement)[FOCUS_ON_OPEN] !== false) {
      if (this.control.items.length > 0) {
        this.control.items[0].focus();
      }
    }
  }

  hide() {
    // reset focus
    this.focusStrategy.activeItem = undefined;

    this.control.items.forEach((item, idx) => {
      item.setAttribute('tabindex', idx === 0 ? '0' : '-1');
    });

    const focusTriggerOnClose = (this.control.element as MenuElement)[FOCUS_TRIGGER_ON_CLOSE];

    if (focusTriggerOnClose !== false) {
      // @ts-expect-error yep, we add out own secret type
      const trigger = this.control.element[OPENER] as HTMLElement | undefined;

      if (trigger) {
        trigger.focus();
      }
    }
  }
}
