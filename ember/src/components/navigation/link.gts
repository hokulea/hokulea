import { on } from '@ember/modifier';

import { link } from 'ember-link';

import { isActive } from '../../-private/push.gts';

import type { TOC } from '@ember/component/template-only';

interface LinkSignature {
  Element: HTMLAnchorElement;
  Args: {
    href: string;
  };
  Blocks: {
    default: [];
  };
}

export const Link: TOC<LinkSignature> = <template>
  {{#let (link @href) as |l|}}
    <a
      href={{l.url}}
      {{on "click" l.open}}
      data-external={{l.isExternal}}
      aria-current="{{if (isActive l) 'page'}}"
      ...attributes
    >
      {{yield}}
    </a>
  {{/let}}
</template>;
