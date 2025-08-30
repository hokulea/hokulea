import styles from '@hokulea/core/windows.module.css';

import type { TOC } from '@ember/component/template-only';

export interface PopoverSignature {
  Element: HTMLDivElement;
  Blocks: {
    default: [];
  };
}

export const Popover: TOC<PopoverSignature> = <template>
  <div class={{styles.popover}} data-test-popover ...attributes>
    {{yield}}
  </div>
</template>;
