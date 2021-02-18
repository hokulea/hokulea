import { render } from '@ember/test-helpers';
import { setupRenderingTest } from 'ember-qunit';
import { module, test } from 'qunit';

import { hbs } from 'ember-cli-htmlbars';
import { TestContext as BaseTestContext } from 'ember-test-helpers';

import sinon from 'sinon';

import { SelectPageObject } from '@hokulea/inputs/test-support/page-objects';

interface TestContext extends BaseTestContext {
  options: string[];
  select: sinon.SinonSpy;
}

module('Rendering | Component | <Select>', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders properly', async function (this: TestContext, assert) {
    await render(hbs`<Select></Select>`);

    assert.dom(SelectPageObject.root).exists();
    assert.dom(SelectPageObject.trigger).exists();
    assert.dom(SelectPageObject.trigger).hasAria('expanded', 'false');
    assert.dom(SelectPageObject.list).exists();
    assert.dom(SelectPageObject.list).hasAttribute('tabindex', '-1');
    assert.dom(SelectPageObject.list).hasStyle({
      opacity: '0'
    });
  });

  test('it opens', async function (assert) {
    await render(hbs`<Select></Select>`);
    await SelectPageObject.open();

    assert.dom(SelectPageObject.trigger).hasAria('expanded', 'true');
    assert.dom(SelectPageObject.list).hasStyle({
      opacity: '1'
    });
  });

  test('options are rendering', async function (this: TestContext, assert) {
    this.options = ['apple', 'banana', 'pineapple'];
    await render(hbs`
      <Select
        @options={{this.options}}
        as |option|
      >
        {{option}}
      </Select>
    `);
    await SelectPageObject.open();

    assert.dom(SelectPageObject.option).exists({ count: 3 });
  });

  test('select is invoked', async function (this: TestContext, assert) {
    this.options = ['apple', 'banana', 'pineapple'];
    this.select = sinon.spy();
    await render(hbs`
      <Select
        @options={{this.options}}
        as |option|
      >
        {{option}}
      </Select>
    `);
    await SelectPageObject.select('apple');

    assert.ok(this.select.calledOnceWith('apple'));
  });
});
