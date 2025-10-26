import { htmlSafe } from '@ember/template';

import styles from '@hokulea/core/graphics.module.css';

import type { TOC } from '@ember/component/template-only';
import type { ComponentLike } from '@glint/template';

export interface IconSignature {
  Element: HTMLSpanElement;
  Args: {
    /**
     * An icon (to be rendered as component)
     *
     * Make sure to use `currentColor` to comply with the styling
     */
    icon: string | ComponentLike;
  };
}

function isString(icon: string | ComponentLike) {
  return typeof icon === 'string';
}

export const Icon: TOC<IconSignature> = <template>
  <span class={{styles.icon}} data-test-icon ...attributes>
    {{#if (isString @icon)}}
      {{htmlSafe @icon}}
    {{else}}
      {{@icon}}
    {{/if}}
  </span>
</template>;
