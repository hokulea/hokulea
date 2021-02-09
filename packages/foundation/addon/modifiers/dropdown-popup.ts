import Modifier from 'ember-modifier';

import DropdownBuilderComponent from '../components/dropdown-builder';

interface DropdownPopupArgs {
  positional: [DropdownBuilderComponent];
  named: Record<string, unknown>;
}

export default class DropdownPopupModifier extends Modifier<DropdownPopupArgs> {
  get ddb() {
    return this.args.positional[0];
  }

  didInstall() {
    this.ddb?.registerPopup(this);

    if (this.element) {
      // this.element.addEventListener('click', () => {
      //   this.parent.trigger();
      // });
      this.element.id = this.ddb.id;

      // move to body
      // this.element.parentElement?.removeChild(this.element);
      // document.body.appendChild(this.element);
    }
  }
}
