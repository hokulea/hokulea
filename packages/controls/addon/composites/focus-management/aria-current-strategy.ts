import { CompositeElement } from '../composite';
import ActivationStrategy from './focus-strategy';

export default class AriaCurrentStrategy implements ActivationStrategy {
  private prevFocusElement?: CompositeElement;

  persistFocus(element: CompositeElement): void {
    this.prevFocusElement?.removeAttribute('aria-current');
    element?.setAttribute('aria-current', 'true');
    this.prevFocusElement = element;
  }

  readFocus(parent: HTMLElement): CompositeElement | undefined {
    return parent.querySelector('[aria-current]') as
      | CompositeElement
      | undefined;
  }
}
