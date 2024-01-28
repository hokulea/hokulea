import { getRootElement, triggerKeyEvent } from '@ember/test-helpers';
import click from '@ember/test-helpers/dom/click';

import {
  testListboxForKeyboardSingleSelection,
  testListboxForKeyboardMultiSelection,
  testListboxKeyboardNavigation,
  testListboxMouseNavigation,
  testListboxForMouseSingleSelection,
  testListboxForMouseMultiSelection
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
  trigger: 'button',
  list: '[role="listbox"]',
  option: '[role="option"]'
};

function setupSelectTest(
  assert: Assert,
  selectors: Partial<Selectors>
): { elements: Elements; selectors: Selectors } {
  const fullSelectors = { ...DEFAULT_SELECTORS, ...selectors };
  const list = getRootElement().querySelector(selectors.list as string);
  const trigger = getRootElement().querySelector(selectors.trigger as string);

  assert.dom(list).exists('list exists');
  assert.dom(trigger).exists('trigger exists');

  return {
    elements: {
      trigger: trigger as HTMLElement,
      list: list as HTMLElement
    },
    selectors: fullSelectors
  };
}

export async function testSelectKeyboardNavigation(
  assert: Assert,
  selectors: Partial<Selectors> = DEFAULT_SELECTORS
): Promise<void> {
  const { elements, selectors: allSelectors } = setupSelectTest(
    assert,
    selectors
  );

  const { trigger, list } = elements;
  await triggerKeyEvent(trigger, 'keydown', 'Escape');
  await triggerKeyEvent(trigger, 'keydown', ' ');
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

async function testSelectForKeyboardSingleSelection(
  assert: Assert,
  elements: Elements,
  selectors: Selectors
) {
  const { trigger, list } = elements;
  await triggerKeyEvent(trigger, 'keydown', 'Escape');
  await triggerKeyEvent(trigger, 'keydown', ' ');
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

async function testSelectForKeyboardMultiSelection(
  assert: Assert,
  elements: Elements,
  selectors: Selectors
) {
  const { trigger, list } = elements;

  await triggerKeyEvent(trigger, 'keydown', 'Escape');
  await triggerKeyEvent(trigger, 'keydown', ' ');

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

export async function testSelectKeyboardSelection(
  assert: Assert,
  selectors: Partial<Selectors> = DEFAULT_SELECTORS
) {
  const { elements, selectors: allSelectors } = setupSelectTest(
    assert,
    selectors
  );
  const multi = elements.list.getAttribute('aria-multiselectable');

  await (multi
    ? testSelectForKeyboardMultiSelection(assert, elements, allSelectors)
    : testSelectForKeyboardSingleSelection(assert, elements, allSelectors));
}

export async function testSelectKeyboardOpenAndClose(
  assert: Assert,
  selectors: Partial<Selectors> = DEFAULT_SELECTORS
) {
  const { elements } = setupSelectTest(assert, selectors);
  const { trigger } = elements;

  // open with enter
  await triggerKeyEvent(trigger, 'keydown', 'Enter');
  assert.dom(trigger).hasAria('expanded', 'true');

  // close with escape
  await triggerKeyEvent(trigger, 'keydown', 'Escape');
  assert.dom(trigger).hasAria('expanded', 'false');

  // open with space
  await triggerKeyEvent(trigger, 'keydown', ' ');
  assert.dom(trigger).hasAria('expanded', 'true');

  await triggerKeyEvent(trigger, 'keydown', 'Escape');
}

//
// MOUSE
//

export async function testSelectMouseNavigation(
  assert: Assert,
  selectors: Partial<Selectors> = DEFAULT_SELECTORS
) {
  const { elements, selectors: allSelectors } = setupSelectTest(
    assert,
    selectors
  );

  const { trigger, list } = elements;
  await click(trigger);
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

async function testSelectForMouseSingleSelection(
  assert: Assert,
  elements: Elements,
  selectors: Selectors
) {
  const { trigger, list } = elements;
  await click(trigger);
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

async function testSelectForMouseMultiSelection(
  assert: Assert,
  elements: Elements,
  selectors: Selectors
) {
  const { trigger, list } = elements;
  await click(trigger);
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

export async function testSelectMouseSelection(
  assert: Assert,
  selectors: Partial<Selectors> = DEFAULT_SELECTORS
): Promise<void> {
  const { elements, selectors: allSelectors } = setupSelectTest(
    assert,
    selectors
  );
  const multi = elements.list.getAttribute('aria-multiselectable');

  await (multi
    ? testSelectForMouseMultiSelection(assert, elements, allSelectors)
    : testSelectForMouseSingleSelection(assert, elements, allSelectors));
}
