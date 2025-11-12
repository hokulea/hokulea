import { on } from '@ember/modifier';

import { pick } from '../../-private/helpers.ts';

import type { InputArgs } from './-input.ts';
import type { TOC } from '@ember/component/template-only';

export interface TextAreaSignature {
  Element: HTMLTextAreaElement;
  Args: InputArgs<string>;
}

export const TextArea: TOC<TextAreaSignature> = <template>
  <textarea
    class="textarea"
    disabled={{@disabled}}
    data-spacing={{@spacing}}
    data-test-textarea
    {{on "input" (pick "target.value" @update) capture=true}}
    ...attributes
  >{{@value}}</textarea>
</template>;
