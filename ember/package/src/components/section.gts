import { assert } from '@ember/debug';

import { element } from 'ember-element-helper';

// eslint-disable-next-line import-x/no-duplicates
import styles from '@hokulea/core/content.module.css';
// eslint-disable-next-line import-x/no-duplicates
import layouts from '@hokulea/core/layouts.module.css';

import type { TOC } from '@ember/component/template-only';

export interface SectionSignature {
  Element: HTMLElement;
  Args: {
    title?: string;
    /**
     * The level of the component, 1-6 as in `<h1>` to `<h6>`
     *
     * @defaultValue 2
     */
    level?: string;
  };
  Blocks: {
    default: [];
  };
}

function elementForLevel(level?: string) {
  const lvl = level ? Number.parseInt(level) : 2;

  assert(`@level for <Section> must be between 1 and 6, received '${lvl}'`, lvl >= 1 && lvl <= 6);

  return `h${lvl}`;
}

const Section: TOC<SectionSignature> = <template>
  <section class="{{styles.section}} {{layouts.flow}}" data-test-section ...attributes>
    {{#if @title}}
      <header data-test-section="header" part="header">
        {{#if @title}}
          {{#let (element (elementForLevel @level)) as |Headline|}}
            <Headline data-test-section="title" class={{styles.sectionTitle}}>{{@title}}</Headline>
          {{/let}}
        {{/if}}
      </header>
    {{/if}}

    {{#if (has-block)}}
      {{yield}}
    {{/if}}
  </section>
</template>;

export default Section;
