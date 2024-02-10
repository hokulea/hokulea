import Component from '@glimmer/component';
import { assert } from '@ember/debug';
import { inject as service } from '@ember/service';

import styles from '@hokulea/core/icons.module.css';
import { StyleName, STYLES } from '@hokulea/icons';

import type HokouleaIconLoaderService from '../services/hokulea/icon-loader';
import type { IconName, IconNames, StyleNames } from '@hokulea/icons';

export interface IconSignature {
  Element: HTMLSpanElement;
  Args: {
    /** Name of the icon */
    icon: IconName | IconNames;
    style?: StyleName | StyleNames;
  };
}

export default class Icon extends Component<IconSignature> {
  @service('hokulea/icon-loader') declare iconLoader: HokuleaIconLoaderService;

  get style(): StyleNames {
    return this.args.style ?? StyleName.Regular;
  }

  get id(): string {
    assert(
      `Icon '${this.args.icon}' with '${this.style}' style does not exist.`,
      STYLES[this.style].includes(this.args.icon as IconName)
    );

    return this.iconLoader.getId(this.args.icon, this.style as StyleName);
  }

  <template>
    <span
      class={{styles.icon}}
      data-test-icon
      data-test-name={{@icon}}
      data-test-style={{this.style}}
      ...attributes
    >
      <svg xmlns='http://www.w3.org/2000/svg'>
        {{#if this.id}}
          <use xlink:href='#{{this.id}}' />
        {{/if}}
      </svg>
    </span>
  </template>
}
