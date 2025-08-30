import Component from '@glimmer/component';
import { cached, tracked } from '@glimmer/tracking';
import { registerDestructor } from '@ember/destroyable';
import { hash, uniqueId } from '@ember/helper';
import { guidFor } from '@ember/object/internals';
import { next } from '@ember/runloop';

import { ariaTablist, type Orientation, type TablistBehavior } from 'ember-aria-voyager';
import { modifier } from 'ember-modifier';
import Portal from 'ember-stargate/components/portal';
import PortalTarget from 'ember-stargate/components/portal-target';
import { TrackedArray } from 'tracked-built-ins';

import styles from '@hokulea/core/controls.module.css';

import { eq, not } from '../../-private/helpers.ts';

import type Owner from '@ember/owner';
import type { WithBoundArgs } from '@glint/template';

export const TabValue = Symbol('TabValue');

const attachValue = modifier((element, [value]) => {
  if (value) {
    // @ts-expect-error this is internal API
    element[TabValue] = value;
  }
});

interface State {
  active: boolean;
  selected: boolean;
}

type Item = string & {};

type TabSignature = {
  Element: HTMLDivElement;
  Args: {
    tablist: string;
    register: (tab: Tab) => void;
    unregister: (tab: Tab) => void;
    label?: string;
    value?: unknown;
    selection?: unknown;
    activeItem?: Item;
  };
  Blocks: {
    default?: [State];
    label?: [State];
    content?: [State];
  };
};

class Tab extends Component<TabSignature> {
  constructor(owner: Owner, args: TabSignature['Args']) {
    super(owner, args);

    args.register(this);

    registerDestructor(this, () => {
      args.unregister(this);
    });
  }

  @cached
  get id() {
    return this.args.value ?? this.args.label ?? guidFor(this);
  }

  <template>
    {{#let
      (uniqueId) (hash active=(eq this.id @activeItem) selected=(eq this.id @selection))
      as |id state|
    }}
      <Portal @target={{@tablist}}>
        {{! template-lint-disable require-context-role }}
        <button
          type="button"
          role="tab"
          aria-controls={{id}}
          aria-selected={{if state.selected "true"}}
          id="{{id}}-label"
          {{attachValue @value}}
        >
          <span>
            {{#if (has-block "label")}}
              {{yield state to="label"}}
            {{else}}
              {{@label}}
            {{/if}}
          </span>
        </button>
      </Portal>

      <section
        id={{id}}
        role="tabpanel"
        aria-labelledby="{{id}}-label"
        local-class="content"
        hidden={{not state.selected}}
      >
        {{#if (has-block "content")}}
          {{yield state to="content"}}
        {{else}}
          {{yield state}}
        {{/if}}
      </section>
    {{/let}}
  </template>
}

interface TabsSignature {
  Element: HTMLDivElement;
  Args: {
    disabled?: boolean;
    selection?: unknown;
    update?: (value: unknown) => void;
    behavior?: TablistBehavior;
    orientation?: Orientation;
  };
  Blocks: {
    default: [
      {
        Tab: WithBoundArgs<
          typeof Tab,
          'selection' | 'activeItem' | 'tablist' | 'register' | 'unregister'
        >;
      }
    ];
  };
}

export class Tabs extends Component<TabsSignature> {
  @tracked tabs: Tab[] = new TrackedArray();
  @tracked internalSelection?: Tab;
  @tracked activeItem?: Item;

  get items() {
    return this.tabs.map((t) => t.id);
  }

  get selection() {
    return this.args.selection ?? this.internalSelection?.id;
  }

  register = (tab: Tab) => {
    // eslint-disable-next-line ember/no-runloop
    next(() => {
      this.tabs.push(tab);
    });
  };

  unregister = (tab: Tab) => {
    // eslint-disable-next-line ember/no-runloop
    next(() => {
      this.tabs.splice(this.tabs.indexOf(tab), 1);
    });
  };

  select = (id: Item) => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const tab = this.tabs.find((t) => t.id === id)!;

    this.internalSelection = tab;
    this.args.update?.(tab.args.value ?? tab.args.label ?? undefined);
  };

  activateItem = (id: Item) => {
    this.activeItem = id;
  };

  <template>
    <div class={{styles.tabs}} data-test-tabs>
      {{#let (uniqueId) as |tablistId|}}
        <PortalTarget
          @name={{tablistId}}
          @multiple={{true}}
          role="tablist"
          {{ariaTablist
            items=this.items
            select=this.select
            selection=this.selection
            activateItem=this.activateItem
            disabled=@disabled
            behavior=@behavior
            orientation=@orientation
          }}
        />

        {{yield
          (hash
            Tab=(component
              Tab
              register=this.register
              unregister=this.unregister
              tablist=tablistId
              selection=this.selection
              activeItem=this.activeItem
            )
          )
        }}
      {{/let}}
    </div>
  </template>
}
