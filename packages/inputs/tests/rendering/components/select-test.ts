import { render } from '@ember/test-helpers';
import { setupRenderingTest } from 'ember-qunit';
import { module, test } from 'qunit';

import { hbs } from 'ember-cli-htmlbars';

import { SelectPageObject } from '@hokulea/inputs/test-support/page-objects';

module('Rendering | Component | <Select>', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders properly', async function (assert) {
    await render(hbs`<Select></Select>`);

    assert.dom(SelectPageObject.root).exists();
    assert.dom(SelectPageObject.trigger).exists();
    assert.dom(SelectPageObject.list).exists();
  });
});
