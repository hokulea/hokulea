import { element } from 'ember-element-helper';

import { or } from '../../-private/helpers.ts';
import { pageDestructor, pageElement } from './pages.ts';

import type { TOC } from '@ember/component/template-only';
import type { ComponentLike } from '@glint/template';

interface FocusPageSignature {
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

export const FocusPage: TOC<FocusPageSignature> = <template>
  {{#let (if @element @element (element (pageElement))) as |Element|}}
    <Element class="focus-page" {{pageDestructor}} ...attributes data-test-page>
      {{#if
        (or @title @description (has-block "title") (has-block "description") (has-block "nav"))
      }}
        <header class="page-content">
          <h1 class="typography-display">
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

      <div class="page-content flow" part="content">
        {{#if (has-block "content")}}
          {{yield to="content"}}
        {{else if (has-block)}}
          {{yield}}
        {{/if}}
      </div>
    </Element>
  {{/let}}
</template>;
