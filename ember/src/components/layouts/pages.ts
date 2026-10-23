import Helper from '@ember/component/helper';
import { registerDestructor } from '@ember/destroyable';
import { service } from '@ember/service';

import Modifier from 'ember-modifier';

import type HokuleaService from '../../services/-hokulea';

class PageElement extends Helper<{ Return: 'main' | 'section' }> {
  @service('-hokulea') declare hokulea: HokuleaService;

  compute(): 'main' | 'section' {
    const element = this.hokulea.pageLevel === 0 ? 'main' : 'section';

    this.hokulea.pageLevel++;

    return element;
  }
}

class PageDestructor extends Modifier {
  @service('-hokulea') declare hokulea: HokuleaService;

  modify(): void {
    registerDestructor(this, () => {
      this.hokulea.pageLevel--;
    });
  }
}

export { PageDestructor as pageDestructor, PageElement as pageElement };
