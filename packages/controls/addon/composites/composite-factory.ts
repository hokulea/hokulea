import Composite, { CompositeOptions, Emitter } from './composite';
import Listbox from './listbox';
import Menu from './menu';
import {
  SelectableCompositeOptions,
  SelectEmitter
} from './selectable-composite';

export default class CompositeFactory {
  static createComposite(
    element: HTMLElement,
    emitter: Emitter | SelectEmitter,
    options: CompositeOptions | SelectableCompositeOptions
  ): Composite | undefined {
    const role = element.getAttribute('role');
    if (role === 'listbox') {
      return new Listbox(element, emitter as SelectEmitter, options);
    }

    if (role === 'menu') {
      return new Menu(element, emitter, options);
    }

    // no composite found
    // eslint-disable-next-line unicorn/no-useless-undefined
    return undefined;
  }
}
