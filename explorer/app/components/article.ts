import Component from '@glimmer/component';

import { modifier } from 'ember-modifier';

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
    const items = JSON.parse(decodeURIComponent(this.args.toc ? this.args.toc : '[]')) as TocItem[];

    return items.length > 1 ? items : [];
  }

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
}
