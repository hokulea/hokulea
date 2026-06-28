import { ariaGroup } from 'ember-aria-voyager';

import type { TOC } from '@ember/component/template-only';

type ButtonGroupSignature = {
  Element: HTMLDivElement;
  Args: {
    disabled?: boolean;
  };
  Blocks: {
    default: [];
  };
};

const ButtonGroup: TOC<ButtonGroupSignature> = <template>
  <div class="button-group" data-test-button-group {{ariaGroup disabled=@disabled}}>
    {{yield}}
  </div>
</template>;

export { ButtonGroup };
