import { render } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';

import { Alert } from '#src';
import { AlertPageObject } from '#test-support';

import { Importance, Indicator } from '@hokulea/tokens';

module('Rendering | Feedback | <Alert>', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders with defaults', async function (assert) {
    await render(
      <template>
        <Alert>Hello World</Alert>
      </template>
    );

    const alert = new AlertPageObject();

    assert.dom(alert).exists();
    assert.dom(alert).hasNoAttribute('role');
    assert.dom(alert).hasText('Hello World');
    assert.dom(alert.$content).hasText('Hello World');

    assert.strictEqual(alert.indicator, Indicator.Neutral);
    assert.strictEqual(alert.importance, Importance.Supreme);
  });

  test('it can take a title', async function (assert) {
    await render(
      <template>
        <Alert @title="Title goes here">Hello World</Alert>
      </template>
    );

    const alert = new AlertPageObject();

    assert.dom(alert).exists();
    assert.dom(alert.$title).hasText('Title goes here');
    assert.dom(alert.$content).hasText('Hello World');
  });

  test('it can take a custom icon', async function (assert) {
    const ListIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="256"
      height="256" data-custom-icon viewBox="0 0
      256 256"><path fill="currentColor" d="M224 128a8 8 0 0 1-8 8H40a8 8 0 0 1
      0-16h176a8 8 0 0 1 8 8M40 72h176a8 8 0 0 0 0-16H40a8 8 0 0 0 0 16m176 112H40a8
      8 0 0 0 0 16h176a8 8 0 0 0 0-16"/></svg>
    `;

    await render(
      <template>
        <Alert @icon={{ListIcon}}>Hello World</Alert>
      </template>
    );

    const alert = new AlertPageObject();

    assert.dom(alert).exists();
    assert.dom('[data-custom-icon]').exists();
  });

  module('Accessibility', function () {
    test('no role for info', async function (assert) {
      await render(<template><Alert @indicator={{Indicator.Info}} /></template>);

      const alert = new AlertPageObject();

      assert.dom(alert).hasNoAttribute('role');
    });

    test('role is alert for success', async function (assert) {
      await render(<template><Alert @indicator={{Indicator.Success}} /></template>);

      const alert = new AlertPageObject();

      assert.dom(alert).hasAttribute('role', 'alert');
    });

    test('role is alert for warning', async function (assert) {
      await render(<template><Alert @indicator={{Indicator.Warning}} /></template>);

      const alert = new AlertPageObject();

      assert.dom(alert).hasAttribute('role', 'alert');
    });

    test('role is alertdialog for error', async function (assert) {
      await render(<template><Alert @indicator={{Indicator.Error}} /></template>);

      const alert = new AlertPageObject();

      assert.dom(alert).hasAttribute('role', 'alertdialog');
    });

    test('title is assigned as aria-labelledby', async function (assert) {
      await render(
        <template>
          <Alert @title="Title goes here">Hello World</Alert>
        </template>
      );

      const alert = new AlertPageObject();

      assert.dom(alert).hasAria('labelledby');
      assert.dom(alert).hasAttribute('aria-labelledby', (alert.$title.element as HTMLElement).id);
    });

    test('title is assigned as aria-labelledby [block invocation]', async function (assert) {
      await render(
        <template>
          <Alert @title="Title goes here">
            <:title>Title goes here</:title>
            <:content>Hello World</:content>
          </Alert>
        </template>
      );

      const alert = new AlertPageObject();

      assert.dom(alert).hasAria('labelledby');
      assert.dom(alert).hasAttribute('aria-labelledby', (alert.$title.element as HTMLElement).id);
    });
  });

  module('Styling', function () {
    test('it can change the indicator', async function (assert) {
      await render(<template><Alert @indicator={{Indicator.Error}} /></template>);

      const alert = new AlertPageObject();

      assert.strictEqual(alert.indicator, Indicator.Error);
    });

    test('it can change the importance', async function (assert) {
      await render(<template><Alert @importance={{Importance.Supreme}} /></template>);

      const alert = new AlertPageObject();

      assert.strictEqual(alert.importance, Importance.Supreme);
    });
  });

  module('Slots', function () {
    test('it has a title slot', async function (assert) {
      await render(
        <template>
          <Alert>
            <:title>Title goes here</:title>
          </Alert>
        </template>
      );

      const alert = new AlertPageObject();

      assert.dom(alert.$title).exists();
      assert.dom(alert.$content).exists();
      assert.dom(alert.$actions).doesNotExist();
      assert.dom(alert.$title).hasText('Title goes here');
    });

    test('it has a content slot', async function (assert) {
      await render(
        <template>
          <Alert>
            <:title>Title goes here</:title>
            <:content>Here the message</:content>
          </Alert>
        </template>
      );

      const alert = new AlertPageObject();

      assert.dom(alert.$title).exists();
      assert.dom(alert.$content).exists();
      assert.dom(alert.$actions).doesNotExist();
      assert.dom(alert.$title).hasText('Title goes here');
      assert.dom(alert.$content).hasText('Here the message');
    });

    test('it works with actions slot', async function (assert) {
      await render(
        <template>
          <Alert>
            <:actions>Do sth.</:actions>
          </Alert>
        </template>
      );

      const alert = new AlertPageObject();

      assert.dom(alert.$title).doesNotExist();
      assert.dom(alert.$content).exists();
      assert.dom(alert.$actions).exists();
      assert.dom(alert.$actions).hasText('Do sth.');
    });
  });
});
