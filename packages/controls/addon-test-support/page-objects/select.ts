import { click, getRootElement } from '@ember/test-helpers';

import { activateItem, select } from './-private/listbox';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const SelectPageObject = {
  root: '[data-test-select]',
  trigger: '[data-test-select="trigger"]',
  list: '[data-test-select="list"]',
  option: '[data-test-select="list"] [role="option"]',

  async select(text: string | string[]) {
    await select({ option: this.option, list: this.list }, text);
  },

  async activateItem(text: string) {
    await activateItem({ option: this.option, list: this.list }, text);
  },

  async open() {
    if (!this.isOpen()) {
      await click(this.trigger);
    }
  },

  isOpen() {
    return (
      getRootElement()
        .querySelector(this.trigger)
        ?.getAttribute('aria-expanded') === 'true'
    );
  }
};
