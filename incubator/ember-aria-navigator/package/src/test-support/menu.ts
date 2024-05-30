import { click, getRootElement, triggerEvent, triggerKeyEvent } from '@ember/test-helpers';

import sinon from 'sinon';

import { getItems } from './-private/composite';

type Selectors = {
  trigger: string;
  menu: string;
  item: string;
};

type Elements = {
  trigger: HTMLElement;
  menu: HTMLElement;
};

const DEFAULT_SELECTORS = {
  trigger: 'button',
  menu: '[role="menu"]',
  item: '& > [role="menuitem"]'
};

function setupMenuTest(
  assert: Assert,
  selectors: Partial<Selectors>
): { elements: Elements; selectors: Selectors } {
  const fullSelectors = { ...DEFAULT_SELECTORS, ...selectors };
  const menu = getRootElement().querySelector(selectors.menu as string);
  const trigger = getRootElement().querySelector(selectors.trigger as string);

  assert.dom(menu).exists('Menu exists');

  return {
    elements: {
      trigger: (trigger as HTMLElement | null) ?? (menu as HTMLElement),
      menu: menu as HTMLElement
    },
    selectors: fullSelectors
  };
}

//
// KEYBOARD
//

export async function testMenuKeyboardNavigation(
  assert: Assert,
  selectors: Partial<Selectors> = DEFAULT_SELECTORS
): Promise<void> {
  const { elements, selectors: allSelectors } = setupMenuTest(assert, selectors);
  const { trigger, menu } = elements;

  const shareMenu = getRootElement().querySelectorAll('[role="menu"]').item(1) as HTMLElement;
  const socialMenu = getRootElement().querySelectorAll('[role="menu"]').item(2) as HTMLElement;

  await click(trigger);

  assert.true(menu.matches(':popover-open'), 'Main menu opened');

  const items = getItems(menu, allSelectors.item);
  const [first, second, , fourth] = items;
  const last = items[items.length - 1];

  assert.dom(first).hasAttribute('tabindex', '0', 'First item is activated');

  await triggerKeyEvent(menu, 'keydown', 'ArrowDown');

  assert.dom(second).hasAttribute('tabindex', '0', '`ArrowDown` activates second item');
  assert.dom(first).hasAttribute('tabindex', '-1', '... and deactivates first item');

  await triggerKeyEvent(menu, 'keydown', 'ArrowDown');
  await triggerKeyEvent(menu, 'keydown', 'ArrowDown');

  assert.dom(fourth).hasAttribute('tabindex', '0', '`ArrowDown` 2x activates fourth item');

  // open and close menu with ArrowRight / ArrowLeft

  assert.false(shareMenu.matches(':popover-open'), 'Share menu is closed');

  await triggerKeyEvent(menu, 'keydown', 'ArrowRight');
  assert.true(shareMenu.matches(':popover-open'), '`ArrowRight` opens share menu');

  await triggerKeyEvent(shareMenu, 'keydown', 'ArrowLeft');
  assert.false(shareMenu.matches(':popover-open'), '`ArrowLeft` closes share menu');

  // open sub-submenu and closing all of it
  const shareItems = getItems(shareMenu, allSelectors.item);

  await triggerKeyEvent(menu, 'keydown', 'ArrowRight');
  assert.true(shareMenu.matches(':popover-open'), '`ArrowRight` opens share menu again');

  await triggerKeyEvent(shareMenu, 'keydown', 'ArrowDown');

  assert
    .dom(shareItems[1])
    .hasAttribute('tabindex', '0', '`ArrowDown` moves to the next item in the submenu');

  await triggerKeyEvent(shareMenu, 'keydown', 'ArrowRight');
  assert.true(socialMenu.matches(':popover-open'), '`ArrowRight` opens social menu');

  const socialItems = getItems(socialMenu, allSelectors.item);
  const spy = sinon.spy();

  socialItems[0]?.addEventListener('click', spy, { once: true });

  // await click(socialItems[0] as HTMLElement);
  await triggerKeyEvent(socialMenu, 'keydown', 'Enter');

  assert.true(spy.calledOnce, '`Enter` invokes menu item');

  assert.false(socialMenu.matches(':popover-open'), 'Social menu is closed');
  assert.false(shareMenu.matches(':popover-open'), 'Share menu closed');
  assert.false(menu.matches(':popover-open'), 'Main menu closed');

  // Home + End
  await click(trigger);

  await triggerKeyEvent(menu, 'keydown', 'End');
  assert.dom(last).hasAttribute('tabindex', '0', '`End` activates last item');

  await triggerKeyEvent(menu, 'keydown', 'Home');
  assert.dom(first).hasAttribute('tabindex', '0', '`Home` activates first item');
}

