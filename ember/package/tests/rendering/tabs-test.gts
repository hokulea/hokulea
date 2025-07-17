import { tracked } from '@glimmer/tracking';
import { hash } from '@ember/helper';
import { render, settled } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';

import sinon from 'sinon';

import { Tabs } from '#src';
import { TabsPageObject } from '#test-support';

import {
  testTablistKeyboardAutomaticSelection,
  testTablistKeyboardManualSelection,
  testTablistKeyboardNavigation,
  testTablistPointerNavigation,
  testTablistPointerSelection
} from 'ember-aria-voyager/test-support';

import type { TOC } from '@ember/component/template-only';
import type { TablistBehavior } from 'ember-aria-voyager';

const range = (amount: number) => Array.from({ length: amount }, (_, i) => i + 1);

const TestTabs: TOC<{
  Element: HTMLElement;
  Args: { amount: number; behavior?: TablistBehavior };
}> = <template>
  <Tabs @behavior={{@behavior}} as |t|>
    {{#each (range @amount) as |i|}}
      <t.Tab @label="Tab {{i}}">Content {{i}}</t.Tab>
    {{/each}}
  </Tabs>
</template>;

module('Rendering | <Tabs>', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders with defaults', async (assert) => {
    await render(<template><Tabs /></template>);

    const input = new TabsPageObject();

    assert.dom(input.control).exists();
    assert.dom(input.control).doesNotHaveAria('disabled');
  });

  test('disabling the input', async (assert) => {
    await render(<template><Tabs @disabled={{true}} /></template>);

    const input = new TabsPageObject();

    assert.dom(input.control).hasAria('disabled', 'true');
  });

  test('renders tabs', async function (assert) {
    await render(
      <template>
        <Tabs as |t|>
          <t.Tab @label="Hello">
            Hello Content
          </t.Tab>
          <t.Tab @label="World">
            World Content
          </t.Tab>
        </Tabs>
      </template>
    );

    const input = new TabsPageObject();

    assert.dom(input.$tab[0]).hasText('Hello');
    assert.dom(input.$tab[1]).hasText('World');

    assert.dom(input.$tabpanel[0]).hasText('Hello Content');
    assert.dom(input.$tabpanel[1]).hasText('World Content');
  });

  test('state is yielded', async (assert) => {
    await render(
      <template>
        <Tabs as |t|>
          <t.Tab @label="Hello" as |state|>
            Hello Content
            {{#if state.active}}<i data-test-active="hello"></i>{{/if}}
            {{#if state.selected}}<i data-test-selected="hello"></i>{{/if}}
          </t.Tab>
          <t.Tab @label="World" @value="world" as |state|>
            World Content
            {{#if state.active}}<i data-test-active="world"></i>{{/if}}
            {{#if state.selected}}<i data-test-selected="world"></i>{{/if}}
          </t.Tab>
        </Tabs>
      </template>
    );

    const input = new TabsPageObject();

    assert.dom('[data-test-active="hello"]').exists();
    assert.dom('[data-test-selected="hello"]').exists();
    assert.dom('[data-test-active="world"]').doesNotExist();
    assert.dom('[data-test-selected="world"]').doesNotExist();

    await input.select('world');

    assert.dom('[data-test-active="hello"]').doesNotExist();
    assert.dom('[data-test-selected="hello"]').doesNotExist();
    assert.dom('[data-test-active="world"]').exists();
    assert.dom('[data-test-selected="world"]').exists();
  });

  module('Navigation', () => {
    test('it supports keyboard navigation', async (assert) => {
      await render(<template><TestTabs @amount={{5}} /></template>);

      await testTablistKeyboardNavigation(assert);
    });

    test('it supports mouse navigation', async (assert) => {
      await render(<template><TestTabs @amount={{5}} /></template>);

      await testTablistPointerNavigation(assert);
    });
  });

  module('Selection', () => {
    test('it supports automatic keyboard selection', async (assert) => {
      await render(<template><TestTabs @amount={{5}} /></template>);

      await testTablistKeyboardAutomaticSelection(assert);
    });

    test('it supports manual keyboard selection', async (assert) => {
      await render(
        <template><TestTabs @amount={{5}} @behavior={{hash singleSelection="manual"}} /></template>
      );

      await testTablistKeyboardManualSelection(assert);
    });

    test('it supports pointer selection', async (assert) => {
      await render(<template><TestTabs @amount={{5}} /></template>);

      await testTablistPointerSelection(assert);
    });

    test('triggers @update', async function (assert) {
      const handleUpdate = sinon.spy();

      await render(
        <template>
          <Tabs @update={{handleUpdate}} as |t|>
            <t.Tab @label="Hello" @value="hello">
              Hello Content
            </t.Tab>
            <t.Tab @label="World" @value="world">
              World Content
            </t.Tab>
          </Tabs>
        </template>
      );

      const input = new TabsPageObject();

      await input.select('world');

      assert.ok(handleUpdate.calledWith('world'));
    });

    test('@selection works', async (assert) => {
      const handleUpdate = sinon.spy();
      const context = new (class {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        @tracked selection: unknown = undefined;
      })();

      await render(
        <template>
          <Tabs @selection={{context.selection}} @update={{handleUpdate}} as |t|>
            <t.Tab @label="Hello" @value="hello">
              Hello Content
            </t.Tab>
            <t.Tab @label="World" @value="world">
              World Content
            </t.Tab>
          </Tabs>
        </template>
      );

      assert.ok(handleUpdate.calledWith('hello'));

      context.selection = 'world';
      await settled();

      assert.strictEqual(handleUpdate.callCount, 1);
    });
  });
});
