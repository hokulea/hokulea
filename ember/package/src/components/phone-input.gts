import { on } from '@ember/modifier';

import styles from '@hokulea/core/controls.module.css';

import { pick } from '../-private/helpers';

import type { InputArgs } from './-input';
import type { TOC } from '@ember/component/template-only';

export interface PhoneInputSignature {
  Element: HTMLInputElement;
  Args: InputArgs<string>;
}

const PhoneInput: TOC<PhoneInputSignature> = <template>
  <input
    class={{styles.input}}
    type="tel"
    value={{@value}}
    disabled={{@disabled}}
    data-test-input
    ...attributes
    {{on "input" (pick "target.value" @update)}}
  />
</template>;

export default PhoneInput;
