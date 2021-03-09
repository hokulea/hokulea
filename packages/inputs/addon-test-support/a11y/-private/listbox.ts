import { triggerKeyEvent, click } from '@ember/test-helpers';

function getOptions(list: HTMLElement, selector: string) {
  return [...list.querySelectorAll(selector)];
}

//
// KEYBOARD
//

export async function testListboxKeyboardNavigation(
  assert: Assert,
  elements: {
    target: HTMLElement;
    list: HTMLElement;
  },
  selectors: {
    option: string;
  }
): Promise<void> {
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
): Promise<void> {
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
): Promise<void> {
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

//
// MOUSE
//

export async function testListboxMouseNavigation(
  assert: Assert,
  elements: {
    list: HTMLElement;
  },
  selectors: {
    option: string;
  }
): Promise<void> {
  const { list } = elements;
  const options = getOptions(list, selectors.option);
  const [first, second, last] = options;

  await click(first);
  assert
    .dom(first)
    .hasAria('current', 'true', 'Clicking first option activates it');

  await click(second);
  assert
    .dom(second)
    .hasAria('current', 'true', 'Clicking second option activates it');
  assert
    .dom(first)
    .doesNotHaveAria('current', '... and deactivates first option');

  await click(last);
  assert
    .dom(last)
    .hasAria('current', 'true', 'Clicking last option activates it');
  assert
    .dom(second)
    .doesNotHaveAria('current', '... and deactivates second option');
}

export async function testListboxForMouseSingleSelection(
  assert: Assert,
  elements: {
    target: HTMLElement;
    list: HTMLElement;
  },
  selectors: {
    option: string;
  }
): Promise<void> {
  const { list } = elements;
  const options = getOptions(list, selectors.option);
  const [first, second, last] = options;

  await click(first);
  assert
    .dom(first)
    .hasAria('selected', 'true', 'Clicking first option selects it');

  await click(second);
  assert
    .dom(second)
    .hasAria('selected', 'true', 'Clicking second option selects it');
  assert
    .dom(first)
    .doesNotHaveAria('selected', '... and deselects first option');

  await click(last);
  assert
    .dom(last)
    .hasAria('selected', 'true', 'Clicking last option selects it');
  assert
    .dom(second)
    .doesNotHaveAria('selected', '... and deselects second option');
}

export async function testListboxForMouseMultiSelection(
  assert: Assert,
  elements: {
    target: HTMLElement;
    list: HTMLElement;
  },
  selectors: {
    option: string;
  }
): Promise<void> {
  const { list } = elements;
  const options = getOptions(list, selectors.option);
  const [first, second, last] = options;

  await click(first);
  assert
    .dom(first)
    .hasAria('selected', 'true', 'Clicking first option selects it');

  await click(first, { metaKey: true });
  assert
    .dom(first)
    .doesNotHaveAria('selected', 'Clicking first option deselects it');

  await click(first);
  assert
    .dom(first)
    .hasAria('selected', 'true', 'Clicking first option selects it');

  await click(second, { metaKey: true });
  assert
    .dom(second)
    .hasAria(
      'selected',
      'true',
      'Clicking second option (with meta) selects it'
    );

  assert
    .dom(second)
    .hasAria('selected', 'true', '... and first option still selected');

  await click(last, { metaKey: true });

  assert
    .dom(last)
    .hasAria('selected', 'true', 'Clicking last option (with meta) selects it');
  assert
    .dom(first)
    .hasAria('selected', 'true', '... and first option still selected');
  assert
    .dom(second)
    .hasAria('selected', 'true', '... and second option still selected');

  await click(first, { metaKey: true });

  assert
    .dom(first)
    .doesNotHaveAria(
      'selected',
      'Clicking first option (with meta) deselects it'
    );
  assert
    .dom(second)
    .hasAria('selected', 'true', '... and second option still selected');
  assert
    .dom(last)
    .hasAria('selected', 'true', '... and last option still selected');

  await click(second, { metaKey: true });
  assert
    .dom(second)
    .doesNotHaveAria(
      'selected',
      'Clicking second option (with meta) deselects it'
    );

  await click(last, { metaKey: true });
  assert
    .dom(last)
    .doesNotHaveAria(
      'selected',
      'Clicking last option (with meta) deselects it'
    );

  await click(first);
  assert
    .dom(first)
    .hasAria('selected', 'true', 'Clicking first option selects it');

  await click(last, { shiftKey: true });
  assert
    .dom(last)
    .hasAria(
      'selected',
      'true',
      'Clicking last option (with shift) selects it'
    );

  assert.dom(second).hasAria('selected', 'true', '... and second option, too');
}
