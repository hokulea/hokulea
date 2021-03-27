import { CompositeElement } from '../composite';
import ActivationStrategy from './focus-strategy';

export default class TabindexStrategy implements ActivationStrategy {
  private prevFocusElement?: CompositeElement;
  private selector: string;

  constructor(selector = ':scope [tabindex="0"]') {
    this.selector = selector;
  }

  persistFocus(element: CompositeElement): void {
    this.prevFocusElement?.setAttribute('tabindex', '-1');

    element.setAttribute('tabindex', '0');
    element.focus();
    this.prevFocusElement = element;
  }

  readFocus(parent: HTMLElement): CompositeElement | undefined {
    const element = parent.querySelector(this.selector);

    return document.activeElement === element
      ? (element as CompositeElement)
      : undefined;
  }
}
