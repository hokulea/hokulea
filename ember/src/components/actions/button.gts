import { element } from 'ember-element-helper';

import { and, asBoolean, not } from '../../-private/helpers.ts';
import disabled from '../../-private/modifiers/disabled.ts';
import { type PushArgs, PushElement } from '../../-private/push.gts';
import {
  type ButtonArgs,
  type ButtonBlocks,
  isLink,
  type PressedButtonArgs,
  pushOrToggle,
  type ToggleFn
} from './-button.ts';

import type { TOC } from '@ember/component/template-only';
import type { CommandAction } from 'ember-command';
import type { Simplify } from 'type-fest';

export interface ButtonSignature {
  Element: HTMLButtonElement | HTMLAnchorElement | HTMLSpanElement;
  Args: Simplify<
    Omit<PushArgs, 'push'> &
      Omit<PressedButtonArgs, 'push'> &
      ButtonArgs & {
        push?: ToggleFn | CommandAction;
      }
  >;
  Blocks: ButtonBlocks;
}

export const Button: TOC<ButtonSignature> = <template>
  <PushElement
    @push={{pushOrToggle @push @pressed}}
    @href={{@href}}
    @element={{element "button"}}
    class="button"
    type={{if (and (not (isLink @push)) (not (asBoolean @href))) "button"}}
    aria-pressed={{if @pressed (if @pressed "true" "false")}}
    data-intent={{if @intent @intent "action"}}
    data-importance={{if @importance @importance "supreme"}}
    data-spacing={{@spacing}}
    {{disabled when=(if @disabled @disabled false)}}
    data-test-button
    ...attributes
  >
    {{#if (has-block "before")}}
      <span data-test-button="before">
        {{yield to="before"}}
      </span>
    {{/if}}

    <span data-test-button="label">
      {{#if (has-block "label")}}
        {{yield to="label"}}
      {{/if}}

      {{#if (has-block)}}
        {{yield}}
      {{/if}}
    </span>

    {{#if (has-block "after")}}
      <span data-test-button="after">
        {{yield to="after"}}
      </span>
    {{/if}}
  </PushElement>
</template>;
