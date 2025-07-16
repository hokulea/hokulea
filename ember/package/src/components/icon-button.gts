import Component from '@glimmer/component';
import { assert } from '@ember/debug';

import CommandElement from 'ember-command/components/command-element';
import { element } from 'ember-element-helper';

import styles from '@hokulea/core/actions.module.css';

import { not } from '../-private/helpers.ts';
import disabled from '../-private/modifiers/disabled.ts';
import { isLink } from './-button.ts';
import Icon from './icon.gts';

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
    /**
     * A string containing a `<svg>` element.
     * Make sure to use `currentColor` to comply with the styling
     */
    icon: string;
  };
  Blocks: {
    default: [];
  };
}

export default class IconButton extends Component<IconButtonSignature> {
  get label() {
    assert(
      'Please provide a `@label` to `<IconButton>` for accessibility reasons.',
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
      this.args.label !== undefined
    );

    return this.args.label;
  }

  <template>
    <CommandElement
      @element={{element "button"}}
      @command={{@push}}
      class="{{styles.iconButton}}"
      type={{if (not (isLink @push)) "button"}}
      data-intent={{if @intent @intent "action"}}
      data-importance={{if @importance @importance "supreme"}}
      data-spacing={{@spacing}}
      aria-label={{this.label}}
      {{disabled when=(if @disabled @disabled false)}}
      data-test-icon-button
      ...attributes
    >
      <Icon @icon={{@icon}} data-test-icon-button="icon" />
    </CommandElement>
  </template>
}
