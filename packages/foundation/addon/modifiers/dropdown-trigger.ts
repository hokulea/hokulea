import Modifier from 'ember-modifier';

import DropdownBuilderComponent from 'dummy/components/dropdown-builder';

interface DropdownTriggerArgs {
  positional: [{ parent: DropdownBuilderComponent }];
  named: {};
}

export default class DropdownTriggerModifier extends Modifier<
  DropdownTriggerArgs
> {
  get parent() {
    return this.args.positional[0].parent;
  }

  didInstall() {
    this.parent?.registerTrigger(this);

    if (this.element) {
      this.element.addEventListener('click', () => {
        this.parent.trigger();
      });
      this.element.setAttribute('aria-owns', this.parent.id);
      this.element.setAttribute('aria-controls', this.parent.id);
    }
  }

  updateExpanded(expanded: boolean) {
    if (this.element) {
      this.element.setAttribute('aria-expanded', `${expanded}`);
      // this.element.setAttribute('')
    }
  }
}
