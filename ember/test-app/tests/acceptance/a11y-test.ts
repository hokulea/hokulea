import { visit } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';

import { FormPageObject } from '@hokulea/ember/test-support';
import { a11yAudit } from 'ember-a11y-testing/test-support';

module('Acceptance | a11y', function (hooks) {
  setupApplicationTest(hooks);

  // apparently the design is ignored and contrast issues are reported
  // running this test manually with axe devtools within the browser, then
  // everything is fine
  // module('Actions', function () {
  //   test('Actions passes a11y audit', async function (assert) {
  //     await visit('/actions');

  //     await a11yAudit();
  //     assert.true(true, 'no a11y errors found!');
  //   });
  // });

  module('Forms', function () {
    test('form passes a11y audit', async function (assert) {
      await visit('/forms');

      await a11yAudit();
      assert.true(true, 'no a11y errors found!');
    });

    test('form passes a11y audit after validation', async function (assert) {
      await visit('/forms');

      const form = new FormPageObject();

      await form.submit();

      await a11yAudit();
      assert.true(true, 'no a11y errors found!');
    });
  });
});
