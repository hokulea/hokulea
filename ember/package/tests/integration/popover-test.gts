import { click, render } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';

import sinon from 'sinon';

import { Button, Popover, popover } from '#src' ;

module('Integration | (popover)', (hooks) => {
  setupRenderingTest(hooks);

  test('manual open and close', async (assert) => {
    const opened = sinon.spy();
    const closed = sinon.spy();

    await render(
      <template>
        {{#let (popover opened=opened closed=closed) as |p|}}
          <Button {{p.trigger}}>Popover</Button>

          <Popover {{p.target}}>
            content
          </Popover>

          {{#if p.opened}}<span data-opened />{{/if}}

          <Button @push={{p.open}} data-open>Open</Button>
          <Button @push={{p.close}} data-close>Close</Button>
        {{/let}}
      </template>
    );

    assert.dom('[data-opened]').doesNotExist();

    await click('[data-open]');
    assert.dom('[data-opened]').exists();
    assert.true(opened.calledOnce);

    await click('[data-close]');
    assert.dom('[data-opened]').doesNotExist();
    assert.true(closed.calledOnce);
  });
});
