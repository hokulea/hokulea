import svgJar from 'ember-svg-jar/helpers/svg-jar';

import styles from '@hokulea/core/icons.module.css';

import type { TOC } from '@ember/component/template-only';

export interface IconSignature {
  Element: HTMLSpanElement;
  Args: {
    icon: string;
  };
}

const Icon: TOC<IconSignature> = <template>
  <span class={{styles.icon}} data-test-icon={{@icon}}>{{svgJar @icon}}</span>
</template>;

export default Icon;
