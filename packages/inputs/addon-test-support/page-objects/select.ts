import { click, getRootElement } from '@ember/test-helpers';

export const SelectPageObject = {
  root: '[data-test-select]',
  trigger: '[data-test-select="trigger"]',
  list: '[data-test-select="list"]',
  option: '[data-test-select="list"] [role="option"]',

  async open() {
    await click(this.trigger);
  },

  async select(text: string) {
    const option = this.findOption(text);

    if (option) {
      await click(option);
    }
  },

  findOption(text: string) {
    return this.getOptions().find(e =>
      e.textContent ? e.textContent.trim().includes(text) : false
    );
  },

  getOptions() {
    return [...getRootElement().querySelectorAll(this.option)];
  }
};
