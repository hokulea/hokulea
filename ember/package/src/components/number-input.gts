import { on } from '@ember/modifier';

import styles from '@hokulea/core/controls.module.css';

import { pick } from '../-private/helpers';
import { pickAsNumber } from './-input';

import type { InputArgs } from './-input';
import type { TOC } from '@ember/component/template-only';

export interface NumberInputSignature {
  Element: HTMLInputElement;
  Args: InputArgs<number>;
}

const NumberInput: TOC<NumberInputSignature> = <template>
  <input
    class={{styles.input}}
    type='number'
    value={{@value}}
    disabled={{@disabled}}
    data-test-input
    ...attributes
    {{on 'input' (pick 'target.value' (pickAsNumber @update))}}
  />
</template>;

export default NumberInput;
