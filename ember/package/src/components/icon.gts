import Component from '@glimmer/component';
import { cached } from '@glimmer/tracking';
import { dependencySatisfies, importSync, macroCondition } from '@embroider/macros';

import { icons } from '@phosphor-icons/core';
import { pascalCase } from 'change-case';
import * as phIcons from 'ember-phosphor-icons';

import styles from '@hokulea/core/icons.module.css';

import type PhIcon from 'ember-phosphor-icons/ph-icon';
import type SvgJarHelper from 'ember-svg-jar/helpers/svg-jar';

const svgJar = macroCondition(dependencySatisfies('ember-svg-jar', '*'))
  ? (importSync('ember-svg-jar/helpers/svg-jar') as { default: typeof SvgJarHelper }).default
  : undefined;

export interface IconSignature {
  Element: HTMLSpanElement;
  Args: {
    icon: string;

    /**
     * @defaultValue regular
     */
    style?: 'thin' | 'light' | 'regular' | 'bold' | 'fill' | 'duotone';
  };
}

export default class Icon extends Component<IconSignature> {
  @cached
  get phosphorIcon() {
    return icons.find((entry) => entry.name === this.args.icon);
  }

  get PhIcon(): typeof PhIcon {
    const icon = `Ph${pascalCase(this.args.icon)}`;

    // @ts-expect-error no index signature is given but we are ok with this
    // eslint-disable-next-line import-x/namespace
    return phIcons[icon] as typeof PhIcon;
  }

  get style() {
    return this.phosphorIcon ? this.args.style ?? 'regular' : svgJar ? 'custom' : '';
  }

  <template>
    <span
      class={{styles.icon}}
      data-test-icon={{@icon}}
      data-test-icon-style={{this.style}}
      ...attributes
    >
      {{#if this.phosphorIcon}}
        <this.PhIcon @weight={{@style}} />
      {{else if svgJar}}
        {{svgJar @icon}}
      {{/if}}
    </span>
  </template>
}
