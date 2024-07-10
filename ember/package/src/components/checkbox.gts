import { on } from '@ember/modifier';

import styles from '@hokulea/core/controls.module.css';

import { pick } from '../-private/helpers';

import type { InputArgs } from './-input';
import type { TOC } from '@ember/component/template-only';

export interface CheckboxSignature {
  Element: HTMLInputElement;
  Args: InputArgs<boolean>;
}

const Checkbox: TOC<CheckboxSignature> = <template>
  <input
    class={{styles.choice}}
    type="checkbox"
    checked={{@value}}
    disabled={{@disabled}}
    data-test-choice
    ...attributes
    {{on "input" (pick "target.checked" @update)}}
  />
</template>;

export default Checkbox;
