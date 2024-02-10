import styles from '@hokulea/core/forms.module.css';

import type { TOC } from '@ember/component/template-only';

export interface DescriptionSignature {
  Element: HTMLParagraphElement;
  Blocks: {
    default: [];
  };
}

const Description: TOC<DescriptionSignature> = <template>
  <p class={{styles.description}} data-test-description ...attributes>
    {{yield}}
  </p>
</template>;

export default Description;
