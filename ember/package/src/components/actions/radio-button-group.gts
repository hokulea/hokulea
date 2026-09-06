import Component from '@glimmer/component';
import { assert } from '@ember/debug';
import { registerDestructor } from '@ember/destroyable';
import { hash } from '@ember/helper';
import { next } from '@ember/runloop';

import { ariaRadioGroup } from 'ember-aria-voyager';
// at some point this. For compatibility reasons, this isn't used yet
// import { trackedArray } from '@ember/reactive/collections';
import { TrackedArray } from 'tracked-built-ins';

import disabled from '../../-private/modifiers/disabled.ts';
import { Icon } from '../graphics/icon.gts';

import type { ButtonArgs, ButtonBlocks, IconButtonArgs } from './-button.ts';
import type Owner from '@ember/owner';
import type { WithBoundArgs } from '@glint/template';

interface RadioArgs<V> {
  value: V;
  register: (button: V) => void;
  unregister: (button: V) => void;
  isSelected: (value: V) => boolean;
}

interface RadioButtonSignature<V> {
  Element: HTMLButtonElement;
  Args: ButtonArgs & RadioArgs<V>;
  Blocks: ButtonBlocks;
}

class RadioButton<V> extends Component<RadioButtonSignature<V>> {
  constructor(owner: Owner, args: RadioButtonSignature<V>['Args']) {
    super(owner, args);

    args.register(args.value);

    registerDestructor(this, () => {
      args.unregister(args.value);
    });
  }

  <template>
    <button
      type="button"
      role="radio"
      class="button"
      aria-checked={{if (@isSelected @value) "true" "false"}}
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
  </template>
}

interface RadioIconButtonSignature<V> {
  Element: HTMLButtonElement;
  Args: ButtonArgs & IconButtonArgs & RadioArgs<V>;
  Blocks: ButtonBlocks;
}

class RadioIconButton<V> extends Component<RadioIconButtonSignature<V>> {
  constructor(owner: Owner, args: RadioIconButtonSignature<V>['Args']) {
    super(owner, args);

    args.register(args.value);

    registerDestructor(this, () => {
      args.unregister(args.value);
    });
  }

  get label() {
    assert(
      'Please provide a `@label` to `<IconButton>` for accessibility reasons.',

      // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
      this.args.label !== undefined
    );

    return this.args.label;
  }

  <template>
    <button
      type="button"
      role="radio"
      class="icon-button"
      aria-checked={{if (@isSelected @value) "true" "false"}}
      data-intent={{if @intent @intent "action"}}
      data-importance={{if @importance @importance "supreme"}}
      data-spacing={{@spacing}}
      aria-label={{this.label}}
      {{disabled when=(if @disabled @disabled false)}}
      data-test-icon-button
      ...attributes
    >
      {{! role="presentation" to make glint happy for no reason }}
      <Icon @icon={{@icon}} role="presentation" data-test-icon-button="icon" />
    </button>
  </template>
}

export type RadioButtonGroupSignature<V> = {
  Element: HTMLDivElement;
  Args: {
    value: V;
    update?: (value: V) => void;
  };
  Blocks: {
    default: [
      {
        Button: WithBoundArgs<typeof RadioButton<V>, 'register' | 'unregister' | 'isSelected'>;
        IconButton: WithBoundArgs<
          typeof RadioIconButton<V>,
          'register' | 'unregister' | 'isSelected'
        >;
      }
    ];
  };
};

export class RadioButtonGroup<V> extends Component<RadioButtonGroupSignature<V>> {
  Button = RadioButton<V>;
  IconButton = RadioIconButton<V>;

  items: V[] = new TrackedArray();

  register = (item: V) => {
    // eslint-disable-next-line ember/no-runloop
    next(() => {
      this.items.push(item);
    });
  };

  unregister = (item: V) => {
    // eslint-disable-next-line ember/no-runloop
    next(() => {
      this.items.splice(this.items.indexOf(item), 1);
    });
  };

  isChecked = (value: V) => {
    return this.args.value === value;
  };

  select = (value: V) => {
    // eslint-disable-next-line ember/no-runloop
    next(() => {
      this.args.update?.(value);
    });
  };

  <template>
    <div
      class="button-group"
      {{ariaRadioGroup items=this.items selection=@value select=this.select}}
    >
      {{yield
        (hash
          Button=(component
            this.Button register=this.register unregister=this.unregister isSelected=this.isChecked
          )
          IconButton=(component
            this.IconButton
            register=this.register
            unregister=this.unregister
            isSelected=this.isChecked
          )
        )
      }}
    </div>
  </template>
}
