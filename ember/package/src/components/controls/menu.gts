import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { registerDestructor } from '@ember/destroyable';
import { hash } from '@ember/helper';
import { next } from '@ember/runloop';

import { ariaMenu } from 'ember-aria-voyager';
import { TrackedArray } from 'tracked-built-ins';

import disabled from '../../-private/modifiers/disabled.ts';
import { PushElement } from '../../-private/push.gts';
import { popover } from '../../helpers/popover.ts';

import type { MenuItemArgs, MenuItemBlocks, MenuItemElement } from './-menu.gts';
import type Owner from '@ember/owner';
import type { WithBoundArgs } from '@glint/template';

type RadioGroupArgs<V> = {
  value?: V | V[];
  update?: (selection: V | V[]) => void;
};

type MenuGroupBlock<V> = {
  Radio: WithBoundArgs<typeof MenuItemRadio<V>, 'registerItem' | 'unregisterItem' | 'group'>;
};

export type MenuDefaultBlock<V> = {
  Item: WithBoundArgs<typeof MenuItem, 'registerItem' | 'unregisterItem'>;
  Checkbox: WithBoundArgs<typeof MenuItemCheckbox, 'registerItem' | 'unregisterItem'>;
} & MenuGroupBlock<V>;

export interface MenuItemSignature {
  Element: MenuItemElement;
  Args: MenuItemArgs & {
    registerItem: (item: MenuItem) => void;
    unregisterItem: (item: MenuItem) => void;
  };
  Blocks: MenuItemBlocks & {
    menu?: [MenuDefaultBlock<unknown>];
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

    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    args.registerItem(this);

    registerDestructor(this, () => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      args.unregisterItem(this);
    });
  }

  <template>
    {{#if (has-block "menu")}}
      {{#let (popover position="right span-bottom" fallback="flip-inline") as |p|}}
        <button
          type="button"
          role="menuitem"
          aria-haspopup="menu"
          {{disabled when=(if @disabled @disabled false)}}
          {{p.trigger}}
        >
          <span>{{~yield to="label"~}}</span>
        </button>

        <Menu {{p.target}} as |m|>
          {{yield m to="menu"}}
        </Menu>
      {{/let}}
    {{else}}
      <PushElement
        @push={{@push}}
        @href={{@href}}
        {{disabled when=(if @disabled @disabled false)}}
        role="menuitem"
      >
        <span>{{~yield~}}</span>
      </PushElement>
    {{/if}}
  </template>
}
/* eslint-enable @typescript-eslint/no-use-before-define */

export interface MenuItemCheckboxSignature {
  Element: MenuItemElement;
  Args: Pick<MenuItemArgs, 'disabled'> & {
    push?: (checked: boolean) => void;
    checked?: boolean;
    registerItem: (item: MenuItemCheckbox) => void;
    unregisterItem: (item: MenuItemCheckbox) => void;
  };
  Blocks: {
    default: [];
  };
}

class MenuItemCheckbox extends Component<MenuItemCheckboxSignature> {
  constructor(owner: Owner, args: MenuItemCheckboxSignature['Args']) {
    super(owner, args);

    args.registerItem(this);

    registerDestructor(this, () => {
      args.unregisterItem(this);
    });
  }

  check(checked: boolean) {
    this.args.push?.(checked);
  }

  <template>
    <span
      role="menuitemcheckbox"
      aria-checked={{if @checked (if @checked "true" "false") "false"}}
      {{disabled when=(if @disabled @disabled false)}}
    >
      <span>{{~yield~}}</span>
    </span>
  </template>
}

export interface MenuItemRadioSignature<V> {
  Element: MenuItemElement;
  Args: Pick<MenuItemArgs, 'disabled'> & {
    value: V;
    group: Group<V>;
    isSelected: (value: V) => boolean;
    registerItem: (item: MenuItemRadio<V>) => void;
    unregisterItem: (item: MenuItemRadio<V>) => void;
  };
  Blocks: {
    default: [];
  };
}

class MenuItemRadio<V> extends Component<MenuItemRadioSignature<V>> {
  constructor(owner: Owner, args: MenuItemRadioSignature<V>['Args']) {
    super(owner, args);

    args.registerItem(this);

    registerDestructor(this, () => {
      args.unregisterItem(this);
    });
  }

  get value() {
    return this.args.value;
  }

  get group() {
    return this.args.group;
  }

  <template>
    <span
      role="menuitemradio"
      aria-checked={{if (@group.isSelected @value) "true" "false"}}
      {{disabled when=(if @disabled @disabled false)}}
    >
      <span>{{~yield~}}</span>
    </span>
  </template>
}

type MenuItemChildren<V> = MenuItem | MenuItemCheckbox | MenuItemRadio<V>;

class Group<V> {
  @tracked selection: V[] = [];

  getUpdate: () => ((value: V | V[]) => void) | undefined;

  constructor(callback: () => ((value: V | V[]) => void) | undefined) {
    this.getUpdate = callback;
  }

  isSelected = (value: V) => {
    return this.selection.includes(value);
  };

  select(value: V[]) {
    this.selection = value;

    this.getUpdate()?.(this.selection.length === 1 ? this.selection[0] : this.selection);
  }
}

export interface MenuGroupSignature<V> {
  Element: MenuItemElement;
  Args: {
    disabled?: boolean;
    registerItem: (item: MenuItemChildren<V>) => void;
    unregisterItem: (item: MenuItemChildren<V>) => void;
  } & RadioGroupArgs<V>;
  Blocks: {
    default: [MenuGroupBlock<V>];
  };
}

class MenuGroup<V> extends Component<MenuGroupSignature<V>> {
  MenuItemRadio = MenuItemRadio<V>;

  group = new Group<V>(() => this.args.update);

  <template>
    <div role="group">
      {{yield
        (hash
          Radio=(component
            this.MenuItemRadio
            registerItem=@registerItem
            unregisterItem=@unregisterItem
            group=this.group
          )
        )
      }}
    </div>
  </template>
}

export interface MenuSignature<V> {
  Element: HTMLDivElement;
  Args: {
    disabled?: boolean;
  } & RadioGroupArgs<V>;
  Blocks: {
    default: [MenuDefaultBlock<V>];
  };
}

export class Menu<V> extends Component<V> {
  MenuItemRadio = MenuItemRadio<V>;

  group = new Group<V>(() => this.args.update);
  @tracked items: MenuItemChildren<V>[] = new TrackedArray();
  checked: Set<MenuItemCheckbox> = new Set<MenuItemCheckbox>();

  registerItem = (item: MenuItemChildren<V>) => {
    // eslint-disable-next-line ember/no-runloop
    next(() => {
      this.items.push(item);
    });
  };

  unregisterItem = (item: MenuItemChildren<V>) => {
    // eslint-disable-next-line ember/no-runloop
    next(() => {
      this.items.splice(this.items.indexOf(item), 1);
    });
  };

  select = (selection: MenuItemRadio<V>[]) => {
    const groups = new Map<Group<V>, V[]>();

    for (const item of selection) {
      if (!groups.has(item.group)) {
        groups.set(item.group, []);
      }

      groups.get(item.group)?.push(item.value);
    }

    for (const [group, values] of groups) {
      group.select(values);
    }
  };

  check = (items: MenuItemCheckbox[]) => {
    console.log('check', items);

    const checked = new Set(items);

    const added = checked.difference(this.checked);
    const removed = this.checked.difference(checked);

    for (const item of added) {
      item.check(true);
    }

    for (const item of removed) {
      item.check(false);
    }

    this.checked = checked;
  };

  <template>
    <div
      class="menu"
      data-test-menu
      ...attributes
      {{ariaMenu items=this.items disabled=@disabled select=this.select check=this.check}}
    >
      {{yield
        (hash
          Item=(component
            MenuItem registerItem=this.registerItem unregisterItem=this.unregisterItem
          )
          Checkbox=(component
            MenuItemCheckbox registerItem=this.registerItem unregisterItem=this.unregisterItem
          )
          Radio=(component
            this.MenuItemRadio
            registerItem=this.registerItem
            unregisterItem=this.unregisterItem
            group=this.group
          )
          Group=(component
            MenuGroup registerItem=this.registerItem unregisterItem=this.unregisterItem
          )
        )
      }}
    </div>
  </template>
}
