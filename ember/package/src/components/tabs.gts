import Component from '@glimmer/component';
import { registerDestructor } from '@ember/destroyable';
import { hash } from '@ember/helper';
import { uniqueId } from '@ember/helper';
import { next } from '@ember/runloop';

import { modifier } from 'ember-modifier';
import Portal from 'ember-stargate/components/portal';
import PortalTarget from 'ember-stargate/components/portal-target';

import styles from '@hokulea/core/controls.module.css';

import type Owner from '@ember/owner';
import type { WithBoundArgs } from '@glint/template';

type TabSignature = {
  Element: HTMLDivElement;
  Args: {
    tablist: string;
    register: (tab: Tab) => void;
    unregister: (tab: Tab) => void;
    label?: string;
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

  <template>
    {{#let (uniqueId) as |id|}}
      <Portal @target={{@tablist}}>
        {{! template-lint-disable require-button-type }}
        <button role="tab" aria-controls={{id}} id="{{id}}-label">
          {{#if (has-block "label")}}
            {{yield to="label"}}
          {{else}}
            {{@label}}
          {{/if}}
        </button>
      </Portal>

      <section id={{id}} role="tabpanel" aria-labelledby="{{id}}-label" local-class="content">
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
  Blocks: {
    default: [
      {
        Tab: WithBoundArgs<typeof Tab, 'tablist' | 'register' | 'unregister'>;
      }
    ];
  };
}

export default class Tabs extends Component<TabsSignature> {
  declare elem: HTMLDivElement;

  tabs: Tab[] = [];

  ref = modifier((elem: HTMLDivElement) => {
    this.elem = elem;
  });

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

  <template>
    <div class={{styles.tabs}}>
      {{#let (uniqueId) as |tablistId|}}
        <PortalTarget role="tablist" @name={{tablistId}} @multiple={{true}} />

        {{yield
          (hash
            Tab=(component Tab register=this.register unregister=this.unregister tablist=tablistId)
          )
        }}
      {{/let}}
    </div>
  </template>
}
