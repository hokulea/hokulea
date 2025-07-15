import Component from '@glimmer/component';
import { on } from '@ember/modifier';

import { element } from 'ember-element-helper';
import { consume, provide } from 'ember-provide-consume-context';

// eslint-disable-next-line import-x/no-duplicates
import styles from '@hokulea/core/layouts.module.css';
// eslint-disable-next-line import-x/no-duplicates
import typo from '@hokulea/core/typography.module.css';

import { or } from '../-private/helpers.ts';

import type { TOC } from '@ember/component/template-only';
import type { Link } from 'ember-link';

interface NavLinkSignature {
  Args: {
    link: Link;
  };
  Blocks: {
    default: [];
  };
}

const NavLink: TOC<NavLinkSignature> = <template>
  <a href={{@link.url}} {{on "click" @link.open}} aria-current={{if @link.isActive "page"}}>
    <span>
      {{yield}}
    </span>
  </a>
</template>;

class PageElement extends Component<{ Element: HTMLElement; Blocks: { default: [] } }> {
  @consume('page-root') declare useMain: boolean;

  @provide('page-inside')
  // eslint-disable-next-line @typescript-eslint/class-literal-property-style
  get pageInside() {
    return true;
  }

  <template>
    {{#let (element (if this.useMain "main" "section")) as |Element|}}
      <Element ...attributes>
        {{yield}}
      </Element>
    {{/let}}
  </template>
}

interface PageSignature {
  Element: HTMLElement;
  Args: {
    title?: string;
    description?: string;
  };
  Blocks: {
    title?: [];
    description?: [];
    nav?: [typeof NavLink];
    content?: [];
    default?: [];
  };
}

class Page extends Component<PageSignature> {
  @consume('page-inside') declare insidePage: boolean;

  @provide('page-root')
  get rootPage() {
    return this.insidePage ? false : true;
  }

  <template>
    <PageElement class={{styles.page}} ...attributes data-test-page>
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

          {{#if (has-block "nav")}}
            <nav>
              {{yield NavLink to="nav"}}
            </nav>
          {{/if}}
        </header>
      {{/if}}

      <div class="{{styles.pageContent}} {{styles.flow}}" part="content">
        {{yield to="content"}}
        {{yield}}
      </div>
    </PageElement>
  </template>
}

export default Page;
