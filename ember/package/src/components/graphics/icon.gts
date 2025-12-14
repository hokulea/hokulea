import { htmlSafe } from '@ember/template';

import type { TOC } from '@ember/component/template-only';
import type { ComponentLike } from '@glint/template';

export type IconAsset =
  | string
  | ComponentLike<{
      Element: SVGElement;
    }>;

export interface IconSignature {
  Element: HTMLSpanElement;
  Args: {
    /**
     * An icon (to be rendered as component)
     *
     * Make sure to use `currentColor` to comply with the styling
     */
    icon: IconAsset;
  };
}

function isString(icon: IconAsset) {
  return typeof icon === 'string';
}

export const Icon: TOC<IconSignature> = <template>
  <span class="icon" data-test-icon ...attributes>
    {{#if (isString @icon)}}
      {{htmlSafe @icon}}
    {{else}}
      {{@icon}}
    {{/if}}
  </span>
</template>;
