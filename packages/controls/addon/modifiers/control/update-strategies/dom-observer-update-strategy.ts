import { registerDestructor } from '@ember/destroyable';

import Control from '../../../controls/control';
import { ControlArgs } from '../../control';
import UpdateStrategy from './update-strategy';

export default class DomObserverUpdateStrategy<T> implements UpdateStrategy<T> {
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

    registerDestructor(this, () => {
      observer.disconnect();
    });
  }

  updateArguments(_args: ControlArgs<T>) {
    // noop
  }
}
