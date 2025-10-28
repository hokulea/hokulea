import { on } from '@ember/modifier';

import { pick } from '../../-private/helpers.ts';

import type { InputArgs } from './-input.ts';
import type { TOC } from '@ember/component/template-only';

export interface CheckboxSignature {
  Element: HTMLInputElement;
  Args: InputArgs<boolean>;
}

export const Checkbox: TOC<CheckboxSignature> = <template>
  <input
    class="input"
    type="checkbox"
    checked={{@value}}
    disabled={{@disabled}}
    data-test-choice
    {{on "input" (pick "target.checked" @update) capture=true}}
    ...attributes
  />
</template>;
