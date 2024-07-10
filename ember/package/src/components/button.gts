import { CommandElement } from 'ember-command';
import { element } from 'ember-element-helper';
import { Link } from 'ember-link';

import styles from '@hokulea/core/actions.module.css';

import disabled from '../-private/modifiers/disabled';

import type { TOC } from '@ember/component/template-only';
import type { Importance, Importances, Intent, Intents, Spacing, Spacings } from '@hokulea/tokens';
import type { CommandAction } from 'ember-command';

const LINK_PROPERTIES = [
  'active',
  'activeWithoutModels',
  'activeWithoutQueryParams',
  'entering',
  'exiting',
  // 'open', // as of `ember-link@3`
  'transitionTo',
  'replaceWith',
  'qualifiedRouteName',
  'url',
  'models',
  'queryParams'
];

function getAllPropertyNames(obj: object) {
  let names: string[] = [];

  do {
    names.push(...Object.getOwnPropertyNames(obj));
    obj = Object.getPrototypeOf(obj);
  } while (obj !== Object.prototype);

  return names.filter((name) => name !== 'constructor');
}

function isLink(commandable?: CommandAction): commandable is Link {
  if (commandable === undefined) {
    return false;
  }

  // `instanceOf` is not a reliable check, only when the host app runs with
  // embroider. In classic mode, the ember-link instance in the host app and in
  // ember-command addon are different and the check will fail, so this performs
  // some duck-type check
  const props = getAllPropertyNames(commandable);

  // the first check should be sufficient enough, but isn't due to:
  // https://github.com/gossi/ember-command/issues/23
  // so, there is another duck-type check for the link
  return commandable instanceof Link || LINK_PROPERTIES.every((prop) => props.includes(prop));
}

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
    type={{if (isLink @push) "button"}}
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
