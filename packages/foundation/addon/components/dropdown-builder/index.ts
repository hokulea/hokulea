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
  }

  registerPopup(popup: DropdownPopupModifier) {
    this.popupPart = popup;
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
    this.popupPart?.updateExpanded(expanded);

    if (expanded) {
      this.args.opened?.();
    } else {
      this.args.closed?.();
    }
  }
}
