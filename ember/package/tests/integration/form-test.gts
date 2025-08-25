import { render, setupOnerror } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';

import { Form } from '#src';

module('Integration | <Form>', function (hooks) {
  setupRenderingTest(hooks);

  // see in `@hokulea/ember-pahu` why this isn't tested right now
  //
  // from older: https://github.com/hokulea/hokulea/issues/361
  test.skip('@name must be unique among fields', async function (assert) {
    setupOnerror((e: Error) => {
      assert.strictEqual(
        e.message,
        'Assertion Failed: You passed @name="givenName" to the form field, but this is already in use. Names of form fields must be unique!',
        'Expected assertion error message'
      );
    });

    const data = { givenName: 'John' };

    await render(
      <template>
        <Form @data={{data}} as |f|>
          <f.Text @name="givenName" @label="Given Name" />
          <f.Text @name="givenName" @label="Family Name" />
        </Form>
      </template>
    );
  });
});
