import Component from '@glimmer/component';

import { modifier } from 'ember-modifier';

import styles from './page.css';

interface PageSignature {
  Args: {
    toc?: string;
  };
}

interface TocItem {
  content: string;
  i: number;
  lvl: number;
  seen: number;
  slug: string;
}

export default class PageComponent extends Component<PageSignature> {
  get toc(): TocItem[] {
    const items = JSON.parse(decodeURIComponent(this.args.toc ? this.args.toc : '[]'));

    return items.length > 1 ? items : [];
  }

  getClassForLevel = (level: number) => {
    return styles[`level-${level}`];
  };

  replaceLinks = modifier((element: HTMLDivElement) => {
    for (const link of [...element.querySelectorAll('a')]) {
      if (link.hash) {
        link.addEventListener('click', (event: Event) => {
          const url = window.location.href;

          window.location.href = link.hash;
          window.history.replaceState(null, '', url);
          event.stopPropagation();
          event.preventDefault();
        });
      }
    }
  });

  <template>
    <div class={{styles.layout}}>
      <article {{this.replaceLinks}} class={{styles.article}}>
        <header class={{styles.header}}>
          <h1>
            {{@title}}
          </h1>

          {{#if this.toc}}
            <nav class={{styles.toc}}>
              {{!-- <a href="#{{@slug}}" style="padding-left: var(--s1)">{{@title}}</a> --}}
              {{#each this.toc as |heading|}}
                <a href='#{{heading.slug}}' class={{this.getClassForLevel heading.lvl}}>
                  {{heading.content}}
                </a>
              {{/each}}
            </nav>
          {{/if}}
        </header>
        {{yield}}
      </article>
    </div>
  </template>
}
