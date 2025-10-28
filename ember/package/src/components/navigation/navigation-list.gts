import { hash } from '@ember/helper';

import { NavLink } from './nav-link.gts';

import type { TOC } from '@ember/component/template-only';

const Title: TOC<{ Blocks: { default: [] } }> = <template>
  <span part="title">{{yield}}</span>
</template>;

export interface NavigationListSignature {
  Element: HTMLElement;
  Blocks: {
    default?: [{ Item: typeof NavLink; Title: typeof Title }];
  };
}

export const NavigationList: TOC<NavigationListSignature> = <template>
  <nav class="navigation-list" data-test-navigation-list ...attributes>
    {{yield (hash Item=NavLink Title=Title)}}
  </nav>
</template>;
