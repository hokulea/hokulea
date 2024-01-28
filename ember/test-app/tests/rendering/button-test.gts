import { render } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';

import { Button } from '@hokulea/ember-actions';
import { ButtonPage } from '@hokulea/ember-actions/test-support';

module('Rendering | <Button>', (hooks) => {
  setupRenderingTest(hooks);

  test('Button2', async function(assert) {
    await render(<template><Button>Hello</Button></template>);
    const button = new ButtonPage();
    assert.dom(button.element).exists();
    // assert.dom('[data-test-button]').exists();
  });



  // module('default / fill', () => {
  //   test('basic use-case', async function (assert) {
  //     await render(hbs`<Button>click me!</Button>`);

  //     assert.dom('[data-test-button-content]').hasText('click me!');
  //   });

  //   test('basic composition use-case', async function (assert) {
  //     await render(hbs`
  //     <Button as |b|>
  //       <b.Content data-test-button-content>click me!</b.Content>
  //     </Button>
  //   `);

  //     assert.dom('[data-test-button-content]').hasText('click me!');
  //   });

  //   test('full composition use-case', async function (assert) {
  //     await render(hbs`
  //     <Button as |b|>
  //       <b.Prefix data-test-button-prefix>pre</b.Prefix>
  //       <b.Affix data-test-button-affix1>af1</b.Affix>
  //       <b.Content data-test-button-content>click me!</b.Content>
  //       <b.Affix data-test-button-affix2>af2</b.Affix>
  //       <b.Suffix data-test-button-suffix>suf</b.Suffix>
  //     </Button>
  //   `);

  //     assert.dom('[data-test-button-prefix]').hasText('pre');
  //     assert.dom('[data-test-button-affix1]').hasText('af1');
  //     assert.dom('[data-test-button-content]').hasText('click me!');
  //     assert.dom('[data-test-button-affix2]').hasText('af2');
  //     assert.dom('[data-test-button-suffix]').hasText('suf');
  //   });
  // });

  // module('subtle', () => {
  //   test('basic use-case', async function (assert) {
  //     await render(hbs`<SubtleButton>click me!</SubtleButton>`);

  //     assert.dom('[data-test-button-content]').hasText('click me!');
  //   });

  //   test('basic composition use-case', async function (assert) {
  //     await render(hbs`
  //       <SubtleButton as |b|>
  //         <b.Content data-test-button-content>click me!</b.Content>
  //       </SubtleButton>
  //     `);

  //     assert.dom('[data-test-button-content]').hasText('click me!');
  //   });

  //   test('full composition use-case', async function (assert) {
  //     await render(hbs`
  //       <SubtleButton as |b|>
  //         <b.Prefix data-test-subtle-button-prefix>pre</b.Prefix>
  //         <b.Affix data-test-subtle-button-affix1>af1</b.Affix>
  //         <b.Content data-test-subtle-button-content>click me!</b.Content>
  //         <b.Affix data-test-subtle-button-affix2>af2</b.Affix>
  //         <b.Suffix data-test-subtle-button-suffix>suf</b.Suffix>
  //       </SubtleButton>
  //     `);

  //     assert.dom('[data-test-subtle-button-prefix]').hasText('pre');
  //     assert.dom('[data-test-subtle-button-affix1]').hasText('af1');
  //     assert.dom('[data-test-subtle-button-content]').hasText('click me!');
  //     assert.dom('[data-test-subtle-button-affix2]').hasText('af2');
  //     assert.dom('[data-test-subtle-button-suffix]').hasText('suf');
  //   });
  // });
});
