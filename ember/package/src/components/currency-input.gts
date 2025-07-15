import { on } from '@ember/modifier';

import styles from '@hokulea/core/controls.module.css';

import { pick } from '../-private/helpers.ts';
import { pickAsNumber } from './-input.ts';
import InputBuilder from './input-builder.gts';

import type { InputArgs } from './-input.ts';
import type { TOC } from '@ember/component/template-only';

export interface CurrencyInputSignature {
  Element: HTMLInputElement;
  Args: InputArgs<number>;
}

const CurrencyInput: TOC<CurrencyInputSignature> = <template>
  <InputBuilder @disabled={{@disabled}} as |b|>
    <input
      class="{{styles.input}} {{styles.currency}}"
      type="text"
      inputmode="decimal"
      value={{@value}}
      disabled={{@disabled}}
      data-test-input
      ...attributes
      {{on "input" (pick "target.value" (pickAsNumber @update))}}
    />
    <b.Affix>€</b.Affix>
  </InputBuilder>
</template>;

export default CurrencyInput;
