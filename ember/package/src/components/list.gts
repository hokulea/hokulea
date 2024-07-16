import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { registerDestructor } from '@ember/destroyable';
import { hash } from '@ember/helper';
import { next } from '@ember/runloop';

import { listbox } from 'ember-aria-voyager';
import { TrackedArray } from 'tracked-built-ins';

import styles from '@hokulea/core/controls.module.css';

import type Owner from '@ember/owner';
import type { WithBoundArgs } from '@glint/template';

export interface OptionSignature<V> {
  Element: HTMLOptionElement;
  Args: {
    value: V;
    isSelected: (option: V) => boolean;
    registerItem: (item: V) => void;
    unregisterItem: (item: V) => void;
  };
  Blocks: {
    default: [];
  };
}

class Option<V> extends Component<OptionSignature<V>> {
  constructor(owner: Owner, args: OptionSignature<V>['Args']) {
    super(owner, args);

    args.registerItem(args.value);

    registerDestructor(this, () => {
      args.unregisterItem(args.value);
    });
  }

  <template>
    <span role="option" aria-selected={{if (@isSelected @value) "true"}}>
      {{yield}}
    </span>
  </template>
}

export interface ListSignature<V> {
  Element: HTMLDivElement;
  Args: {
    multiple?: boolean;
    disabled?: boolean;
    value?: V | V[];
    update?: (value: V | V[]) => void;
    activateItem?: (value: V) => void;
  };
  Blocks: {
    default: [
      {
        Option: WithBoundArgs<typeof Option<V>, 'isSelected' | 'registerItem' | 'unregisterItem'>;
      }
    ];
  };
}

export default class List<V> extends Component<ListSignature<V>> {
  Option = Option<V>;

  @tracked items: V[] = new TrackedArray();

  registerItem = (item: V) => {
    // eslint-disable-next-line ember/no-runloop
    next(() => {
      this.items.push(item);
    });
  };

  unregisterItem = (item: V) => {
    // eslint-disable-next-line ember/no-runloop
    next(() => {
      this.items.splice(this.items.indexOf(item), 1);
    });
  };

  isSelected = (option: V) => {
    if (Array.isArray(this.args.value)) {
      return this.args.value.includes(option);
    }

    return this.args.value === option;
  };

  <template>
    <div
      class={{styles.list}}
      data-test-list
      ...attributes
      {{!@glint-ignore}}
      {{listbox
        items=this.items
        selection=@value
        multi=@multiple
        disabled=@disabled
        select=@update
        activateItem=@activateItem
      }}
    >
      {{yield
        (hash
          Option=(component
            this.Option
            isSelected=this.isSelected
            registerItem=this.registerItem
            unregisterItem=this.unregisterItem
          )
        )
      }}
    </div>
  </template>
}
