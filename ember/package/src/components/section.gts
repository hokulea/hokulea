import styles from '@hokulea/core/content.module.css';

import type { TOC } from '@ember/component/template-only';

export interface CardSignature {
  Element: HTMLElement;
  Args: {
    title: string;
  };
  Blocks: {
    default: [];
  };
}

const Card: TOC<CardSignature> = <template>
  <section class={{styles.section}} ...attributes>
    <header>
      <h2>{{@title}}</h2>
    </header>

    {{yield}}
  </section>
</template>

export default Card;
