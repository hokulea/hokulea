import { registerDestructor } from '@ember/destroyable';
import { action } from '@ember/object';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

export default class GlobalScaleDemoComponent extends Component {
  private mutationObserver: MutationObserver;

  @tracked fontSize!: string;
  @tracked viewportWidth!: number;
  @tracked version?: 'clamp' | 'static';

  constructor(owner: unknown, args: Record<string, unknown>) {
    super(owner, args);

    this.update();
    window.addEventListener('resize', this.update);
    this.mutationObserver = new window.MutationObserver(this.update);

    registerDestructor(this, () => {
      window.removeEventListener('resize', this.update);
      this.mutationObserver.disconnect();
    });
  }

  @action
  setupContent(element: HTMLElement): void {
    this.update();

    let elem = element;

    do {
      this.mutationObserver.observe(elem, {
        attributes: true,
        attributeFilter: ['style', 'class']
      });
      elem = elem.parentElement as HTMLElement; // booh!
    } while (elem);
  }

  @action
  useStatic(): void {
    this.reset();
    document.documentElement.classList.add('demo-global-scale-static-12');
    this.version = 'static';
    this.update();
  }

  @action
  useClamp(): void {
    this.reset();
    document.documentElement.classList.add('demo-global-scale-minmax');
    this.version = 'clamp';
    this.update();
  }

  @action
  reset(): void {
    this.version = undefined;
    document.documentElement.classList.remove(
      'demo-global-scale-static-12',
      'demo-global-scale-minmax'
    );
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
