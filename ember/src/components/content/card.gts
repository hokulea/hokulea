import { or } from '../../-private/helpers.ts';

import type { TOC } from '@ember/component/template-only';

export interface CardSignature {
  Element: HTMLDivElement;
  Blocks: {
    header?: [];
    footer?: [];
    body?: [];
    default?: [];
  };
}

export const Card: TOC<CardSignature> = <template>
  <div class="card" ...attributes>
    {{#if (has-block "header")}}
      <div part="header">
        {{yield to="header"}}
      </div>
    {{/if}}

    {{#if (or (has-block "body") (has-block))}}
      <div part="body">
        {{#if (has-block "body")}}
          {{yield to="body"}}
        {{else if (has-block)}}
          {{yield}}
        {{/if}}
      </div>
    {{/if}}

    {{#if (has-block "footer")}}
      <div part="footer">
        {{yield to="footer"}}
      </div>
    {{/if}}
  </div>
</template>;
