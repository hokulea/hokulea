import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

import { modifier } from 'ember-modifier';

import type { GlobalSizingElement } from '../../reference/global-sizing';

export default class GlobalScaleDemoComponent extends Component {
  @tracked version?: 'clamp' | 'static';

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

  // eslint-disable-next-line unicorn/consistent-function-scoping
  link = modifier((elem: GlobalSizingElement) => {
    this.sizingElement = elem;
  });

  @action
  update(): void {
    this.sizingElement?.update();
  }
}
