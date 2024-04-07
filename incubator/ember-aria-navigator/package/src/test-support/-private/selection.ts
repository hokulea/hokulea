import { triggerEvent } from '@ember/test-helpers';

import getDescription from './-get-description';
import getElement from './-get-element';

import type { Target } from '@ember/test-helpers';

function errorMessage(message: string, target: Target, name: string) {
  let description = getDescription(target);

  return `${message} when calling \`${name}('${description}')\`.`;
}

export function getOptions(parent: HTMLElement, selector: string): HTMLElement[] {
  return [...parent.querySelectorAll(selector)] as HTMLElement[];
}

function findOption(
  target: Target,
  text: string,
  {
    selectors
  }: {
    selectors: { option: string };
  }
): HTMLElement | undefined {
  if (!target) {
    throw new Error(`Must pass an element, selector, or descriptor to \`findOption\`.`);
  }

  if (typeof text === 'undefined' || text === null) {
    throw new Error(`Must provide an \`text\` to select when calling \`findOption\`.`);
  }

  const element = getElement(target) as HTMLElement;

  if (!element) {
    throw new Error(errorMessage('Element not found', target, 'findOption'));
  }

  return getOptions(element, selectors.option).find((e) => e.textContent?.trim().includes(text));
}

export function findOptions(
  target: Target,
  texts: string[],
  {
    selectors
  }: {
    selectors: { option: string };
  }
): HTMLElement[] {
  if (!target) {
    throw new Error(`Must pass an element, selector, or descriptor to \`findOption\`.`);
  }

  if (typeof texts === 'undefined' || texts === null) {
    throw new Error(`Must provide an \`texts\` to select when calling \`findOption\`.`);
  }

  const element = getElement(target) as HTMLElement;

  if (!element) {
    throw new Error(errorMessage('Element not found', target, 'findOption'));
  }

  return getOptions(element, selectors.option).filter((e) =>
    texts.includes(e.textContent?.trim() as string)
  );
}

export async function select(
  target: Target,
  options: string | string[],
  {
    keepPreviouslySelected = false,
    labels: { name, element: elementName },
    selectors
  }: {
    keepPreviouslySelected?: boolean;
    labels: { name: string; element: string };
    selectors: { option: string };
  }
): Promise<void> {
  if (!target) {
    throw new Error(`Must pass an element, selector, or descriptor to \`${name}\`.`);
  }

  if (typeof options === 'undefined' || options === null) {
    throw new Error(
      `Must provide an \`option\` or \`options\` to select when calling \`${name}\`.`
    );
  }

  const element = getElement(target) as HTMLElement;

  if (!element) {
    throw new Error(errorMessage('Element not found', target, name));
  }

  // if (!isSelectElement(element)) {
  //   throw new Error(errorMessage('Element is not a HTMLSelectElement', target));
  // }

  // if (list.disabled) {
  //   throw new Error(errorMessage('Element is disabled', selectors.list, name));
  // }

  const multi = element.getAttribute('aria-multiselectable') === 'true';

  if (!multi && Array.isArray(options)) {
    throw new Error(
      errorMessage(
        `${elementName} \`multiple\` attribute is set to \`false\` but multiple options were passed`,
        target,
        name
      )
    );
  }

  const optionElements = (
    Array.isArray(options)
      ? findOptions(element, options, { selectors })
      : [findOption(element, options, { selectors })]
  ).filter((e) => e !== null) as HTMLElement[];

  const items = element.querySelectorAll(selectors.option) as NodeListOf<HTMLElement>;

  for (const item of items) {
    if (optionElements.includes(item)) {
      item.setAttribute('aria-selected', 'true');
    } else if (!keepPreviouslySelected) {
      item.removeAttribute('aria-selected');
    }
  }

  await triggerEvent(element, 'change');
}
