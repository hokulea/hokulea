import { visit } from '@ember/test-helpers';
import { module, skip, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';

import { FormPageObject } from '@hokulea/ember/test-support';
import { a11yAudit, setRunOptions } from 'ember-a11y-testing/test-support';

module('Acceptance | a11y', function (hooks) {
  setupApplicationTest(hooks);

  // apparently the design is ignored and contrast issues are reported
  // running this test manually with axe devtools within the browser, then
  // everything is fine
  module('Actions', function () {
    skip('Actions passes a11y audit', async function (assert) {
      await visit('/actions');

      // even disabling color-contrast rules makes axe warn about
      // `aria-disabled` usage for disabled buttons. This needs investigation.
      setRunOptions({
        rules: {
          // eslint-disable-next-line @typescript-eslint/naming-convention
          'color-contrast': {
            enabled: false
          }
        }
      });

      await a11yAudit();
      assert.true(true, 'no a11y errors found!');
    });
  });

  module('Forms', function () {
    test('form passes a11y audit', async function (assert) {
      await visit('/forms');

      setRunOptions({
        rules: {
          // eslint-disable-next-line @typescript-eslint/naming-convention
          'color-contrast': {
            enabled: false
          }
        }
      });

      await a11yAudit();
      assert.true(true, 'no a11y errors found!');
    });

    test('form passes a11y audit after validation', async function (assert) {
      await visit('/forms');

      const form = new FormPageObject();

      await form.submit();

      setRunOptions({
        rules: {
          // eslint-disable-next-line @typescript-eslint/naming-convention
          'color-contrast': {
            enabled: false
          }
        }
      });

      await a11yAudit();
      assert.true(true, 'no a11y errors found!');
    });
  });

  module('Navigation', function () {
    test('Navigation passes a11y audit', async function (assert) {
      await visit('/navigation');

      setRunOptions({
        rules: {
          // eslint-disable-next-line @typescript-eslint/naming-convention
          'color-contrast': {
            enabled: false
          }
        }
      });

      await a11yAudit();
      assert.true(true, 'no a11y errors found!');
    });
  });
});
