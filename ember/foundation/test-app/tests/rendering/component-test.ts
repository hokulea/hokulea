import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';

module('Rendering | <Button>', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    await render(hbs`<Button></Button>`);

    assert.dom('button').exists();
  });
});
