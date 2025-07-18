import { render } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';

import { Page } from '#src';
import { PagePageObject } from '#test-support';

module('Rendering | <Page>', (hooks) => {
  setupRenderingTest(hooks);

  test('it renders', async (assert) => {
    await render(
      <template>
        <Page @title="title" @description="description">Hello World</Page>
      </template>
    );

    const page = new PagePageObject();

    assert.dom(page).exists();
    assert.dom(page).hasTagName('main');
    assert.dom(page.$header).exists();
    assert.dom(page.$description).exists();
    assert.dom(page.$description).hasText('description');
    assert.dom(page.$title).hasTagName('h1');
    assert.dom(page.$title).hasText('title');

    assert.dom(page.$content).hasText('Hello World');
  });

  test('without header', async (assert) => {
    await render(
      <template>
        <Page>Hello World</Page>
      </template>
    );

    const page = new PagePageObject();

    assert.dom(page).exists();
    assert.dom(page.$header).doesNotExist();

    assert.dom(page.$content).includesText('Hello World');
  });

  test('with blocks', async (assert) => {
    await render(
      <template>
        <Page>
          <:title>Title</:title>
          <:description>description</:description>
          <:nav>nav here</:nav>
          <:content>Hello World</:content>
        </Page>
      </template>
    );

    const page = new PagePageObject();

    assert.dom(page).exists();
    assert.dom(page).hasTagName('main');
    assert.dom(page.$header).exists();
    assert.dom(page.$description).exists();
    assert.dom(page.$description).hasText('description');
    assert.dom(page.$title).hasTagName('h1');
    assert.dom(page.$title).hasText('Title');

    assert.dom(page.$content).hasText('Hello World');
  });

  test('nested page', async (assert) => {
    await render(
      <template>
        <Page>
          <:title>Main</:title>
          <:content>
            <Page>
              <:title>Section</:title>
              <:content>Content</:content>
            </Page>
          </:content>
        </Page>
      </template>
    );

    const pages = new PagePageObject();
    const [main, section] = pages;

    assert.strictEqual(pages.elements.length, 2);

    assert.dom(main).exists();
    assert.dom(main).hasTagName('main');
    assert.dom(main?.$title).hasText('Main');

    assert.dom(section).exists();
    assert.dom(section).hasTagName('section');
    assert.dom(section?.$title).hasText('Section');
  });
});
