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
          'color-contrast': {
            enabled: false
          }
        }
      });

      await a11yAudit();
      assert.true(true, 'no a11y errors found!');
    });
  });

  module('Controls', function () {
    test('Inputs passes a11y audit', async function (assert) {
      await visit('/controls');

      setRunOptions({
        rules: {
          'color-contrast': {
            enabled: false
          },
          label: {
            enabled: false
          },

          'select-name': {
            enabled: false
          }
        }
      });

      await a11yAudit();
      assert.true(true, 'no a11y errors found!');
    });

    test('Composites passes a11y audit', async function (assert) {
      await visit('/controls/composites');

      setRunOptions({
        rules: {
          'color-contrast': {
            enabled: false
          },

          'aria-input-field-name': {
            enabled: false
          }
        }
      });

      await a11yAudit();
      assert.true(true, 'no a11y errors found!');
    });
  });
});
