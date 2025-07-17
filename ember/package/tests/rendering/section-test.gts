import { render, setupOnerror } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';

import { Section } from '#src';
import { SectionPageObject } from '#test-support';
import { testButNotOnCI } from '#tests/helpers.ts';

module('Rendering | <Section>', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    await render(
      <template>
        <Section @title="title">Hello World</Section>
      </template>
    );

    const section = new SectionPageObject();

    assert.dom(section).exists();
    assert.dom(section.$header).hasText('title');
    assert.dom(section.$title).hasTagName('h2');

    assert.dom(section).includesText('Hello World');
  });

  test('without header', async function (assert) {
    await render(
      <template>
        <Section>Hello World</Section>
      </template>
    );

    const section = new SectionPageObject();

    assert.dom(section).exists();
    assert.dom(section.$header).doesNotExist();

    assert.dom(section).includesText('Hello World');
  });

  test('can do different levels', async function (assert) {
    await render(
      <template>
        <Section @title="title" @level="3">Hello World</Section>
      </template>
    );

    const section = new SectionPageObject();

    assert.dom(section).exists();
    assert.dom(section.$header).hasText('title');
    assert.dom(section.$title).hasTagName('h3');
  });

  testButNotOnCI('catches incorrect level', async function (assert) {
    // assert.expect(1);

    setupOnerror((e: Error) => {
      assert.strictEqual(
        e.message,
        `Assertion Failed: @level for <Section> must be between 1 and 6, received '7'`
      );
    });

    await render(
      <template>
        <Section @title="title" @level="7">Hello World</Section>
      </template>
    );
  });
});
