import { render } from '@ember/test-helpers';
import { setupRenderingTest } from 'ember-qunit';
import { module, test } from 'qunit';

import { hbs } from 'ember-cli-htmlbars';

module('Rendering | Buttons | <GhostButton>', function (hooks) {
  setupRenderingTest(hooks);

  test('basic use-case', async function (assert) {
    await render(hbs`<GhostButton>click me!</GhostButton>`);

    assert.dom('[data-test-ghost-button-content]').hasText('click me!');
  });

  test('basic composition use-case', async function (assert) {
    await render(hbs`
      <GhostButton as |b|>
        <b.Content data-test-ghost-button-content>click me!</b.Content>
      </GhostButton>`);

    assert.dom('[data-test-ghost-button-content]').hasText('click me!');
  });

  test('full composition use-case', async function (assert) {
    await render(hbs`
      <GhostButton as |b|>
        <b.Prefix data-test-ghost-button-prefix>pre</b.Prefix>
        <b.Affix data-test-ghost-button-affix1>af1</b.Affix>
        <b.Content data-test-ghost-button-content>click me!</b.Content>
        <b.Affix data-test-ghost-button-affix2>af2</b.Affix>
        <b.Suffix data-test-ghost-button-suffix>suf</b.Suffix>
      </GhostButton>`);

    assert.dom('[data-test-ghost-button-prefix]').hasText('pre');
    assert.dom('[data-test-ghost-button-affix1]').hasText('af1');
    assert.dom('[data-test-ghost-button-content]').hasText('click me!');
    assert.dom('[data-test-ghost-button-affix2]').hasText('af2');
    assert.dom('[data-test-ghost-button-suffix]').hasText('suf');
  });
});
