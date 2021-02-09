import { assert } from '@ember/debug';
import { action } from '@ember/object';
import { guidFor } from '@ember/object/internals';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

import DropdownPopupModifier from '@hokulea/foundation/modifiers/dropdown-popup';
import DropdownTriggerModifier from '@hokulea/foundation/modifiers/dropdown-trigger';

interface DropdownBuilderArgs {
  opened: () => void;
  closed: () => void;
}

export interface DropdownBuilderBlocks {
  default: [DropdownBuilderComponent];
}

export default class DropdownBuilderComponent extends Component<
  DropdownBuilderArgs
> {
  // eslint-disable-next-line @typescript-eslint/no-invalid-this
  id = guidFor(this);
  @tracked expanded = false;

  triggerPart?: DropdownTriggerModifier;
  popupPart?: DropdownPopupModifier;

  registerTrigger(trigger: DropdownTriggerModifier) {
    this.triggerPart = trigger;
    this.registerCloseListener();
    this.setAriaPopupOnTrigger();
  }

  registerPopup(popup: DropdownPopupModifier) {
    this.popupPart = popup;
    this.registerCloseListener();
    this.setAriaPopupOnTrigger();
  }

  private registerCloseListener() {
    if (this.triggerPart && this.popupPart) {
      document.body.addEventListener('click', (event: MouseEvent) => {
        const path = event.composedPath();

        if (
          path.includes((this.popupPart as DropdownTriggerModifier).element) ||
          path.includes((this.triggerPart as DropdownPopupModifier).element)
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
