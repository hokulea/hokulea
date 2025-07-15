import { element } from 'ember-element-helper';

import styles from '@hokulea/core/forms.module.css';

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

const Label: TOC<LabelSignature> = <template>
  {{#let (if @element @element (element "label")) as |Element|}}
    <Element class={{styles.label}} data-test-label ...attributes>
      {{yield}}
    </Element>
  {{/let}}
</template>;

export default Label;
