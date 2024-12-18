import Component from '@glimmer/component';
import { cached, tracked } from '@glimmer/tracking';
import { registerDestructor } from '@ember/destroyable';
import { hash } from '@ember/helper';
import { uniqueId } from '@ember/helper';
import { guidFor } from '@ember/object/internals';
import { next } from '@ember/runloop';

import { ariaTablist, type Orientation, type TablistBehavior } from 'ember-aria-voyager';
import { modifier } from 'ember-modifier';
import Portal from 'ember-stargate/components/portal';
import PortalTarget from 'ember-stargate/components/portal-target';
import { TrackedArray } from 'tracked-built-ins';

import styles from '@hokulea/core/controls.module.css';

import { notEq } from '../-private/helpers';

import type Owner from '@ember/owner';
import type { WithBoundArgs } from '@glint/template';

export const TabValue = Symbol('TabValue');

const attachValue = modifier((element, [value]) => {
  if (value) {
    // @ts-expect-error this is internal API
    element[TabValue] = value;
  }
});

type TabSignature = {
  Element: HTMLDivElement;
  Args: {
    tablist: string;
    register: (tab: Tab) => void;
    unregister: (tab: Tab) => void;
    label?: string;
    value?: unknown;
    selection?: unknown;
  };
  Blocks: {
    default?: [];
    label?: [];
    content?: [];
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
    {{#let (uniqueId) as |id|}}
      <Portal @target={{@tablist}}>
        {{! template-lint-disable require-context-role }}
        <button
          type="button"
          role="tab"
          aria-controls={{id}}
          id="{{id}}-label"
          {{attachValue @value}}
        >
          <span>
            {{#if (has-block "label")}}
              {{yield to="label"}}
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
        hidden={{notEq this.id @selection}}
      >
        {{#if (has-block "content")}}
          {{yield to="content"}}
        {{else}}
          {{yield}}
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
        Tab: WithBoundArgs<typeof Tab, 'selection' | 'tablist' | 'register' | 'unregister'>;
      }
    ];
  };
}

export default class Tabs extends Component<TabsSignature> {
  @tracked tabs: Tab[] = new TrackedArray();
  @tracked internalSelection?: Tab;

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

  select = (id: string | unknown) => {
    const tab = this.tabs.find((t) => t.id === id) as Tab;

    this.internalSelection = tab;
    this.args.update?.(tab.args.value ?? tab.args.label ?? undefined);
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
            )
          )
        }}
      {{/let}}
    </div>
  </template>
}
