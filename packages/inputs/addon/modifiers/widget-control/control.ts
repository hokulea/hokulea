import { Widget } from '@hokulea/inputs/modifiers/widget-control';

export default class ControlWidget implements Widget {
  protected element: HTMLElement;

  constructor(element: HTMLElement) {
    this.element = element;
  }

  readSelection(): HTMLElement[] {
    return [
      ...this.element.querySelectorAll('[aria-selected="true"]')
    ] as HTMLElement[];
  }

  readActiveItem(): HTMLElement | undefined {
    return this.element.querySelector('[aria-current]') as
      | HTMLElement
      | undefined;
  }

  readItems(): HTMLElement[] {
    return [];
  }
}
