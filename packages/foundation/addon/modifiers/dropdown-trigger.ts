import Modifier from 'ember-modifier';

import DropdownBuilderComponent from '../components/dropdown-builder';

interface DropdownTriggerArgs {
  positional: [DropdownBuilderComponent];
  named: {
    installListener: (element: Element, ddb: DropdownBuilderComponent) => void;
  };
}

export default class DropdownTriggerModifier extends Modifier<
  DropdownTriggerArgs
> {
  get ddb() {
    return this.args.positional[0];
  }

  get installListener() {
    return this.args.named.installListener;
  }

  didInstall() {
    this.ddb?.registerTrigger(this);

    if (this.element) {
      const { installListener } = this;
      if (installListener) {
        installListener(this.element, this.ddb);
      } else {
        this.installDefaultListener();
      }
      this.element.setAttribute('aria-owns', this.ddb.id);
      this.element.setAttribute('aria-controls', this.ddb.id);
      this.element.setAttribute('aria-expanded', 'false');
    }
  }

  private installDefaultListener() {
    this.element.addEventListener('click', () => {
      this.ddb.toggle();
    });
  }

  updateExpanded(expanded: boolean) {
    if (this.element) {
      this.element.setAttribute('aria-expanded', `${expanded}`);
    }
  }
}
