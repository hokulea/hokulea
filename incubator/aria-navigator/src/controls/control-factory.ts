import { Control } from './control';
import { Listbox } from './listbox';

export class ControlFactory {
  static createControl(element: HTMLElement): Control {
    const role = element.getAttribute('role');

    if (role === 'listbox') {
      return new Listbox(element);
    }

    return new Control(element);
  }
}
