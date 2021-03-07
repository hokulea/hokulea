import { triggerKeyEvent } from '@ember/test-helpers';

function getOptions(list: HTMLElement, selector: string) {
  return [...list.querySelectorAll(selector)];
}

export async function testListboxKeyboardNavigation(
  assert: Assert,
  elements: {
    target: HTMLElement;
    list: HTMLElement;
  },
  selectors: {
    option: string;
  }
) {
  const { target, list } = elements;
  const options = getOptions(list, selectors.option);
  const [first, second, last] = options;

  assert.dom(first).hasAria('current', 'true', 'First option is activated');

  await triggerKeyEvent(target, 'keydown', 'ArrowDown');

  assert
    .dom(second)
    .hasAria('current', 'true', 'ArrowDown activates second option');
  assert
    .dom(first)
    .doesNotHaveAria('current', '... and deactivates first option');

  await triggerKeyEvent(target, 'keydown', 'ArrowDown');

  assert
    .dom(last)
    .hasAria('current', 'true', 'ArrowDown activates last option');

  await triggerKeyEvent(target, 'keydown', 'Home');
  assert.dom(first).hasAria('current', 'true', 'Home activates first option');

  await triggerKeyEvent(target, 'keydown', 'End');
  assert.dom(last).hasAria('current', 'true', 'End activates last option');
}

export async function testListboxForKeyboardSingleSelection(
  assert: Assert,
  elements: {
    target: HTMLElement;
    list: HTMLElement;
  },
  selectors: {
    option: string;
  }
) {
  const { target, list } = elements;
  const options = getOptions(list, selectors.option);
  const [first, second, last] = options;

  assert.dom(first).hasAria('current', 'true', 'First option is activated');
  assert.dom(first).hasAria('selected', 'true', '... and selected');

  await triggerKeyEvent(target, 'keydown', 'ArrowDown');
  assert
    .dom(second)
    .hasAria('selected', 'true', 'ArrowDown selects second option');
  assert
    .dom(first)
    .doesNotHaveAria('selected', '... and deselects first option');

  await triggerKeyEvent(target, 'keydown', 'ArrowDown');
  assert.dom(last).hasAria('selected', 'true', 'ArrowDown selects last option');

  await triggerKeyEvent(target, 'keydown', 'Home');
  assert.dom(first).hasAria('selected', 'true', 'Home selects first option');

  await triggerKeyEvent(target, 'keydown', 'End');
  assert.dom(last).hasAria('selected', 'true', 'End selects last option');
}

export async function testListboxForKeyboardMultiSelection(
  assert: Assert,
  elements: {
    target: HTMLElement;
    list: HTMLElement;
  },
  selectors: {
    option: string;
  }
) {
  const { target, list } = elements;
  const options = getOptions(list, selectors.option);
  const [first, second, last] = options;

  assert.dom(first).hasAria('current', 'true', 'First option is activated');
  assert.dom(first).doesNotHaveAria('selected', '... and not selected');

  await triggerKeyEvent(target, 'keydown', ' ');
  assert.dom(first).hasAria('selected', 'true', 'SPACE selects first option');

  await triggerKeyEvent(target, 'keydown', ' ');
  assert.dom(first).doesNotHaveAria('selected', 'SPACE deselects first option');

  await triggerKeyEvent(target, 'keydown', ' ');
  assert.dom(first).hasAria('selected', 'true', 'SPACE selects first option');

  await triggerKeyEvent(target, 'keydown', 'ArrowDown');
  await triggerKeyEvent(target, 'keydown', ' ');
  assert
    .dom(second)
    .hasAria('selected', 'true', 'ArrowDown + SPACE selects second option');
  assert
    .dom(first)
    .hasAria('selected', 'true', '... and first option still selected');

  await triggerKeyEvent(target, 'keydown', 'End');
  await triggerKeyEvent(target, 'keydown', ' ');
  assert
    .dom(last)
    .hasAria('selected', 'true', 'End + SPACE selects last option');
  assert
    .dom(first)
    .hasAria('selected', 'true', '... and first option still selected');
  assert
    .dom(second)
    .hasAria('selected', 'true', '... and second option still selected');

  await triggerKeyEvent(target, 'keydown', 'Home');
  await triggerKeyEvent(target, 'keydown', ' ');

  assert
    .dom(first)
    .doesNotHaveAria('selected', 'Home + SPACE deselects first option');
  assert
    .dom(second)
    .hasAria('selected', 'true', '... and second option still selected');
  assert
    .dom(last)
    .hasAria('selected', 'true', '... and last option still selected');

  await triggerKeyEvent(target, 'keydown', 'ArrowDown');
  await triggerKeyEvent(target, 'keydown', ' ');
  assert
    .dom(second)
    .doesNotHaveAria('selected', 'ArrowDown + SPACE deselects second option');

  await triggerKeyEvent(target, 'keydown', 'ArrowDown');
  await triggerKeyEvent(target, 'keydown', ' ');
  assert
    .dom(last)
    .doesNotHaveAria('selected', 'ArrowDown + SPACE deselects last option');

  await triggerKeyEvent(target, 'keydown', 'KeyA', { metaKey: true });
  assert.dom(first).hasAria('selected', 'true', 'Meta + A selects all');
  assert.dom(second).hasAria('selected', 'true', '... second option selected');
  assert.dom(last).hasAria('selected', 'true', '... last option selected');
}
