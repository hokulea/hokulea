import styles from '@hokulea/core/content.module.css';

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
  <div class={{styles.card}} ...attributes>
    {{#if (has-block "header")}}
      <div class={{styles.header}} part="header">
        {{yield to="header"}}
      </div>
    {{/if}}

    {{#if (or (has-block "body") (has-block))}}
      <div class={{styles.body}} part="body">
        {{#if (has-block "body")}}
          {{yield to="body"}}
        {{else if (has-block)}}
          {{yield}}
        {{/if}}
      </div>
    {{/if}}

    {{#if (has-block "footer")}}
      <div class={{styles.footer}} part="footer">
        {{yield to="footer"}}
      </div>
    {{/if}}
  </div>
</template>;
