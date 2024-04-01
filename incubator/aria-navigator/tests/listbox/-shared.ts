import { appendItemToList, createListElement } from '../components/list';

export function withMultiSelect(list: HTMLElement): HTMLElement {
  list.setAttribute('aria-multiselectable', 'true');

  return list;
}

export function withFruitItems(list: HTMLElement): HTMLElement {
  appendItemToList('Banana', list);
  appendItemToList('Apple', list);
  appendItemToList('Pear', list);

  return list;
}

export function createListWithFruits() {
  return withFruitItems(createListElement(document.body));
}

export function createMultiSelectListWithFruits() {
  return withFruitItems(withMultiSelect(createListElement(document.body)));
}
