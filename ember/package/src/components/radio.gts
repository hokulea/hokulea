import { on } from '@ember/modifier';

import styles from '@hokulea/core/controls.module.css';

import { pick } from '../-private/helpers.ts';

import type { InputArgs } from './-input.ts';
import type { TOC } from '@ember/component/template-only';

export interface RadioSignature {
  Element: HTMLInputElement;
  Args: InputArgs<boolean>;
}

const Radio: TOC<RadioSignature> = <template>
  <input
    class={{styles.choice}}
    type="radio"
    checked={{@value}}
    disabled={{@disabled}}
    data-test-choice
    {{on "input" (pick "target.checked" @update) capture=true}}
    ...attributes
  />
</template>;

export default Radio;
