import Component from '@glimmer/component';
import { assert } from '@ember/debug';

import { element } from 'ember-element-helper';

import { and, asBoolean, not } from '../../-private/helpers.ts';
import disabled from '../../-private/modifiers/disabled.ts';
import { type PushArgs, PushElement } from '../../-private/push.gts';
import { Icon } from '../graphics/icon.gts';
import { isLink } from './-button.ts';

import type { Importance, Intent, Spacing } from '@hokulea/tokens';

export interface IconButtonSignature {
  Element: HTMLButtonElement | HTMLAnchorElement | HTMLSpanElement;
  Args: PushArgs & {
    intent?: Intent;
    importance?: Importance;
    spacing?: Spacing;
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

export class IconButton extends Component<IconButtonSignature> {
  get label() {
    assert(
      'Please provide a `@label` to `<IconButton>` for accessibility reasons.',

      this.args.label !== undefined
    );

    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return this.args.label;
  }

  <template>
    <PushElement
      @push={{@push}}
      @href={{@href}}
      @element={{element "button"}}
      class="icon-button"
      type={{if (and (not (isLink @push)) (not (asBoolean @href))) "button"}}
      data-intent={{if @intent @intent "action"}}
      data-importance={{if @importance @importance "supreme"}}
      data-spacing={{@spacing}}
      aria-label={{this.label}}
      {{disabled when=(if @disabled @disabled false)}}
      data-test-icon-button
      ...attributes
    >
      <Icon @icon={{@icon}} data-test-icon-button="icon" />
    </PushElement>
  </template>
}
