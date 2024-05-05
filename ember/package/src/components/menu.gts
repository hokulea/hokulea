import { hash } from '@ember/helper';

import { menu } from 'ember-aria-navigator';
import { CommandElement } from 'ember-command';

import styles from '@hokulea/core/navigation.module.css';

import popover from '../helpers/popover';

import type { TOC } from '@ember/component/template-only';
import type { CommandAction } from 'ember-command';

type MenuDefaultBlock = {
  Item: typeof MenuItem;
};

export type MenuItemSignature =
  | {
      Element: HTMLButtonElement | HTMLAnchorElement | HTMLSpanElement;
      Args: {
        push: CommandAction;
        disabled?: boolean;
      };
      Blocks: {
        default: [];
      };
    }
  | {
      Element: HTMLSpanElement;
      Args: {
        disabled?: boolean;
      };
      Blocks: {
        label: [];
        menu: [MenuDefaultBlock];
      };
    };

/* eslint-disable @typescript-eslint/no-use-before-define */
const MenuItem: TOC<MenuItemSignature> = <template>
  {{#if (has-block 'menu')}}
    {{#let (popover position='right-start') as |p|}}
      <button type='button' role='menuitem' aria-haspopup='menu' {{p.trigger}}>
        {{! @glint-ignore }}
        {{yield to='label'}}
      </button>

      {{!@glint-ignore}}
      <Menu {{p.target}} as |m|>
        {{! @glint-ignore }}
        {{yield m to='menu'}}
      </Menu>
    {{/let}}
  {{else}}
    {{! @glint-ignore }}
    <CommandElement @command={{@push}} role='menuitem'>
      {{! @glint-ignore }}
      {{yield}}
    </CommandElement>
  {{/if}}
</template>;
/* eslint-enable @typescript-eslint/no-use-before-define */

export interface MenuSignature {
  Element: HTMLDivElement;
  Args: {
    disabled?: boolean;
  };
  Blocks: {
    default: [MenuDefaultBlock];
  };
}

const Menu: TOC<MenuSignature> = <template>
  <div class={{styles.menu}} data-test-menu ...attributes {{menu}}>
    {{yield (hash Item=MenuItem)}}
  </div>
</template>;

export default Menu;
