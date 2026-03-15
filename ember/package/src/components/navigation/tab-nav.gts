import { hash } from '@ember/helper';

import { NavLink } from './nav-link.gts';

import type { TOC } from '@ember/component/template-only';

export interface TabNavSignature {
  Element: HTMLElement;
  Blocks: {
    default?: [{ Item: typeof NavLink }];
  };
}

export const TabNav: TOC<TabNavSignature> = <template>
  <nav class="tab-nav" data-test-tab-nav ...attributes>
    {{yield (hash Item=NavLink)}}
  </nav>
</template>;
