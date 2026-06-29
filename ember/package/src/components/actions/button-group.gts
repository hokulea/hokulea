import { ariaGroup } from 'ember-aria-voyager';

import type { TOC } from '@ember/component/template-only';

type ButtonGroupSignature = {
  Element: HTMLDivElement;
  Blocks: {
    default: [];
  };
};

const ButtonGroup: TOC<ButtonGroupSignature> = <template>
  <div class="button-group" data-test-button-group {{ariaGroup}}>
    {{yield}}
  </div>
</template>;

export { ButtonGroup };
