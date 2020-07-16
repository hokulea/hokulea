import Modifier from 'ember-modifier';

import DropdownBuilderComponent from '../components/dropdown-builder';

interface DropdownPopupArgs {
  positional: [{ parent: DropdownBuilderComponent }];
  named: {};
}

export default class DropdownPopupModifier extends Modifier<DropdownPopupArgs> {
  get parent() {
    return this.args.positional[0].parent;
  }

  didInstall() {
    this.parent?.registerPopup(this);

    if (this.element) {
      // this.element.addEventListener('click', () => {
      //   this.parent.trigger();
      // });
      this.element.id = this.parent.id;

      // move to body
      // this.element.parentElement?.removeChild(this.element);
      // document.body.appendChild(this.element);
    }
  }
}
