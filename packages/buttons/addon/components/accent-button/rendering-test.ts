import { render } from '@ember/test-helpers';
import { setupRenderingTest } from 'ember-qunit';
import { module, test } from 'qunit';

import { hbs } from 'ember-cli-htmlbars';

module('Rendering | Buttons | <AccentButton>', function (hooks) {
  setupRenderingTest(hooks);

  test('basic use-case', async function (assert) {
    await render(hbs`<AccentButton>click me!</AccentButton>`);

    assert.dom('[data-test-button-content]').hasText('click me!');
  });

  test('basic composition use-case', async function (assert) {
    await render(hbs`
      <AccentButton as |b|>
        <b.Content data-test-button-content>click me!</b.Content>
      </AccentButton>
    `);

    assert.dom('[data-test-button-content]').hasText('click me!');
  });

  test('full composition use-case', async function (assert) {
    await render(hbs`
      <AccentButton as |b|>
        <b.Prefix data-test-button-prefix>pre</b.Prefix>
        <b.Affix data-test-button-affix1>af1</b.Affix>
        <b.Content data-test-button-content>click me!</b.Content>
        <b.Affix data-test-button-affix2>af2</b.Affix>
        <b.Suffix data-test-button-suffix>suf</b.Suffix>
      </AccentButton>
    `);

    assert.dom('[data-test-button-prefix]').hasText('pre');
    assert.dom('[data-test-button-affix1]').hasText('af1');
    assert.dom('[data-test-button-content]').hasText('click me!');
    assert.dom('[data-test-button-affix2]').hasText('af2');
    assert.dom('[data-test-button-suffix]').hasText('suf');
  });
});
