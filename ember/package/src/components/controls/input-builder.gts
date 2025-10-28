import { hash } from '@ember/helper';

import type { ShapeArgs } from '../../-private/shapes.ts';
import type { TOC } from '@ember/component/template-only';
import type { WithBoundArgs } from '@glint/template';

interface AffixSignature {
  Args: {
    identity: 'prefix' | 'affix' | 'suffix';
  };
  Blocks: {
    default: [];
  };
}

const Affix: TOC<AffixSignature> = <template>
  <span class="input-{{@identity}}" data-test-input-builder={{@identity}}>{{yield}}</span>
</template>;

export interface InputBuilderSignature {
  Args: ShapeArgs & {
    disabled?: boolean;
  };
  Blocks: {
    default: [
      {
        Affix: WithBoundArgs<typeof Affix, 'identity'>;
        Prefix: WithBoundArgs<typeof Affix, 'identity'>;
        Suffix: WithBoundArgs<typeof Affix, 'identity'>;
      }
    ];
  };
}

export const InputBuilder: TOC<InputBuilderSignature> = <template>
  {{! template-lint-disable no-unsupported-role-attributes }}
  <span
    class="input-builder"
    aria-disabled={{if @disabled "true"}}
    data-spacing={{@spacing}}
    data-input-builder
    data-test-input-builder
  >
    {{yield
      (hash
        Prefix=(component Affix identity="prefix")
        Affix=(component Affix identity="affix")
        Suffix=(component Affix identity="suffix")
      )
    }}
  </span>
</template>;
