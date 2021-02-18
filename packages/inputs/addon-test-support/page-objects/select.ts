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
    const option = this._findOption(text);

    if (option) {
      await click(option);
    }
  },

  _getOptions() {
    return [...getRootElement().querySelectorAll(this.option)];
  },

  _findOption(text: string) {
    return this._getOptions().find(e => {
      return e.textContent?.trim().indexOf(text) > -1;
    });
  }
};
