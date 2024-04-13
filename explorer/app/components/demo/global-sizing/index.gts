import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

import { modifier } from 'ember-modifier';
import { eq } from 'ember-truth-helpers';

import { Button } from '@hokulea/ember';

import GlobalSizingReference from '../../reference/global-sizing';

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

  link = modifier((elem: GlobalSizingElement) => {
    this.sizingElement = elem;

    return () => {
      this.sizingElement = undefined;
    };
  });

  @action
  update(): void {
    this.sizingElement?.update();
  }

  <template>
    <p>
      This demo allows you to control the
      <code>font-size</code>
      of
      <code>:root</code>, so you can experience its effect.
    </p>

    <p>
      <Button @importance='subtle' @push={{this.reset}} @spacing='-1'>Reset</Button>
      <Button
        @importance={{if (eq this.version 'clamp') 'supreme' 'subtle'}}
        @spacing='-1'
        @push={{this.useClamp}}
      >
        clamp(16px, calc(0.5vw + 1em * 0.8), 18px)
      </Button>
      <Button
        @importance={{if (eq this.version 'static') 'supreme' 'subtle'}}
        @spacing='-1'
        @push={{this.useStatic}}
      >
        12px
      </Button>
    </p>

    <GlobalSizingReference {{this.link}} />
  </template>
}
