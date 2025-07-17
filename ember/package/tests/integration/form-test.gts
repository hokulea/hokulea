import { render, setupOnerror } from '@ember/test-helpers';
import { module } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';

import { Form } from '#src';
import { testButNotOnCI } from '#tests/helpers.ts';

module('Integration | <Form>', function (hooks) {
  setupRenderingTest(hooks);

  testButNotOnCI('@name must be unique among fields', async function (assert) {
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
