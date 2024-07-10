import { on } from '@ember/modifier';

import styles from '@hokulea/core/controls.module.css';

import { pick } from '../-private/helpers';

import type { InputArgs } from './-input';
import type { TOC } from '@ember/component/template-only';

export interface TextAreaSignature {
  Element: HTMLTextAreaElement;
  Args: InputArgs<string>;
}

const TextArea: TOC<TextAreaSignature> = <template>
  <textarea
    class={{styles.textarea}}
    type="text"
    disabled={{@disabled}}
    data-test-textarea
    ...attributes
    {{on "input" (pick "target.value" @update)}}
  >{{@value}}</textarea>
</template>;

export default TextArea;
