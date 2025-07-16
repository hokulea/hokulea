import { htmlSafe } from '@ember/template';

import styles from '@hokulea/core/icons.module.css';

import type { TOC } from '@ember/component/template-only';

export interface IconSignature {
  Element: HTMLSpanElement;
  Args: {
    /**
     * A string containing a `<svg>` element.
     * Make sure to use `currentColor` to comply with the styling
     */
    icon: string;
  };
}

const Icon: TOC<IconSignature> = <template>
  <span class={{styles.icon}} data-test-icon ...attributes>
    {{htmlSafe @icon}}
  </span>
</template>;

export default Icon;
