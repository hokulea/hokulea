import { Widget } from '@hokulea/inputs/modifiers/widget-control';

import ControlWidget from './control';

export default class ListboxWidget extends ControlWidget implements Widget {
  readItems() {
    return [
      ...this.element.querySelectorAll('[role="option"]')
    ] as HTMLElement[];
  }
}
