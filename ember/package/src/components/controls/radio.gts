import { on } from '@ember/modifier';

import { pick } from '../../-private/helpers.ts';

import type { InputArgs } from './-input.ts';
import type { TOC } from '@ember/component/template-only';

export interface RadioSignature {
  Element: HTMLInputElement;
  Args: InputArgs<boolean>;
}

export const Radio: TOC<RadioSignature> = <template>
  <input
    class="input"
    type="radio"
    checked={{@value}}
    disabled={{@disabled}}
    data-spacing={{@spacing}}
    data-test-choice
    {{on "input" (pick "target.checked" @update) capture=true}}
    ...attributes
  />
</template>;
