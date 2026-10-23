import { render } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';

import { Page, SectionedPage } from '#src';
import { SectionedPagePageObject } from '#test-support';

module('Rendering | Layouts | <SectionedPage>', (hooks) => {
  setupRenderingTest(hooks);

  test('it renders', async (assert) => {
    await render(
      <template>
        <SectionedPage @title="title" @description="description">Hello World</SectionedPage>
      </template>
    );

    const page = new SectionedPagePageObject();

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
        <SectionedPage>Hello World</SectionedPage>
      </template>
    );

    const page = new SectionedPagePageObject();

    assert.dom(page).exists();
    assert.dom(page.$header).doesNotExist();

    assert.dom(page.$content).includesText('Hello World');
  });

  test('with blocks', async (assert) => {
    await render(
      <template>
        <SectionedPage>
          <:title>Title</:title>
          <:description>description</:description>
          <:nav>nav here</:nav>
          <:content>Hello World</:content>
        </SectionedPage>
      </template>
    );

    const page = new SectionedPagePageObject();

    assert.dom(page).exists();
    assert.dom(page).hasTagName('main');
    assert.dom(page.$header).exists();
    assert.dom(page.$description).exists();
    assert.dom(page.$description).hasText('description');
    assert.dom(page.$nav).exists();
    assert.dom(page.$nav).hasText('nav here');
    assert.dom(page.$title).hasTagName('h1');
    assert.dom(page.$title).hasText('Title');

    assert.dom(page.$content).hasText('Hello World');
  });

  test('nested page', async (assert) => {
    await render(
      <template>
        <SectionedPage>
          <:title>Main</:title>
          <:content>
            <Page>
              <:title>Section</:title>
              <:content>Content</:content>
            </Page>
          </:content>
        </SectionedPage>
      </template>
    );

    const pages = new SectionedPagePageObject();
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
