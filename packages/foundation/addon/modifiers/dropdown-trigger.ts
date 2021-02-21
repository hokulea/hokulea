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
      const { installListener, element, ddb } = this;
      if (installListener) {
        installListener(element, ddb);
      } else {
        this.installDefaultListener();
      }
      element.setAttribute('aria-owns', ddb.id);
      element.setAttribute('aria-controls', ddb.id);
      element.setAttribute('aria-expanded', 'false');
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
