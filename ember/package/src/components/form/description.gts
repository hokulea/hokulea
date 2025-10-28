import type { TOC } from '@ember/component/template-only';

export interface DescriptionSignature {
  Element: HTMLParagraphElement;
  Blocks: {
    default: [];
  };
}

export const Description: TOC<DescriptionSignature> = <template>
  <p class="form-description" data-test-description ...attributes>
    {{yield}}
  </p>
</template>;
