import { on } from '@ember/modifier';

import styles from '@hokulea/core/controls.module.css';

import { pick } from '../-private/helpers';

import type { InputArgs } from './-input';
import type { TOC } from '@ember/component/template-only';

export interface RadioSignature {
  Element: HTMLInputElement;
  Args: InputArgs<boolean>;
}

const Radio: TOC<RadioSignature> = <template>
  <input
    class={{styles.choice}}
    type='radio'
    checked={{@value}}
    disabled={{@disabled}}
    data-test-choice
    ...attributes
    {{on 'input' (pick 'target.checked' @update)}}
  />
</template>;

export default Radio;
