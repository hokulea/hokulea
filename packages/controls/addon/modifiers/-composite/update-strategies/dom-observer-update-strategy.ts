import { registerDestructor } from '@ember/destroyable';

import Composite from '../../../composites/composite';
import { CompositeArgs } from '../../composite';
import UpdateStrategy from './update-strategy';

export default class DomObserverUpdateStrategy<T> implements UpdateStrategy<T> {
  constructor(composite: Composite) {
    const observer = new MutationObserver(() => {
      // we could look for particular changes on relevant AT tree properties and
      // attributes to make it more performant - yes! Let's do this in the
      // future
      composite.read();
    });

    observer.observe(composite.element, {
      subtree: true,
      childList: true,
      attributes: true
    });

    registerDestructor(this, () => {
      observer.disconnect();
    });
  }

  updateArguments(_args: CompositeArgs<T>): void {
    // noop
  }
}
