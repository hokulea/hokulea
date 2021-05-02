import { registerDestructor } from '@ember/destroyable';
import { action } from '@ember/object';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

export type TokenCategory = 'color' | 'numeric';

export interface TokenArgs {
  name: string;
  category: TokenCategory;
}

const BODY_STYLES = window.getComputedStyle(document.body);

export default class TokenComponent extends Component<TokenArgs> {
  private content?: HTMLElement;
  private mutationObserver: MutationObserver;
  @tracked computed?: string;

  constructor(owner: unknown, args: TokenArgs) {
    super(owner, args);

    window.addEventListener('resize', this.update);
    this.mutationObserver = new window.MutationObserver(this.update);

    registerDestructor(this, () => {
      window.removeEventListener('resize', this.update);
      this.mutationObserver.disconnect();
    });
  }

  @action
  setupContent(element: HTMLElement): void {
    this.content = element;
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

  get property(): string {
    return BODY_STYLES.getPropertyValue(this.args.name);
  }

  get value(): string {
    return this.computed ?? this.property;
  }

  @action
  private update() {
    this.computed = this.compute();
  }

  private compute(): string | undefined {
    if (this.args.category === 'numeric') {
      const width = this.content?.getBoundingClientRect().width;
      return width ? `${width.toFixed(2)}px` : undefined;
    }

    // eslint-disable-next-line no-useless-return
    return;
  }
}
