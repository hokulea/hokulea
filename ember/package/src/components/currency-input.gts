import { on } from '@ember/modifier';

import styles from '@hokulea/core/controls.module.css';

import { pick } from '../-private/helpers';
import { pickAsNumber } from './-input';
import InputBuilder from './input-builder';

import type { InputArgs } from './-input';
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
