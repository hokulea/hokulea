import { getRootElement, focus } from '@ember/test-helpers';

import {
  testListboxForKeyboardMultiSelection,
  testListboxForKeyboardSingleSelection,
  testListboxForMouseSingleSelection,
  testListboxForMouseMultiSelection,
  testListboxKeyboardNavigation,
  testListboxMouseNavigation
} from '@hokulea/ember-controls/test-support/a11y/-private/listbox';

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
  const trigger = getRootElement().querySelector(selectors.trigger as string);

  assert.dom(list).exists('list exists');

  return {
    elements: {
      trigger: trigger as HTMLElement,
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
  const { elements, selectors: allSelectors } = setupListTest(
    assert,
    selectors
  );

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
  const { elements, selectors: allSelectors } = setupListTest(
    assert,
    selectors
  );
  const multi = elements.list.getAttribute('aria-multiselectable');

  await (multi
    ? testListForKeyboardMultiSelection(assert, elements, allSelectors)
    : testListForKeyboardSingleSelection(assert, elements, allSelectors));
}

//
// MOUSE
//

export async function testListMouseNavigation(
  assert: Assert,
  selectors: Partial<Selectors> = DEFAULT_SELECTORS
): Promise<void> {
  const { elements, selectors: allSelectors } = setupListTest(
    assert,
    selectors
  );

  const { list } = elements;
  await testListboxMouseNavigation(
    assert,
    {
      list
    },
    {
      option: allSelectors.option
    }
  );
}

async function testListForMouseSingleSelection(
  assert: Assert,
  elements: Elements,
  selectors: Selectors
) {
  const { trigger, list } = elements;
  await testListboxForMouseSingleSelection(
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

async function testListForMouseMultiSelection(
  assert: Assert,
  elements: Elements,
  selectors: Selectors
) {
  const { trigger, list } = elements;
  await testListboxForMouseMultiSelection(
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

export async function testListMouseSelection(
  assert: Assert,
  selectors: Partial<Selectors> = DEFAULT_SELECTORS
): Promise<void> {
  const { elements, selectors: allSelectors } = setupListTest(
    assert,
    selectors
  );
  const multi = elements.list.getAttribute('aria-multiselectable');

  await (multi
    ? testListForMouseMultiSelection(assert, elements, allSelectors)
    : testListForMouseSingleSelection(assert, elements, allSelectors));
}
