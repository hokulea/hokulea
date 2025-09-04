import styles from '@hokulea/core/actions.module.css';

import disabled from '../../-private/modifiers/disabled.ts';

import type { TOC } from '@ember/component/template-only';
import type { Importance, Intent, Spacing } from '@hokulea/tokens';

export interface ResetSignature {
  Element: HTMLButtonElement;
  Args: {
    intent?: Intent;
    importance?: Importance;
    spacing?: Spacing;
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

export const Reset: TOC<ResetSignature> = <template>
  <button
    type="reset"
    class={{styles.button}}
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
  </button>
</template>;
