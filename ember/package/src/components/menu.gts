import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { registerDestructor } from '@ember/destroyable';
import { hash } from '@ember/helper';
import { next } from '@ember/runloop';
import { service } from '@ember/service';
import { htmlSafe } from '@ember/template';

import { ariaMenu } from 'ember-aria-voyager';
import { CommandElement } from 'ember-command';
import { consume } from 'ember-provide-consume-context';
import { TrackedArray } from 'tracked-built-ins';

import styles from '@hokulea/core/controls.module.css';

import disabled from '../-private/modifiers/disabled.ts';
import popover from '../helpers/popover.ts';

import type { MenuItemArgs, MenuItemBlocks, MenuItemElement } from './-menu.ts';
import type Owner from '@ember/owner';
import type { WithBoundArgs } from '@glint/template';
import type FastBoot from 'ember-cli-fastboot/services/fastboot';

export type MenuDefaultBlock = {
  Item: WithBoundArgs<typeof MenuItem, 'registerItem' | 'unregisterItem'>;
};

export interface MenuItemSignature {
  Element: MenuItemElement;
  Args: MenuItemArgs & {
    registerItem: (item: MenuItem) => void;
    unregisterItem: (item: MenuItem) => void;
  };
  Blocks: MenuItemBlocks & {
    menu?: [MenuDefaultBlock];
  };
}

// below are attempts at conditional typing based on provided blocks in dynamic invocation

// type MenuItemArgs = {
//   disabled?: boolean;
//   registerItem: (item: MenuItem) => void;
//   unregisterItem: (item: MenuItem) => void;
// };

// export interface MenuItemSignature<T = {}> {
//   Element: HTMLButtonElement | HTMLAnchorElement;
//   Args: T extends { Blocks: { default: [] } }
//     ? MenuItemArgs & {
//         push: CommandAction;
//       }
//     : MenuItemArgs;
//   Blocks: T extends { Blocks: { default: [] } }
//     ? { default: [] }
//     : { label: []; menu: [MenuDefaultBlock] };
// }

//  & (
//   | {
//       Args: MenuItemArgs & {
//         push: CommandAction;
//       };
//       Blocks: {
//         default: [];
//       };
//     }
//   | {
//       Args: MenuItemArgs;
//       Blocks: {
//         label: [];
//         menu: [MenuDefaultBlock];
//       };
//     }
// );

/* eslint-disable @typescript-eslint/no-use-before-define */
class MenuItem extends Component<MenuItemSignature> {
  constructor(owner: Owner, args: MenuItemSignature['Args']) {
    super(owner, args);

    args.registerItem(this);

    registerDestructor(this, () => {
      args.unregisterItem(this);
    });
  }

  <template>
    {{#if (has-block "menu")}}
      {{#let (popover position="right-start") as |p|}}
        <button
          type="button"
          role="menuitem"
          aria-haspopup="menu"
          {{disabled when=(if @disabled @disabled false)}}
          {{p.trigger}}
        >
          {{~yield to="label"~}}
        </button>

        <Menu {{p.target}} as |m|>
          {{yield m to="menu"}}
        </Menu>
      {{/let}}
    {{else}}
      <CommandElement
        @command={{@push}}
        {{disabled when=(if @disabled @disabled false)}}
        role="menuitem"
      >
        {{~yield~}}
      </CommandElement>
    {{/if}}
  </template>
}
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

export default class Menu extends Component<MenuSignature> {
  @service declare fastboot?: FastBoot;

  @consume('hokulea-app-header') declare withinAppHeader: boolean;

  @tracked items: MenuItem[] = new TrackedArray();

  get shallHide() {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-boolean-literal-compare
    return this.fastboot?.isFastBoot && this.withinAppHeader === true;
  }

  registerItem = (item: MenuItem) => {
    // eslint-disable-next-line ember/no-runloop
    next(() => {
      this.items.push(item);
    });
  };

  unregisterItem = (item: MenuItem) => {
    // eslint-disable-next-line ember/no-runloop
    next(() => {
      this.items.splice(this.items.indexOf(item), 1);
    });
  };

  <template>
    <div
      class={{styles.menu}}
      data-test-menu
      ...attributes
      {{ariaMenu items=this.items disabled=@disabled}}
      style={{if this.shallHide (htmlSafe "display: none")}}
    >
      {{yield
        (hash
          Item=(component
            MenuItem registerItem=this.registerItem unregisterItem=this.unregisterItem
          )
        )
      }}
    </div>
  </template>
}
