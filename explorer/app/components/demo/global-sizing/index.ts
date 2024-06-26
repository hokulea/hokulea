import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

import { modifier } from 'ember-modifier';

import type { GlobalSizingElement } from '../../reference/global-sizing';

export default class GlobalScaleDemoComponent extends Component {
  @tracked version?: 'clamp' | 'static';
  // eslint-disable-next-line @typescript-eslint/naming-convention
  private sizingElement?: GlobalSizingElement;

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

  link = modifier((elem: GlobalSizingElement) => {
    this.sizingElement = elem;
  });

  @action
  update(): void {
    this.sizingElement?.update();
  }
}
