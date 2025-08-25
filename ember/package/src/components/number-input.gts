import { on } from '@ember/modifier';

import styles from '@hokulea/core/controls.module.css';

import { pick } from '../-private/helpers.ts';
import { pickAsNumber } from './-input.ts';

import type { InputArgs } from './-input.ts';
import type { TOC } from '@ember/component/template-only';

export interface NumberInputSignature {
  Element: HTMLInputElement;
  Args: InputArgs<number>;
}

const NumberInput: TOC<NumberInputSignature> = <template>
  <input
    class={{styles.input}}
    type="number"
    value={{@value}}
    disabled={{@disabled}}
    data-test-input
    {{on "input" (pick "target.value" (pickAsNumber @update)) capture=true}}
    ...attributes
  />
</template>;

export default NumberInput;
