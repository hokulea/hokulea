import { getRootElement, triggerKeyEvent } from '@ember/test-helpers';

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

function getOptions(list: HTMLElement, selector: string) {
  return [...list.querySelectorAll(selector)];
}

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

export async function testSelecKeyboardNavigation(
  assert: Assert,
  selectors: Partial<Selectors> = DEFAULT_SELECTORS
) {
  const { elements, selectors: allSelectors } = setupSelectTest(
    assert,
    selectors
  );

  const { trigger, list } = elements;
  const options = getOptions(list, allSelectors.option);
  const [first, second, last] = options;

  await triggerKeyEvent(trigger, 'keydown', 'Escape');
  await triggerKeyEvent(trigger, 'keydown', ' ');
  assert.dom(trigger).hasAria('expanded', 'true', 'SPACE key expands the list');
  assert
    .dom(first)
    .hasAria('current', 'true', '... and activates first option');
  assert.dom(first).hasAria('selected', 'true', '... and selects first option');

  await triggerKeyEvent(trigger, 'keydown', 'ArrowDown');

  assert
    .dom(second)
    .hasAria('current', 'true', 'ArrowDown activates second option');
  assert
    .dom(second)
    .hasAria('selected', 'true', '... and selects second option');
  assert
    .dom(first)
    .doesNotHaveAria('current', '... and deactivates first option');
  assert
    .dom(first)
    .doesNotHaveAria('selected', '... and deselects first option');

  await triggerKeyEvent(trigger, 'keydown', 'ArrowDown');

  assert
    .dom(last)
    .hasAria('current', 'true', 'ArrowDown activates last option');
  assert.dom(last).hasAria('selected', 'true', '... and selects last option');

  await triggerKeyEvent(trigger, 'keydown', 'Home');
  assert.dom(first).hasAria('current', 'true', 'Home activates first option');
  assert.dom(first).hasAria('selected', 'true', '... and selects first option');

  await triggerKeyEvent(trigger, 'keydown', 'End');
  assert.dom(last).hasAria('current', 'true', 'End activates last option');
  assert.dom(last).hasAria('selected', 'true', '... and selects last option');
}

async function testSelecForKeyboardSingleSelection(
  assert: Assert,
  elements: Elements,
  selectors: Selectors
) {
  const { trigger, list } = elements;
  const options = getOptions(list, selectors.option);
  const [first, second, last] = options;

  await triggerKeyEvent(trigger, 'keydown', 'Escape');
  await triggerKeyEvent(trigger, 'keydown', ' ');
  assert.dom(trigger).hasAria('expanded', 'true', 'SPACE key expands the list');
  assert.dom(first).hasAria('selected', 'true', '... and selects first option');

  await triggerKeyEvent(trigger, 'keydown', 'ArrowDown');
  assert
    .dom(second)
    .hasAria('selected', 'true', 'ArrowDown selects second option');
  assert
    .dom(first)
    .doesNotHaveAria('selected', '... and deselects first option');

  await triggerKeyEvent(trigger, 'keydown', 'ArrowDown');
  assert.dom(last).hasAria('selected', 'true', 'ArrowDown selects last option');

  await triggerKeyEvent(trigger, 'keydown', 'Home');
  assert.dom(first).hasAria('selected', 'true', 'Home selects first option');

  await triggerKeyEvent(trigger, 'keydown', 'End');
  assert.dom(last).hasAria('selected', 'true', 'End selects last option');
}

async function testSelecForKeyboardMultiSelection(
  assert: Assert,
  elements: Elements,
  selectors: Selectors
) {
  const { trigger, list } = elements;
  const options = getOptions(list, selectors.option);
  const [first, second, last] = options;

  await triggerKeyEvent(trigger, 'keydown', 'Escape');
  await triggerKeyEvent(trigger, 'keydown', ' ');
  assert.dom(trigger).hasAria('expanded', 'true', 'SPACE key expands the list');
  assert.dom(first).doesNotHaveAria('selected', '... and first option not selected');

  await triggerKeyEvent(trigger, 'keydown', ' ');
  assert
    .dom(first)
    .hasAria('selected', 'true', 'SPACE selects first option');

  await triggerKeyEvent(trigger, 'keydown', ' ');
  assert
    .dom(first)
    .doesNotHaveAria('selected', 'SPACE deselects first option');

  await triggerKeyEvent(trigger, 'keydown', ' ');
  assert
    .dom(first)
    .hasAria('selected', 'true', 'SPACE selects first option');

  await triggerKeyEvent(trigger, 'keydown', 'ArrowDown');
  await triggerKeyEvent(trigger, 'keydown', ' ');
  assert
    .dom(second)
    .hasAria('selected', 'true', 'ArrowDown + SPACE selects second option');
  assert
    .dom(first)
    .hasAria('selected', 'true', '... and first option still selected');

  await triggerKeyEvent(trigger, 'keydown', 'End');
  await triggerKeyEvent(trigger, 'keydown', ' ');
  assert.dom(last).hasAria('selected', 'true', 'End + SPACE selects last option');
  assert
    .dom(first)
    .hasAria('selected', 'true', '... and first option still selected');
  assert
    .dom(second)
    .hasAria('selected', 'true', '... and second option still selected');

  await triggerKeyEvent(trigger, 'keydown', 'Home');
  await triggerKeyEvent(trigger, 'keydown', ' ');

  assert.dom(first).doesNotHaveAria('selected', 'Home + SPACE deselects first option');
  assert
    .dom(second)
    .hasAria('selected', 'true', '... and second option still selected');
  assert
    .dom(last)
    .hasAria('selected', 'true', '... and last option still selected');

  await triggerKeyEvent(trigger, 'keydown', 'ArrowDown');
  await triggerKeyEvent(trigger, 'keydown', ' ');
  assert.dom(second).doesNotHaveAria('selected', 'ArrowDown + SPACE deselects second option');

  await triggerKeyEvent(trigger, 'keydown', 'ArrowDown');
  await triggerKeyEvent(trigger, 'keydown', ' ');
  assert
    .dom(last)
    .doesNotHaveAria('selected', 'ArrowDown + SPACE deselects last option');

  await triggerKeyEvent(trigger, 'keydown', 'KeyA', { metaKey: true });
  assert.dom(first).hasAria('selected', 'true', 'Meta + A selects all');
  assert
    .dom(second)
    .hasAria('selected', 'true', '... second option selected');
  assert
    .dom(last)
    .hasAria('selected', 'true', '... last option selected');
}

export async function testSelectKeyboardSelection(
  assert: Assert,
  selectors: Partial<Selectors> = DEFAULT_SELECTORS
) {
  const { elements, selectors: allSelectors } = setupSelectTest(assert, selectors);
  const multi = elements.list.getAttribute('aria-multiselectable');

  if (multi) {
    await testSelecForKeyboardMultiSelection(
      assert,
      elements,
      allSelectors
    );
  } else {
    await testSelecForKeyboardSingleSelection(
      assert,
      elements,
      allSelectors
    );
  }
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
