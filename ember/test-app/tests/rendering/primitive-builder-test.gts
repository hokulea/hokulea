import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';

import { PrimitiveBuilder } from '@hokulea/ember-foundation';

module('Rendering | <PrimitiveBuilder>', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    await render(<template><PrimitiveBuilder/></template>);

    assert.dom('[data-test-primitive-builder="root"]').exists();
  });
});
