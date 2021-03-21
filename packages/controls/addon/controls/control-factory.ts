import EmitStrategy from '@hokulea/controls/modifiers/control/emit-strategies/emit-strategy';

import Control, { ControlOptions } from './control';
import Listbox from './listbox';

export default class ControlFactory {
  static createControl(
    element: HTMLElement,
    emitter: EmitStrategy,
    options: ControlOptions
  ): Control {
    const role = element.getAttribute('role');
    if (role === 'listbox') {
      return new Listbox(element, emitter, options);
    }

    return new Control(element, emitter, options);
  }
}
