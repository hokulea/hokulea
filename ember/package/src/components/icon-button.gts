import Component from '@glimmer/component';
import { assert } from '@ember/debug';

import CommandElement from 'ember-command/components/command-element';

import styles from '@hokulea/core/actions.module.css';

import disabled from '../-private/modifiers/disabled';
import Icon from './icon';

import type { Importance, Importances, Intent, Intents, Spacing, Spacings } from '@hokulea/tokens';
import type { CommandAction } from 'ember-command';

export interface IconButtonSignature {
  Element: HTMLButtonElement | HTMLAnchorElement | HTMLSpanElement;
  Args: {
    push?: CommandAction;
    intent?: Intent | Intents;
    importance?: Importance | Importances;
    spacing?: Spacing | Spacings;
    disabled?: boolean;
    label: string;
    /** The name of the icon */
    icon: string;
    /**
     * @defaultValue regular
     */
    iconStyle?: 'thin' | 'light' | 'regular' | 'bold' | 'fill' | 'duotone';
  };
  Blocks: {
    default: [];
  };
}

export default class IconButton extends Component<IconButtonSignature> {
  get label() {
    assert(
      'Please provide a `@label` to `<IconButton>` for accessibility reasons.',
      this.args.label !== undefined
    );

    return this.args.label;
  }

  <template>
    <CommandElement
      @command={{@push}}
      class="{{styles.iconButton}}"
      data-intent={{if @intent @intent "action"}}
      data-importance={{if @importance @importance "supreme"}}
      data-spacing={{@spacing}}
      aria-label={{this.label}}
      {{disabled when=(if @disabled @disabled false)}}
      data-test-icon-button
      ...attributes
    >
      <Icon @icon={{@icon}} @style={{@iconStyle}} data-test-icon-button="icon" />
    </CommandElement>
  </template>
}
