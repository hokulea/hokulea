import Modifier from 'ember-modifier';

import DropdownBuilderComponent from './index';

interface TriggerArgs {
  positional: unknown[];
  named: {
    ddb: DropdownBuilderComponent;
    register: (popup: TriggerModifier) => void;
    installListener: (element: Element, ddb: DropdownBuilderComponent) => void;
  };
}

export default class TriggerModifier extends Modifier<TriggerArgs> {
  get ddb() {
    return this.args.named.ddb;
  }

  get installListener() {
    return this.args.named.installListener;
  }

  didInstall() {
    this.args.named.register(this);

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
