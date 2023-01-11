import type { Control, ControlArgs } from '../controls/control';
import type { UpdateStrategy } from './update-strategy';

export class DomObserverUpdateStrategy<T> implements UpdateStrategy<T> {
  constructor(control: Control) {
    const observer = new MutationObserver(() => {
      // we could look for particular changes on relevant AT tree properties and
      // attributes to make it more performant - yes! Let's do this in the
      // future
      control.read();
    });

    observer.observe(control.element, {
      subtree: true,
      childList: true,
      attributes: true
    });

    // registerDestructor(this, () => {
    //   // eslint-disable-next-line ember/no-observers
    //   observer.disconnect();
    // });
  }

  updateArguments(_args: ControlArgs<T>) {
    // noop
  }
}
