import { render, setupOnerror } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';

import { Section } from '@hokulea/ember';

import { SectionPageObject } from '@hokulea/ember/test-support';

module('Rendering | <Section>', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    await render(
      <template>
        <Section @title='title'>Hello World</Section>
      </template>
    );

    const section = new SectionPageObject();

    assert.dom(section.element).exists();
    assert.dom(section.$header.element).hasText('title');
    assert.dom(section.$title.element).hasTagName('h2');

    assert.dom(section.element).includesText('Hello World');
  });

  test('without header', async function (assert) {
    await render(
      <template>
        <Section>Hello World</Section>
      </template>
    );

    const section = new SectionPageObject();

    assert.dom(section.element).exists();
    assert.dom(section.$header.element).doesNotExist();

    assert.dom(section.element).includesText('Hello World');
  });

  test('can do different levels', async function (assert) {
    await render(
      <template>
        <Section @title='title' @level='3'>Hello World</Section>
      </template>
    );

    const section = new SectionPageObject();

    assert.dom(section.element).exists();
    assert.dom(section.$header.element).hasText('title');
    assert.dom(section.$title.element).hasTagName('h3');
  });

  test('catches incorrect level', async function (assert) {
    // assert.expect(1);

    setupOnerror((e: Error) => {
      assert.strictEqual(
        e.message,
        `Assertion Failed: @level for <Section> must be between 1 and 6, received '7'`
      );
    });

    await render(
      <template>
        <Section @title='title' @level='7'>Hello World</Section>
      </template>
    );
  });
});
