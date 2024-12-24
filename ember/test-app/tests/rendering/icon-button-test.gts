import { render } from '@ember/test-helpers';
import { setupOnerror } from '@ember/test-helpers';
import { module, skip, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';

import sinon from 'sinon';

import { IconButton } from '@hokulea/ember';
import { Importance, Intent, Spacing } from '@hokulea/tokens';

import { IconButtonPageObject } from '@hokulea/ember/test-support';
import { linkFor, setupLink } from 'ember-link/test-support';

module('Rendering | <IconButton>', (hooks) => {
  setupRenderingTest(hooks);

  // eslint-disable-next-line qunit/require-expect
  test('it requires a label', async (assert) => {
    assert.expect(1);

    setupOnerror((e: Error) => {
      assert.strictEqual(
        e.message,
        'Assertion Failed: Please provide a `@label` to `<IconButton>` for accessibility reasons.',
        'Expected assertion error message'
      );
    });

    await render(
      <template>
        {{! @glint-ignore no-arg call }}
        <IconButton />
      </template>
    );
  });

  test('it renders with defaults', async (assert) => {
    await render(<template><IconButton @icon="acorn" @label="Hello" /></template>);

    const button = new IconButtonPageObject();

    assert.dom(button).exists();
    assert.dom(button).hasAria('label', 'Hello');

    assert.strictEqual(button.intent, Intent.Action);
    assert.strictEqual(button.importance, Importance.Supreme);

    assert.strictEqual(button.$icon.name, 'acorn');
    assert.strictEqual(button.$icon.style, 'regular');
  });

  module('Styling', function () {
    test('it can change the icon style', async (assert) => {
      await render(
        <template><IconButton @icon="acorn" @label="Hello" @iconStyle="thin" /></template>
      );

      const button = new IconButtonPageObject();

      assert.strictEqual(button.$icon.name, 'acorn');
      assert.strictEqual(button.$icon.style, 'thin');
    });

    test('it can change the intent', async (assert) => {
      await render(
        <template><IconButton @icon="acorn" @label="Hello" @intent={{Intent.Danger}} /></template>
      );

      const button = new IconButtonPageObject();

      assert.strictEqual(button.intent, Intent.Danger);
    });

    test('it can change the importance', async (assert) => {
      await render(
        <template>
          <IconButton @icon="acorn" @label="Hello" @importance={{Importance.Subtle}} />
        </template>
      );

      const button = new IconButtonPageObject();

      assert.strictEqual(button.importance, Importance.Subtle);
    });

    test('it can change spacing', async (assert) => {
      await render(
        <template>
          <IconButton @icon="acorn" @label="Hello" @spacing={{Spacing.MinusOne}} />
        </template>
      );

      const button = new IconButtonPageObject();

      assert.strictEqual(button.spacing, Spacing.MinusOne);
    });

    test('it can be disabled', async (assert) => {
      await render(
        <template><IconButton @icon="acorn" @label="Hello" @disabled={{true}} /></template>
      );

      const button = new IconButtonPageObject();

      assert.dom(button).hasAria('disabled', 'true');
    });
  });

  module('Behavior', function (behaviorHooks) {
    setupLink(behaviorHooks);

    // Originally, this was a `<span>` but with `<Menu>` this changed to a
    // `<button>` although doing nothing - I'm not sure about this.
    test('it renders as <button>, when no push behavior is given', async (assert) => {
      await render(<template><IconButton @icon="acorn" @label="Hello" /></template>);

      const button = new IconButtonPageObject();

      // assert.dom(button).hasTagName('span');
      assert.dom(button).hasTagName('button');
      assert.dom(button).hasAttribute('type', 'button');
    });

    test('it renders as <button>, when a function is given', async (assert) => {
      const push = sinon.spy();

      await render(<template><IconButton @icon="acorn" @label="Hello" @push={{push}} /></template>);

      const button = new IconButtonPageObject();

      assert.dom(button).hasTagName('button');
      assert.dom(button).hasAttribute('type', 'button');
    });

    test('it renders as <a>, when a link is given', async (assert) => {
      const link = linkFor('some.route');

      await render(<template><IconButton @icon="acorn" @label="Hello" @push={{link}} /></template>);

      const button = new IconButtonPageObject();

      assert.dom(button).hasTagName('a');
      assert.dom(button).doesNotHaveAttribute('type', 'button');
    });

    test('it will invoke functions', async (assert) => {
      const push = sinon.spy();

      await render(<template><IconButton @icon="acorn" @label="Hello" @push={{push}} /></template>);

      const button = new IconButtonPageObject();

      await button.push();

      assert.ok(push.calledOnce);
    });

    /**
     * Re-activate this, when `<CommandElement>` can be disabled itself.
     */
    skip('it will not invoke functions when disabled', async (assert) => {
      const push = sinon.spy();

      await render(
        <template>
          <IconButton @icon="acorn" @label="Hello" @push={{push}} @disabled={{true}} />
        </template>
      );

      const button = new IconButtonPageObject();

      await button.push();

      assert.notOk(push.calledOnce);
    });
  });
});
