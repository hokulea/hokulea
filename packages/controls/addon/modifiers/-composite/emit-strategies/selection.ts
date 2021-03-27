import { CompositeElement } from '@hokulea/controls/composites/composite';

export function getSelectionIndices(
  elements: HTMLElement[],
  selection: CompositeElement[]
): number[] {
  return selection.map(i => elements.indexOf(i)).filter(i => i !== -1);
}
