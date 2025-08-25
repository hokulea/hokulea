import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { registerDestructor } from '@ember/destroyable';
import { on } from '@ember/modifier';
import { next } from '@ember/runloop';
import { service } from '@ember/service';

import { element } from 'ember-element-helper';

// eslint-disable-next-line import-x/no-duplicates
import styles from '@hokulea/core/layouts.module.css';
// eslint-disable-next-line import-x/no-duplicates
import typo from '@hokulea/core/typography.module.css';

import { or } from '../-private/helpers.ts';

import type { TOC } from '@ember/component/template-only';
import type Owner from '@ember/owner';
import type HokuleaService from '#src/services/-hokulea.ts';
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
  @service('-hokulea') declare hokulea: HokuleaService;

  /* the level for _THIS_ page */
  @tracked pageLevel = 0;

  get rootPage() {
    return this.pageLevel === 1;
  }

  constructor(owner: Owner, args: PageSignature['Args']) {
    super(owner, args);

    // eslint-disable-next-line ember/no-runloop
    next(() => {
      this.hokulea.pageLevel += 1;
      this.pageLevel = this.hokulea.pageLevel;
    });

    registerDestructor(this, () => {
      this.hokulea.pageLevel -= 1;
    });
  }

  <template>
    {{#let (element (if this.rootPage "main" "section")) as |Element|}}
      <Element class={{styles.page}} ...attributes data-test-page>
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
          {{#if (has-block "content")}}
            {{yield to="content"}}
          {{else if (has-block)}}
            {{yield}}
          {{/if}}
        </div>
      </Element>
    {{/let}}
  </template>
}

export default Page;
