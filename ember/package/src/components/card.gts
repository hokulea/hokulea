import styles from '@hokulea/core/content.module.css';

import { or } from '../-private/helpers';
import Box from './box';

import type { TOC } from '@ember/component/template-only';

export interface CardSignature {
  Element: HTMLDivElement; // ElementFor<BaseCard>
  Blocks: {
    header?: [];
    footer?: [];
    body?: [];
    default?: [];
  };
}

const Card: TOC<CardSignature> = <template>
  <Box class={{styles.card}} ...attributes>
    {{#if (has-block "header")}}
      <div class={{styles.header}}>
        {{yield to="header"}}
      </div>
    {{/if}}

    {{#if (or (has-block "body") (has-block "default"))}}
      <div class={{styles.body}}>
        {{#if (has-block "body")}}
          {{yield to="body"}}
        {{else if (has-block "default")}}
          {{yield}}
        {{/if}}
      </div>
    {{/if}}

    {{#if (has-block "footer")}}
      <div class={{styles.footer}}>
        {{yield to="footer"}}
      </div>
    {{/if}}
  </Box>
</template>

export default Card;
