import { on } from '@ember/modifier';

import styles from '@hokulea/core/controls.module.css';

import { pick } from '../../-private/helpers.ts';

import type { InputArgs } from './-input.ts';
import type { TOC } from '@ember/component/template-only';

export interface DateInputSignature {
  Element: HTMLInputElement;
  Args: InputArgs<string>;
}

export const DateInput: TOC<DateInputSignature> = <template>
  <input
    class={{styles.input}}
    type="date"
    value={{@value}}
    disabled={{@disabled}}
    data-spacing={{@spacing}}
    data-test-input
    {{on "input" (pick "target.value" @update) capture=true}}
    ...attributes
  />
</template>;
