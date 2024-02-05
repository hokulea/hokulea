import { render } from '@ember/test-helpers';
import { module, skip, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';

import sinon from 'sinon';

import { Button } from '@hokulea/ember';
import { Importance, Intent, Spacing } from '@hokulea/tokens';

import { ButtonPageObject } from '@hokulea/ember/test-support';
import { linkFor, setupLink } from 'ember-link/test-support';

module('Rendering | <Button>', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders with defaults', async function (assert) {
    await render(<template><Button>Hello World</Button></template>);

    const button = new ButtonPageObject();

    assert.dom(button.element).exists();
    assert.dom(button.element).hasText('Hello World');

    assert.strictEqual(button.intent, Intent.Action);
    assert.strictEqual(button.importance, Importance.Supreme);
  });

  module('Styling', function () {
    test('it can change the intent', async function (assert) {
      await render(<template><Button @intent={{Intent.Danger}} /></template>);

      const button = new ButtonPageObject();

      assert.strictEqual(button.intent, Intent.Danger);
    });

    test('it can change the importance', async function (assert) {
      await render(<template><Button @importance={{Importance.Subtle}} /></template>);

      const button = new ButtonPageObject();

      assert.strictEqual(button.importance, Importance.Subtle);
    });

    test('it can change spacing', async function (assert) {
      await render(<template><Button @spacing={{Spacing.MinusOne}} /></template>);

      const button = new ButtonPageObject();

      assert.strictEqual(button.spacing, Spacing.MinusOne);
    });

    test('it can be disabled', async function (assert) {
      await render(<template><Button @disabled={{true}} /></template>);

      const button = new ButtonPageObject();

      assert.dom(button.element).hasAria('disabled', 'true');
    });
  });

  module('Behavior', function (behaviorHooks) {
    setupLink(behaviorHooks);

    test('it renders as <span>, when no push behavior is given', async function (assert) {
      await render(<template><Button /></template>);

      const button = new ButtonPageObject();

      assert.dom(button.element).hasTagName('span');
    });

    test('it renders as <button>, when a function is given', async function (assert) {
      const push = sinon.spy();

      await render(<template><Button @push={{push}} /></template>);

      const button = new ButtonPageObject();

      assert.dom(button.element).hasTagName('button');
    });

    test('it renders as <a>, when a link is given', async function (assert) {
      const link = linkFor('some.route');

      await render(<template><Button @push={{link}} /></template>);

      const button = new ButtonPageObject();

      assert.dom(button.element).hasTagName('a');
    });

    test('it will invoke functions', async function (assert) {
      const push = sinon.spy();

      await render(<template><Button @push={{push}} /></template>);

      const button = new ButtonPageObject();

      await button.push();

      assert.ok(push.calledOnce);
    });

    /**
     * Re-activate this, when `<CommandElement>` can be disabled itself.
     */
    skip('it will not invoke functions when disabled', async function (assert) {
      const push = sinon.spy();

      await render(<template><Button @push={{push}} @disabled={{true}}>Hello</Button></template>);

      const button = new ButtonPageObject();

      await button.push();

      assert.notOk(push.calledOnce);
    });
  });

  module('Slots', function () {
    test('it has a before slot', async function (assert) {
      await render(<template>
        <Button>
          <:before>Hello</:before>
          <:label>Label</:label>
        </Button>
      </template>);

      const button = new ButtonPageObject();

      assert.dom(button.$before.element).exists();
      assert.dom(button.$label.element).exists();
      assert.dom(button.$after.element).doesNotExist();
      assert.dom(button.$before.element).hasText('Hello');
      assert.dom(button.$label.element).hasText('Label');
    });

    test('it has an after slot', async function (assert) {
      await render(<template>
        <Button>
          <:label>Label</:label>
          <:after>Afterwards</:after>
        </Button>
      </template>);

      const button = new ButtonPageObject();

      assert.dom(button.$before.element).doesNotExist();
      assert.dom(button.$label.element).exists();
      assert.dom(button.$after.element).exists();
      assert.dom(button.$label.element).hasText('Label');
      assert.dom(button.$after.element).hasText('Afterwards');
    });

    test('it works with label slot', async function (assert) {
      await render(<template>
        <Button>
          <:label>Label</:label>
        </Button>
      </template>);

      const button = new ButtonPageObject();

      assert.dom(button.$before.element).doesNotExist();
      assert.dom(button.$label.element).exists();
      assert.dom(button.$after.element).doesNotExist();
      assert.dom(button.$label.element).hasText('Label');
    });
  });
});
