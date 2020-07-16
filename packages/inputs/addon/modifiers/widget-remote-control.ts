import Modifier from 'ember-modifier';

interface WidgetRemoteControlArgs {
  positional: [];
  named: {
    for: string;
  };
}

export default class WidgetRemoteControlModifier extends Modifier<
  WidgetRemoteControlArgs
> {
  get remote() {
    return document.getElementById(this.args.named.for);
  }

  didInstall() {
    // remote the control
    if (this.element) {
      this.element.addEventListener('mousedown', (event: MouseEvent) => {
        // this.handleMouseEvent(event);
        this.remote?.dispatchEvent(new MouseEvent('mousedown', event));
      });
      this.element.addEventListener('keydown', (event: KeyboardEvent) => {
        console.log('keydown on remote control', event, this.remote);

        this.remote?.dispatchEvent(new KeyboardEvent('keydown', event));
      });
      // this.element.addEventListener('focusin', () => {
      //   this.applyFocus();
      // });
    }
  }
}