//
// POINTER
//

export async function testMenuPointerNavigation(
  assert: Assert,
  selectors: Partial<Selectors> = DEFAULT_SELECTORS
): Promise<void> {
  const { elements, selectors: allSelectors } = setupMenuTest(assert, selectors);
  const { trigger, menu } = elements;

  const shareMenu = getRootElement().querySelectorAll('[role="menu"]').item(1) as HTMLElement;
  const socialMenu = getRootElement().querySelectorAll('[role="menu"]').item(2) as HTMLElement;

  await click(trigger);

  assert.true(menu.matches(':popover-open'), 'Main menu opened');

  const items = getItems(menu, allSelectors.item);
  const [first, second, , fourth, fifth] = items;

  assert.dom(first).hasAttribute('tabindex', '0', 'First item is activated');

  await triggerEvent(second as HTMLElement, 'pointerover');

  assert.dom(second).hasAttribute('tabindex', '0', '`pointerover` activates second item');
  assert.dom(first).hasAttribute('tabindex', '-1', '... and deactivates first item');

  //   assert.dom(fourth).hasAttribute('tabindex', '0', '`ArrowDown` 2x activates fourth item');

  // open and close menu with Pointerover

  assert.false(shareMenu.matches(':popover-open'), 'Share menu is closed');

  await triggerEvent(fourth as HTMLElement, 'pointerover');
  assert.dom(fourth).hasAttribute('tabindex', '0', '`pointerover` activates fourth item');
  assert.true(shareMenu.matches(':popover-open'), '`pointerover` fourth element opens share menu');

  await triggerEvent(fifth as HTMLElement, 'pointerover');
  assert.dom(fifth).hasAttribute('tabindex', '0', '`pointerover` activates fifth item');
  assert.false(shareMenu.matches(':popover-open'), '`pointerover` fifth element closes share menu');

  // open sub-submenu and closing all of it
  const shareItems = getItems(shareMenu, allSelectors.item);

  await triggerEvent(fourth as HTMLElement, 'pointerover');
  assert.true(
    shareMenu.matches(':popover-open'),
    '`pointerover` fourth element opens share menu again'
  );

  assert.dom(shareItems[0] as HTMLElement).hasAttribute('tabindex', '0', 'first item is active');

  // huh? Why does the second line work, but not the first one?
  // await triggerEvent(shareItems[1] as HTMLElement, 'pointover');
  (shareItems[1] as HTMLElement).dispatchEvent(new Event('pointerover', { bubbles: true }));

  assert
    .dom(shareItems[1] as HTMLElement)
    .hasAttribute('tabindex', '0', '`pointerover` activates second item');

  assert.true(socialMenu.matches(':popover-open'), '... and opens social menu');

  const socialItems = getItems(socialMenu, allSelectors.item);
  const spy = sinon.spy();

  socialItems[0]?.addEventListener('click', spy, { once: true });

  // see: https://github.com/emberjs/ember-test-helpers/issues/267
  await triggerEvent(socialItems[0] as HTMLElement, 'pointerup');
  (socialItems[0] as HTMLElement).click();

  assert.true(spy.calledOnce, '`Enter` invokes menu item');

  assert.false(socialMenu.matches(':popover-open'), 'Social menu is closed');
  assert.false(shareMenu.matches(':popover-open'), 'Share menu closed');
  assert.false(menu.matches(':popover-open'), 'Main menu closed');
}
