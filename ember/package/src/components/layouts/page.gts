import { element } from 'ember-element-helper';

// eslint-disable-next-line import-x/no-duplicates
import styles from '@hokulea/core/layouts.module.css';
// eslint-disable-next-line import-x/no-duplicates
import typo from '@hokulea/core/typography.module.css';

import { or } from '../../-private/helpers.ts';
import { pageDestructor, pageElement } from './pages.ts';

import type { TOC } from '@ember/component/template-only';
import type { ComponentLike } from '@glint/template';

interface PageSignature {
  Element: HTMLElement;
  Args: {
    title?: string;
    description?: string;
    element?: ComponentLike<{ Element: HTMLElement; Blocks: { default: [] } }>;
  };
  Blocks: {
    title?: [];
    description?: [];
    content?: [];
    default?: [];
  };
}

export const Page: TOC<PageSignature> = <template>
  {{#let (if @element @element (element (pageElement))) as |Element|}}
    <Element class={{styles.page}} {{pageDestructor}} ...attributes data-test-page>
      {{#if
        (or @title @description (has-block "title") (has-block "description") (has-block "nav"))
      }}
        <header class={{styles.pageContent}}>
          <h1 class={{typo.display}}>
            {{#if (has-block "title")}}
              {{yield to="title"}}
            {{else if @title}}
              {{@title}}
            {{/if}}
          </h1>

          {{#if (or (has-block "description") @description)}}
            <p>
              {{#if (has-block "description")}}
                {{yield to="description"}}
              {{else if @description}}
                {{@description}}
              {{/if}}
            </p>
          {{/if}}
        </header>
      {{/if}}

      <div class="{{styles.pageContent}} {{styles.flow}}" part="content">
        {{#if (has-block "content")}}
          {{yield to="content"}}
        {{else if (has-block)}}
          {{yield}}
        {{/if}}
      </div>
    </Element>
  {{/let}}
</template>;
