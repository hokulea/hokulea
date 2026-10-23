import { element } from 'ember-element-helper';

import type { TOC } from '@ember/component/template-only';
import type { ComponentLike } from '@glint/template';

export interface LabelSignature {
  Element: HTMLLabelElement;
  Args: {
    element?: ComponentLike<{ Element: HTMLElement }>;
  };
  Blocks: {
    default: [];
  };
}

export const Label: TOC<LabelSignature> = <template>
  {{#let (if @element @element (element "label")) as |Element|}}
    <Element class="form-label" data-test-label ...attributes>
      {{yield}}
    </Element>
  {{/let}}
</template>;
