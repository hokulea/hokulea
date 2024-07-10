import { hash } from '@ember/helper';

import styles from '@hokulea/core/controls.module.css';

import type { TOC } from '@ember/component/template-only';
import type { WithBoundArgs } from '@glint/template';

interface AffixSignature {
  Args: {
    class: string;
    identity: 'prefix' | 'affix' | 'suffix';
  };
  Blocks: {
    default: [];
  };
}

const Affix: TOC<AffixSignature> = <template>
  <span class={{@class}} data-test-input-builder={{@identity}}>{{yield}}</span>
</template>;

export interface InputBuilderSignature {
  Args: {
    disabled?: boolean;
  };
  Blocks: {
    default: [
      {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        Affix: WithBoundArgs<typeof Affix, 'class' | 'identity'>;
        // eslint-disable-next-line @typescript-eslint/naming-convention
        Prefix: WithBoundArgs<typeof Affix, 'class' | 'identity'>;
        // eslint-disable-next-line @typescript-eslint/naming-convention
        Suffix: WithBoundArgs<typeof Affix, 'class' | 'identity'>;
      }
    ];
  };
}

const TextInput: TOC<InputBuilderSignature> = <template>
  {{! template-lint-disable no-unsupported-role-attributes }}
  <span
    class={{styles.inputBuilder}}
    aria-disabled={{if @disabled "true"}}
    data-input-builder
    data-test-input-builder
  >
    {{yield
      (hash
        Prefix=(component Affix class=styles.prefix identity="prefix")
        Affix=(component Affix class=styles.affix identity="affix")
        Suffix=(component Affix class=styles.suffix identity="suffix")
      )
    }}
  </span>
</template>;

export default TextInput;
