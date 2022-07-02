import { registerDestructor } from '@ember/destroyable';
import { action } from '@ember/object';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

export interface GlobalSizingElement extends HTMLElement {
  update: () => void;
}

export default class GlobalScaleDemoComponent extends Component {
  @tracked fontSize!: string;
  @tracked viewportWidth!: number;

  @action
  setup(element: GlobalSizingElement): void {
    // "public" API:
    // eslint-disable-next-line no-param-reassign
    element.update = () => {
      this.update();
    };

    // listen for changes
    window.addEventListener('resize', this.update);
    const mutationObserver = new window.MutationObserver(this.update);

    registerDestructor(this, () => {
      window.removeEventListener('resize', this.update);
      mutationObserver.disconnect();
    });

    let elem = element as HTMLElement;
    do {
      mutationObserver.observe(elem, {
        attributes: true,
        attributeFilter: ['style', 'class']
      });
      elem = elem.parentElement as HTMLElement; // booh!
    } while (elem);

    // first run
    this.update();
  }

  @action
  private update() {
    this.viewportWidth = window.innerWidth;
    this.fontSize = window
      .getComputedStyle(document.documentElement)
      .getPropertyValue('font-size');
  }
}
