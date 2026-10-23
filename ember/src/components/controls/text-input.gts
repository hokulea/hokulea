import { on } from '@ember/modifier';

import { pick } from '../../-private/helpers.ts';

import type { InputArgs } from './-input.ts';
import type { TOC } from '@ember/component/template-only';

export interface TextInputSignature {
  Element: HTMLInputElement;
  Args: InputArgs<string>;
}

export const TextInput: TOC<TextInputSignature> = <template>
  <input
    class="input"
    type="text"
    value={{@value}}
    disabled={{@disabled}}
    data-spacing={{@spacing}}
    data-test-input
    {{on "input" (pick "target.value" @update) capture=true}}
    ...attributes
  />
</template>;
