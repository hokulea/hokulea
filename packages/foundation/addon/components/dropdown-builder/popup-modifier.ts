import Modifier from 'ember-modifier';

import DropdownBuilderComponent from './index';

interface PopupArgs {
  positional: unknown[];
  named: {
    ddb: DropdownBuilderComponent;
    register: (popup: PopupModifier) => void;
  };
}

export default class PopupModifier extends Modifier<PopupArgs> {
  get ddb() {
    return this.args.named.ddb;
  }

  didInstall() {
    this.args.named.register(this);
    this.element.id = this.ddb.id;
  }
}
