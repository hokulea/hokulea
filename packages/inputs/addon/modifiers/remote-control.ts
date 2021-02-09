import Modifier from 'ember-modifier';

import ControlFactory from './control/controls/control-factory';

export default class RemoteControlModifier extends Modifier {
  private get remote() {
    if (this.element.hasAttribute('aria-controls')) {
      const remote = document.getElementById(
        this.element.getAttribute('aria-controls') as string
      );

      if (remote) {
        return remote;
      }
    }
  }

  private get control() {
    const { remote } = this;
    if (remote) {
      return ControlFactory.createControl(remote);
    }
  }

  didInstall() {
    const { control } = this;
    if (control) {
      control.installRemote(this.element as HTMLElement);
    }
  }

  willDestroy() {
    const { control } = this;
    if (control) {
      control.uninstallRemote(this.element as HTMLElement);
    }
  }
}
