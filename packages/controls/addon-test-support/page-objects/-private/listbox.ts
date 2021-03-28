import { getRootElement, settled } from '@ember/test-helpers';

import { Command } from '@hokulea/controls/composites/listbox';

function getOptions(selector: string): HTMLElement[] {
  return [...getRootElement().querySelectorAll(selector)] as HTMLElement[];
}

function findOption(selector: string, text: string): HTMLElement | undefined {
  return getOptions(selector).find(e => e.textContent?.trim().includes(text));
}

function findOptions(selector: string, texts: string[]): HTMLElement[] {
  return getOptions(selector).filter(e =>
    texts.includes(e.textContent?.trim() as string)
  );
}

export async function select(
  selectors: { option: string; list: string },
  text: string | string[]
): Promise<void> {
  const options = Array.isArray(text)
    ? findOptions(selectors.option, text)
    : [findOption(selectors.option, text)];

  if (options.length > 0) {
    const list = getRootElement().querySelector(selectors.list);
    list?.dispatchEvent(
      new CustomEvent('listbox', {
        detail: {
          command: Command.Select,
          selection: options
        }
      })
    );
    await settled();
  }
}

export async function activateItem(
  selectors: { option: string; list: string },
  text: string
): Promise<void> {
  const item = findOption(selectors.option, text);

  if (item) {
    const list = getRootElement().querySelector(selectors.list);
    list?.dispatchEvent(
      new CustomEvent('listbox', {
        detail: {
          command: 'select',
          option: item
        }
      })
    );
    await settled();
  }
}
