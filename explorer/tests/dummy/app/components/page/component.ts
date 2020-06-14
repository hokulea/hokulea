import { action } from '@ember/object';
import Component from '@glimmer/component';

interface PageArgs {
  toc?: string;
}

interface TocItem {
  content: string;
  i: number;
  lvl: number;
  seen: number;
  slug: string;
}

export default class PageComponent extends Component<PageArgs> {
  get toc(): TocItem[] {
    return JSON.parse(decodeURIComponent(this.args.toc ? this.args.toc : '[]'));
  }

  @action
  setup(element: HTMLDivElement) {
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
  }
}
