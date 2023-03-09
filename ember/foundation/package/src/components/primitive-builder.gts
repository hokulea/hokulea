import Component from '@glimmer/component';
import type { TOC } from '@ember/component/template-only';

import { hash } from '@ember/helper';
import element from 'ember-element-helper/helpers/element';

import styles from './primitive-builder.css';

interface PrimitiveBuilderSignature<E = HTMLDivElement> {
  Element: E;
  Args: {
    element?: E;
  };
  Blocks: {
    default: [
      {
        /* eslint-disable @typescript-eslint/naming-convention */
        Content: typeof PrimitiveBuilderContent;
        Affix: typeof Affix;
        Prefix: typeof Affix;
        Suffix: typeof Affix;
        /* eslint-enable @typescript-eslint/naming-convention */
        // contentClass: string;
        // affixClass: string;
        // prefixClass: string;
        // suffixClass: string;
      }
    ];
  };
}

const Affix: TOC<{
  Element: HTMLSpanElement;
  Args: {
    class: string;
  };
  Blocks: {
    default: [];
  };
}> = <template>
  <span class={{styles.affix}} class={{@class}} ...attributes>
    {{yield}}
  </span>
</template>;

const Content: TOC<{
  Element: HTMLSpanElement;
  Blocks: {
    default: [];
  };
}> = <template><span class={{styles.content}} ...attributes>{{yield}}</span></template>;

const PrimitiveBuilder: TOC<PrimitiveBuilderSignature> = <template>
  {{#let (if @element @element (element "div")) as |Tag|}}
    <Tag class={{styles.primitiveBuilder}} ...attributes>
      {{yield
        (hash
          Content=PrimitiveBuilderContent
          Affix=Affix
          Prefix=(component Affix class=styles.prefix)
          Suffix=(component Affix class=styles.suffix)
        )
      }}
    </Tag>
  {{/let}}
</template>;

export default PrimitiveBuilder;
