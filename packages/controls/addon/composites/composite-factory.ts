import Composite, { Options, Emitter } from './composite';
import Listbox, { ListboxEmitter, ListboxOptions } from './listbox';
import Menu, { MenuEmitter, MenuOptions } from './menu';

export default class CompositeFactory {
  static createComposite(
    element: HTMLElement,
    emitter: Emitter,
    options: Options
  ): Composite | undefined {
    const role = element.getAttribute('role');
    if (role === 'listbox') {
      return new Listbox(element, {
        emitter: emitter as ListboxEmitter,
        options: options as ListboxOptions
      });
    }

    if (role === 'menu') {
      return new Menu(element, {
        emitter: emitter as MenuEmitter,
        options: options as MenuOptions
      });
    }

    // no composite found
    // eslint-disable-next-line unicorn/no-useless-undefined
    return undefined;
  }
}
