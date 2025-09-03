import { on } from '@ember/modifier';

import { type CommandAction, CommandElement } from 'ember-command';
import { element, type ElementFromTagName, type ElementSignature } from 'ember-element-helper';
import { Link, link } from 'ember-link';

import type { TOC } from '@ember/component/template-only';

export const isActive = (commandable: CommandAction) => {
  return commandable instanceof Link && commandable.isActive;
};

export interface PushArgs {
  push?: CommandAction;
  href?: string;
}

interface PushSignature<T extends string = 'span'> {
  Element: HTMLButtonElement | HTMLAnchorElement | ElementFromTagName<T>;
  Args: PushArgs & {
    element?: ElementSignature<'a' | 'button' | T>['Return'];
  };
  Blocks: {
    default: [];
  };
}

export const PushElement: TOC<PushSignature> = <template>
  {{#if @href}}
    {{#let (link @href) as |l|}}
      <a
        href={{l.url}}
        {{on "click" l.open}}
        aria-current="{{if (isActive l) 'page'}}"
        ...attributes
      >
        {{yield}}
      </a>
    {{/let}}
  {{else if @push}}
    <CommandElement
      @element={{@element}}
      @command={{@push}}
      aria-current="{{if (isActive @push) 'page'}}"
      ...attributes
    >
      {{yield}}
    </CommandElement>
  {{else}}
    {{#let (if @element @element (element "span")) as |Element|}}
      <Element ...attributes>
        {{yield}}
      </Element>
    {{/let}}
  {{/if}}
</template>;
