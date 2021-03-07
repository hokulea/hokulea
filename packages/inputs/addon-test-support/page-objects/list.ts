import { activateItem, select } from './-private/listbox';

export class ListPageObject {
  static root = '[data-test-list]';
  static option = '[data-test-list] [role="option"]';

  static async select(text: string | string[]) {
    await select(
      { option: ListPageObject.option, list: ListPageObject.root },
      text
    );
  }

  async activateItem(text: string) {
    await activateItem(
      { option: ListPageObject.option, list: ListPageObject.root },
      text
    );
  }
}
