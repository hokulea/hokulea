import { on } from '@ember/modifier';

import styles from '@hokulea/core/controls.module.css';

import { pick } from '../-private/helpers.ts';

import type { InputArgs } from './-input.ts';
import type { TOC } from '@ember/component/template-only';

export interface EmailInputSignature {
  Element: HTMLInputElement;
  Args: InputArgs<string>;
}

const EmailInput: TOC<EmailInputSignature> = <template>
  <input
    class={{styles.input}}
    type="email"
    value={{@value}}
    disabled={{@disabled}}
    data-test-input
    ...attributes
    {{on "input" (pick "target.value" @update)}}
  />
</template>;

export default EmailInput;
