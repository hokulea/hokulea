import { CommandElement } from 'ember-command';
import { element } from 'ember-element-helper';

import styles from '@hokulea/core/actions.module.css';

import { not } from '../-private/helpers.ts';
import disabled from '../-private/modifiers/disabled.ts';
import { isLink } from './-button.ts';

import type { TOC } from '@ember/component/template-only';
import type { Importance, Importances, Intent, Intents, Spacing, Spacings } from '@hokulea/tokens';
import type { CommandAction } from 'ember-command';

export interface ButtonSignature {
  Element: HTMLButtonElement | HTMLAnchorElement | HTMLSpanElement;
  Args: {
    push?: CommandAction;
    intent?: Intent | Intents;
    importance?: Importance | Importances;
    spacing?: Spacing | Spacings;
    disabled?: boolean;
  };
  Blocks: {
    /** The label for the button */
    default: [];

    /** The label for the button */
    label: [];

    /** A slot in front of the label */
    before: [];

    /** A slot after the label */
    after: [];
  };
}

const Button: TOC<ButtonSignature> = <template>
  <CommandElement
    @element={{element "button"}}
    @command={{@push}}
    class="{{styles.button}}"
    type={{if (not (isLink @push)) "button"}}
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
  </CommandElement>
</template>;

export default Button;
