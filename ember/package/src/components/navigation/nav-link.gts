import { on } from '@ember/modifier';

import { CommandElement } from 'ember-command';
import { Link, link } from 'ember-link';

import Icon from '../icon.gts';

import type { MenuItemArgs, MenuItemBlocks } from '../-menu';
import type { TOC } from '@ember/component/template-only';
import type { CommandAction } from 'ember-command';

const isActive = (commandable: CommandAction) => {
  return commandable instanceof Link && commandable.isActive;
};

const MaybeIcon: TOC<{ Args: { icon?: string } }> = <template>
  {{#if @icon}}
    <Icon @icon={{@icon}} part="icon" />
  {{/if}}
</template>;

export const NavLink: TOC<{
  Args: MenuItemArgs & {
    href?: string;
    icon?: string;
  };
  Blocks: MenuItemBlocks;
}> = <template>
  {{#if @href}}
    {{#let (link @href) as |l|}}
      <a href={{l.url}} {{on "click" l.open}} part="item" aria-current="{{if (isActive l) 'page'}}">
        <MaybeIcon @icon={{@icon}} />
        <span>{{yield}}</span>
      </a>
    {{/let}}
  {{else if @push}}
    <CommandElement @command={{@push}} aria-current="{{if (isActive @push) 'page'}}" part="item">
      <MaybeIcon @icon={{@icon}} />
      <span>{{yield}}</span>
    </CommandElement>
  {{else}}
    <span part="item">
      <MaybeIcon @icon={{@icon}} />
      {{yield}}
    </span>
  {{/if}}
</template>;
