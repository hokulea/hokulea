import Component from '@glimmer/component';
import { assert } from '@ember/debug';

import { element } from 'ember-element-helper';

import { and, asBoolean, not } from '../../-private/helpers.ts';
import disabled from '../../-private/modifiers/disabled.ts';
import { type PushArgs, PushElement } from '../../-private/push.gts';
import { Icon } from '../graphics/icon.gts';
import {
  type ButtonArgs,
  type IconButtonArgs,
  isLink,
  type PressedButtonArgs,
  pushOrToggle,
  type ToggleFn
} from './-button.ts';

import type { CommandAction } from 'ember-command';
import type { Simplify } from 'type-fest';

export interface IconButtonSignature {
  Element: HTMLButtonElement | HTMLAnchorElement | HTMLSpanElement;
  Args: Simplify<
    Omit<PushArgs, 'push'> &
      Omit<PressedButtonArgs, 'push'> &
      ButtonArgs & {
        push?: ToggleFn | CommandAction;
      } & IconButtonArgs
  >;
  Blocks: {
    default: [];
  };
}

export class IconButton extends Component<IconButtonSignature> {
  get label() {
    assert(
      'Please provide a `@label` to `<IconButton>` for accessibility reasons.',

      // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
      this.args.label !== undefined
    );

    return this.args.label;
  }

  <template>
    <PushElement
      @push={{pushOrToggle @push @pressed}}
      @href={{@href}}
      @element={{element "button"}}
      class="icon-button"
      type={{if (and (not (isLink @push)) (not (asBoolean @href))) "button"}}
      aria-pressed={{if @pressed (if @pressed "true" "false")}}
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
