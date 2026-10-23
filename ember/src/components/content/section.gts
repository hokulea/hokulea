import { assert } from '@ember/debug';

import { element } from 'ember-element-helper';

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

export const Section: TOC<SectionSignature> = <template>
  <section class="section flow" data-test-section ...attributes>
    {{#if @title}}
      <header data-test-section="header" part="header">
        {{#if @title}}
          {{#let (element (elementForLevel @level)) as |Headline|}}
            <Headline data-test-section="title" part="title">{{@title}}</Headline>
          {{/let}}
        {{/if}}
      </header>
    {{/if}}

    {{#if (has-block)}}
      {{yield}}
    {{/if}}
  </section>
</template>;
