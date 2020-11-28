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

export default class DropdownBuilderComponent extends Component<
  DropdownBuilderArgs
> {
  id = guidFor(this);
  @tracked expanded = false;

  private triggerPart?: DropdownTriggerModifier;
  private popupPart?: DropdownPopupModifier;

  registerTrigger(trigger: DropdownTriggerModifier) {
    this.triggerPart = trigger;
    this.setAriaPopupOnTrigger();
  }

  registerPopup(popup: DropdownPopupModifier) {
    this.popupPart = popup;
    this.setAriaPopupOnTrigger();
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
  trigger() {
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
