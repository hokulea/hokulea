import { CompositeElement } from '../composite';

export default interface FocusStrategy {
  persistFocus(item: CompositeElement): void;

  readFocus(parent: HTMLElement): CompositeElement | undefined;
}
