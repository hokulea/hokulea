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

function isPointerEvent(event: Event): event is PointerEvent {
  return ['pointerover', 'pointerout', 'pointerup'].includes(event.type);
}

function getMenuFromItem(item: Item): MenuElement | null {
  return document.getElementById(
    item.getAttribute('popovertarget') as string
  ) as MenuElement | null;
}

export class MenuNavigation implements NavigationPattern {
  eventListeners: EventNames[] = ['keydown', 'toggle', 'pointerover', 'pointerout', 'pointerup'];

  constructor(
    private control: Control,
    private focusStrategy: FocusStrategy
  ) {}

  matches(event: Event): boolean {
    return (
      (event instanceof KeyboardEvent &&
        (event.key === ' ' ||
          event.key === 'Enter' ||
          event.key === 'ArrowRight' ||
          event.key === 'ArrowLeft')) ||
      event.type === 'toggle' ||
      event.type === 'pointerover' ||
      event.type === 'pointerout' ||
      event.type === 'pointerup'
    );
  }

  handle(bag: NavigationParameterBag): NavigationParameterBag {
    const { event } = bag;

    // navigation handlers
    if (event.type === 'keydown') {
      this.navigateWithKeyboard(event as KeyboardEvent);
    } else if (isPointerEvent(event)) {
      this.navigateWithPointer(event);
    }

    // toggle behavior
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
    if (event.key === 'ArrowRight' && this.control.activeItem?.hasAttribute('popovertarget')) {
      this.showSubmenu(true);
    }

    if (event.key === 'ArrowLeft') {
      this.hideSubmenu();
    }

    // close menu, when action is invoked
    if (
      !this.control.activeItem?.hasAttribute('popovertarget') &&
      (event.key === 'Enter' || event.key === ' ')
    ) {
      event.preventDefault();

      this.control.activeItem?.click();
      this.closeRootMenu();
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
    }

    // close on invocation
    else if (
      event.type === 'pointerup' &&
      !this.control.activeItem?.hasAttribute('popovertarget')
    ) {
      this.closeRootMenu();
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
    for (const item of this.control.items) {
      item.setAttribute('tabindex', '-1');
    }

    if (this.control.enabledItems.length > 0) {
      this.control.enabledItems[0].setAttribute('tabindex', '0');
    }

    // move focus to first element
    if ((this.control.element as MenuElement)[FOCUS_ON_OPEN] !== false) {
      if (this.control.enabledItems.length > 0) {
        this.control.enabledItems[0].focus();
      }
    }
  }

  hide() {
    // reset focus
    this.focusStrategy.activeItem = undefined;

    const focusTriggerOnClose = (this.control.element as MenuElement)[FOCUS_TRIGGER_ON_CLOSE];

    if (focusTriggerOnClose !== false) {
      // @ts-expect-error yep, we add out own secret type
      const trigger = this.control.element[OPENER] as HTMLElement | undefined;

      if (trigger) {
        trigger.focus();
      }
    }
  }

  closeRootMenu() {
    const getRootMenu = (menu: MenuElement): HTMLElement | undefined => {
      const menus = [];

      let elem: HTMLElement | null = menu;

      while (elem) {
        if (elem.getAttribute('role') === 'menu' && elem.hasAttribute('popover')) {
          menus.push(elem);
        }

        elem = elem.parentElement;
      }

      return menus.pop();
    };

    const root = getRootMenu(this.control.element as MenuElement);

    if (root) {
      root.hidePopover();
    }
  }
}
