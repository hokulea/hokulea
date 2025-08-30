import { on } from '@ember/modifier';

import styles from '@hokulea/core/controls.module.css';

import { pick } from '../../-private/helpers.ts';

import type { InputArgs } from './-input.ts';
import type { TOC } from '@ember/component/template-only';

export interface TextAreaSignature {
  Element: HTMLTextAreaElement;
  Args: InputArgs<string>;
}

export const TextArea: TOC<TextAreaSignature> = <template>
  <textarea
    class={{styles.textarea}}
    type="text"
    disabled={{@disabled}}
    data-test-textarea
    {{on "input" (pick "target.value" @update) capture=true}}
    ...attributes
  >{{@value}}</textarea>
</template>;
