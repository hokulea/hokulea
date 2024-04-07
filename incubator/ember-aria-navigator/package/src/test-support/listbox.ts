import { focus, getRootElement } from '@ember/test-helpers';

import {
  testListboxForKeyboardMultiSelection,
  testListboxForKeyboardSingleSelection,
  testListboxForPointerMultiSelection,
  testListboxForPointerSingleSelection,
  testListboxKeyboardNavigation,
  testListboxPointerNavigation
} from './-private/list';
import { select } from './-private/selection';

import type { Target } from '@ember/test-helpers';

type Selectors = {
  trigger: string;
  list: string;
  option: string;
};

type Elements = {
  trigger: HTMLElement;
  list: HTMLElement;
};

const DEFAULT_SELECTORS = {
  trigger: '[role="listbox"]',
  list: '[role="listbox"]',
  option: '[role="option"]'
};

function setupListTest(
  assert: Assert,
  selectors: Partial<Selectors>
): { elements: Elements; selectors: Selectors } {
  const fullSelectors = { ...DEFAULT_SELECTORS, ...selectors };
  const list = getRootElement().querySelector(selectors.list as string);

  assert.dom(list).exists('list exists');

  return {
    elements: {
      trigger: list as HTMLElement,
      list: list as HTMLElement
    },
    selectors: fullSelectors
  };
}

//
// KEYBOARD
//

export async function testListKeyboardNavigation(
  assert: Assert,
  selectors: Partial<Selectors> = DEFAULT_SELECTORS
): Promise<void> {
  const { elements, selectors: allSelectors } = setupListTest(assert, selectors);

  const { trigger, list } = elements;

  await focus(list);

  await testListboxKeyboardNavigation(
    assert,
    {
      target: trigger,
      list
    },
    {
      option: allSelectors.option
    }
  );
}

async function testListForKeyboardSingleSelection(
  assert: Assert,
  elements: Elements,
  selectors: Selectors
) {
  const { trigger, list } = elements;

  await focus(list);
  await testListboxForKeyboardSingleSelection(
    assert,
    {
      target: trigger,
      list
    },
    {
      option: selectors.option
    }
  );
}

async function testListForKeyboardMultiSelection(
  assert: Assert,
  elements: Elements,
  selectors: Selectors
) {
  const { trigger, list } = elements;

  await focus(list);
  await testListboxForKeyboardMultiSelection(
    assert,
    {
      target: trigger,
      list
    },
    {
      option: selectors.option
    }
  );
}

export async function testListKeyboardSelection(
  assert: Assert,
  selectors: Partial<Selectors> = DEFAULT_SELECTORS
): Promise<void> {
  const { elements, selectors: allSelectors } = setupListTest(assert, selectors);
  const multi = elements.list.getAttribute('aria-multiselectable');

  await (multi
    ? testListForKeyboardMultiSelection(assert, elements, allSelectors)
    : testListForKeyboardSingleSelection(assert, elements, allSelectors));
}

//
// MOUSE
//

export async function testListPointerNavigation(
  assert: Assert,
  selectors: Partial<Selectors> = DEFAULT_SELECTORS
): Promise<void> {
  const { elements, selectors: allSelectors } = setupListTest(assert, selectors);

  const { list } = elements;

  await testListboxPointerNavigation(
    assert,
    {
      list
    },
    {
      option: allSelectors.option
    }
  );
}

async function testListForPointerSingleSelection(
  assert: Assert,
  elements: Elements,
  selectors: Selectors
) {
  const { trigger, list } = elements;

  await testListboxForPointerSingleSelection(
    assert,
    {
      target: trigger,
      list
    },
    {
      option: selectors.option
    }
  );
}

async function testListForPointerMultiSelection(
  assert: Assert,
  elements: Elements,
  selectors: Selectors
) {
  const { trigger, list } = elements;

  await testListboxForPointerMultiSelection(
    assert,
    {
      target: trigger,
      list
    },
    {
      option: selectors.option
    }
  );
}

export async function testListPointerSelection(
  assert: Assert,
  selectors: Partial<Selectors> = DEFAULT_SELECTORS
): Promise<void> {
  const { elements, selectors: allSelectors } = setupListTest(assert, selectors);
  const multi = elements.list.getAttribute('aria-multiselectable');

  await (multi
    ? testListForPointerMultiSelection(assert, elements, allSelectors)
    : testListForPointerSingleSelection(assert, elements, allSelectors));
}

//
// BEHAVIOR
//

export async function selectListbox(
  target: Target,
  options: string | string[],
  keepPreviouslySelected = false
) {
  await select(target, options, {
    keepPreviouslySelected,
    labels: { name: 'selectListbox', element: 'Listbox' },
    selectors: {
      option: DEFAULT_SELECTORS.option
    }
  });
}

//
// utility functions
//

// export function findListboxOption(target: Target, text: string) {
//   return findOption(target, text, {
//     selectors: { option: DEFAULT_SELECTORS.option },
//     labels: { name: 'findListboxOption' }
//   });
// }

// export function findListboxOptions(target: Target, texts: string[]) {
//   return findOptions(target, texts, {
//     selectors: { option: DEFAULT_SELECTORS.option },
//     labels: { name: 'findListboxOptions' }
//   });
// }
