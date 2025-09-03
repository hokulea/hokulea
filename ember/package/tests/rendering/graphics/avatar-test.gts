import { render } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';

import { Avatar } from '#src';

import { AvatarPageObject } from '#src/test-support/index.ts';

module('Rendering | Graphics | <Avatar>', (hooks) => {
  setupRenderingTest(hooks);

  test('it renders with image', async (assert) => {
    await render(
      <template>
        <Avatar @src="https://avatars.githubusercontent.com/u/283700?v=4" @name="Thomas Gossmann" />
      </template>
    );

    const avatar = new AvatarPageObject();

    assert.dom(avatar).exists();
    assert.dom(avatar.$img).exists();
    assert
      .dom(avatar.$img)
      .hasAttribute('src', 'https://avatars.githubusercontent.com/u/283700?v=4');
    assert.dom(avatar.$img).hasAttribute('alt', 'Thomas Gossmann');
  });

  test('it renders with initials', async (assert) => {
    await render(<template><Avatar @name="Thomas Gossmann" /></template>);

    const avatar = new AvatarPageObject();

    assert.dom(avatar).exists();
    assert.dom(avatar.$span).exists();
    assert.dom(avatar.$span).containsText('T G');
  });

  test('it renders fallback svg', async (assert) => {
    await render(<template><Avatar /></template>);

    const avatar = new AvatarPageObject();

    assert.dom(avatar).exists();
    assert.dom(avatar.$svg).exists();
  });
});
