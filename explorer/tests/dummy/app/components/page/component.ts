import { action } from '@ember/object';
import Component from '@glimmer/component';

export default class PageComponent extends Component {
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
