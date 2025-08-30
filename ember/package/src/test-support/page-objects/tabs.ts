import { PageObject, selector as sel } from 'fractal-page-object';

import { selectTab } from 'ember-aria-voyager/test-support';

import { TabValue } from '../../components/controls/tabs.gts';

import type { ElementLike } from 'fractal-page-object';

export class TabsPageObject extends PageObject<HTMLDivElement> {
  static SELECTOR = '[data-test-tabs]';

  constructor(selector?: string, parent?: PageObject | ElementLike | null, index?: number | null) {
    super(selector ?? TabsPageObject.SELECTOR, parent, index);
  }

  get control() {
    return this.$tablist.element as HTMLDivElement;
  }

  $tablist = sel<HTMLDivElement>('[role="tablist"]');
  $tab = sel<HTMLButtonElement>('[role="tab"]');
  $tabpanel = sel<HTMLElement>('[role="tabpanel"]');

  async select(value: unknown) {
    // @ts-expect-error this is internal API
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const tab = this.$tab.find((t) => t.element[TabValue] === value);

    if (tab) {
      await selectTab(tab);
    }
  }
}
