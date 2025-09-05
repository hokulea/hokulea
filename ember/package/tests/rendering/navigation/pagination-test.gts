import { tracked } from '@glimmer/tracking';
import { array } from '@ember/helper';
import { click, fillIn, render, rerender } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';

import sinon from 'sinon';

import { Pagination } from '#src';
import { PaginationPageObject } from '#test-support';

module('Rendering | Navigation | <Pagination>', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders wo/ pageSizes and no totalItems', async (assert) => {
    await render(<template><Pagination @pageSize={{10}} /></template>);

    const pagination = new PaginationPageObject();

    assert.dom(pagination).exists();
    assert.dom(pagination.$pageSize).doesNotExist();
    assert.dom(pagination.$items).exists();
    assert.dom(pagination.$items).hasText('1 – 10 items');
    assert.dom(pagination.$page).exists();
    assert.dom(pagination.$page).hasText('page 1');
    assert.dom(pagination.$page.$input).doesNotExist();
    assert.dom(pagination.$page.$select).doesNotExist();
    assert.dom(pagination.$prev).exists();
    assert.dom(pagination.$next).exists();
  });

  module('Part: Items', () => {
    test('totalItems are shown', async (assert) => {
      await render(<template><Pagination @pageSize={{10}} @totalItems={{1024}} /></template>);

      const pagination = new PaginationPageObject();

      assert.dom(pagination).exists();
      assert.dom(pagination.$items).hasText('1 – 10 of 1024 items');

      const label = (min: number, max: number, total: number) =>
        `${min} – ${max} von ${total} Einträgen`;

      await render(
        <template>
          <Pagination @pageSize={{10}} @totalItems={{1024}} @itemRangeLabel={{label}} />
        </template>
      );
      assert.dom(pagination.$items).hasText('1 – 10 von 1024 Einträgen');
    });

    test('items show range based on page and page size', async (assert) => {
      await render(<template><Pagination @pageSize={{10}} @page={{3}} /></template>);

      const pagination = new PaginationPageObject();

      assert.dom(pagination).exists();
      assert.dom(pagination.$items).hasText('21 – 30 items');

      const label = (min: number, max: number) => `${min} – ${max} Einträge`;

      await render(
        <template><Pagination @pageSize={{10}} @page={{3}} @itemLabel={{label}} /></template>
      );
      assert.dom(pagination.$items).hasText('21 – 30 Einträge');
    });
  });

  module('Part: Page Sizes', () => {
    test('page sizes can be selected', async (assert) => {
      await render(
        <template><Pagination @pageSize={{10}} @pageSizes={{array 10 20 30}} /></template>
      );

      const pagination = new PaginationPageObject();

      assert.dom(pagination).exists();
      assert.dom(pagination.$pageSize).exists();
      assert.dom(pagination.$pageSize).containsText('Items per page:');
      assert.dom(pagination.$pageSize.$select.$option[0]).hasValue('10');
      assert.dom(pagination.$pageSize.$select.$option[0]).hasText('10');
      assert.dom(pagination.$pageSize.$select.$option[1]).hasValue('20');
      assert.dom(pagination.$pageSize.$select.$option[1]).hasText('20');
      assert.dom(pagination.$pageSize.$select.$option[2]).hasValue('30');
      assert.dom(pagination.$pageSize.$select.$option[2]).hasText('30');

      await render(
        <template>
          <Pagination
            @pageSize={{10}}
            @pageSizes={{array 10 20 30}}
            @itemsPerPageLabel="Einträge pro Seite:"
          />
        </template>
      );

      assert.dom(pagination.$pageSize).containsText('Einträge pro Seite:');
    });

    test('page sizes render with label', async (assert) => {
      const pageSizes = [
        { label: 'Ten', value: 10 },
        { label: 'Twenty', value: 20 },
        { label: 'Thirty', value: 30 }
      ];

      await render(<template><Pagination @pageSize={{10}} @pageSizes={{pageSizes}} /></template>);

      const pagination = new PaginationPageObject();

      assert.dom(pagination).exists();
      assert.dom(pagination.$pageSize).exists();
      assert.dom(pagination.$pageSize.$select.$option[0]).hasValue('10');
      assert.dom(pagination.$pageSize.$select.$option[0]).hasText('Ten');
      assert.dom(pagination.$pageSize.$select.$option[1]).hasValue('20');
      assert.dom(pagination.$pageSize.$select.$option[1]).hasText('Twenty');
      assert.dom(pagination.$pageSize.$select.$option[2]).hasValue('30');
      assert.dom(pagination.$pageSize.$select.$option[2]).hasText('Thirty');
    });
  });

  module('Part: Page', () => {
    test('Unknown total size shows page number', async (assert) => {
      await render(<template><Pagination @pageSize={{10}} /></template>);

      const pagination = new PaginationPageObject();

      assert.dom(pagination).exists();
      assert.dom(pagination.$page).hasText('page 1');

      await render(<template><Pagination @pageSize={{10}} @page={{3}} /></template>);

      assert.dom(pagination.$page).hasText('page 3');

      const label = (page: number) => `Seite ${page}`;

      await render(
        <template><Pagination @pageSize={{10}} @page={{3}} @pageLabel={{label}} /></template>
      );

      assert.dom(pagination.$page).hasText('Seite 3');
    });

    test('Different label, when total items are known', async (assert) => {
      await render(<template><Pagination @pageSize={{10}} @totalItems={{100}} /></template>);

      const pagination = new PaginationPageObject();

      assert.dom(pagination).exists();
      assert.dom(pagination.$page).containsText('of 10 pages');

      const label = (total: number) => `von ${total} Seiten`;

      await render(
        <template>
          <Pagination @pageSize={{10}} @totalItems={{100}} @pageRangeLabel={{label}} />
        </template>
      );

      assert.dom(pagination.$page).containsText('von 10 Seiten');
    });

    test('Select to choose pages is shown', async (assert) => {
      await render(<template><Pagination @pageSize={{10}} @totalItems={{100}} /></template>);

      const pagination = new PaginationPageObject();

      assert.dom(pagination).exists();
      assert.dom(pagination.$page.$select).exists();
    });

    test('Input is shown, when there are more than 20 pages', async (assert) => {
      await render(<template><Pagination @pageSize={{10}} @totalItems={{1000}} /></template>);

      const pagination = new PaginationPageObject();

      assert.dom(pagination).exists();
      assert.dom(pagination.$page.$input).exists();
    });
  });

  module('Part: Nav', () => {
    test('Prev button is there', async (assert) => {
      await render(<template><Pagination @pageSize={{10}} /></template>);

      const pagination = new PaginationPageObject();

      assert.dom(pagination).exists();
      assert.dom(pagination.$prev).exists();
      assert.dom(pagination.$prev).hasAria('label', 'Previous page');

      await render(
        <template><Pagination @pageSize={{10}} @backwardLabel="Vorherige Seite" /></template>
      );

      assert.dom(pagination.$prev).hasAria('label', 'Vorherige Seite');
    });

    test('Next button is there', async (assert) => {
      await render(<template><Pagination @pageSize={{10}} /></template>);

      const pagination = new PaginationPageObject();

      assert.dom(pagination).exists();
      assert.dom(pagination.$next).exists();
      assert.dom(pagination.$next).hasAria('label', 'Next page');

      await render(
        <template><Pagination @pageSize={{10}} @forwardLabel="Nächste Seite" /></template>
      );

      assert.dom(pagination.$next).hasAria('label', 'Nächste Seite');
    });
  });

  module('Navigation Behavior', () => {
    const change = sinon.spy();

    test('next increases the page', async (assert) => {
      await render(<template><Pagination @pageSize={{10}} @change={{change}} /></template>);

      const pagination = new PaginationPageObject();

      await click(pagination.$next);

      assert.ok(change.calledWith({ pageSize: 10, page: 2 }));
    });

    test('prev dereases the page', async (assert) => {
      await render(
        <template><Pagination @pageSize={{10}} @page={{5}} @change={{change}} /></template>
      );

      const pagination = new PaginationPageObject();

      await click(pagination.$prev);

      assert.ok(change.calledWith({ pageSize: 10, page: 4 }));
    });

    test('changing page size', async (assert) => {
      await render(
        <template>
          <Pagination @pageSize={{10}} @pageSizes={{array 10 20 30}} @change={{change}} />
        </template>
      );

      const pagination = new PaginationPageObject();

      await pagination.$pageSize.$select.select('20');

      assert.ok(change.calledWith({ pageSize: 20, page: 1 }));
    });

    test('changing page from select', async (assert) => {
      await render(
        <template><Pagination @pageSize={{10}} @totalItems={{100}} @change={{change}} /></template>
      );

      const pagination = new PaginationPageObject();

      await pagination.$page.$select.select('5');

      assert.ok(change.calledWith({ pageSize: 10, page: 5 }));
    });

    test('changing page from input', async (assert) => {
      await render(
        <template><Pagination @pageSize={{10}} @totalItems={{1000}} @change={{change}} /></template>
      );

      const pagination = new PaginationPageObject();

      await fillIn(pagination.$page.$input, '20');

      assert.ok(change.calledWith({ pageSize: 10, page: 20 }));
    });
  });

  module('Reactivity', () => {
    class Context {
      @tracked page = 3;
      @tracked pageSize = 10;
      @tracked totalItems?: number;
    }

    test('page is reactive', async (assert) => {
      const ctx = new Context();

      await render(
        <template>
          <Pagination
            @pageSize={{ctx.pageSize}}
            @page={{ctx.page}}
            @totalItems={{ctx.totalItems}}
          />
        </template>
      );

      const pagination = new PaginationPageObject();

      assert.dom(pagination.$items).hasText('21 – 30 items');
      assert.dom(pagination.$page).hasText('page 3');

      ctx.page = 5;
      await rerender();

      assert.dom(pagination.$items).hasText('41 – 50 items');
      assert.dom(pagination.$page).hasText('page 5');
    });

    test('pageSize is reactive', async (assert) => {
      const ctx = new Context();

      await render(
        <template>
          <Pagination
            @pageSize={{ctx.pageSize}}
            @pageSizes={{array 10 20 30}}
            @page={{ctx.page}}
            @totalItems={{ctx.totalItems}}
          />
        </template>
      );

      const pagination = new PaginationPageObject();

      assert.dom(pagination.$items).hasText('21 – 30 items');
      assert.dom(pagination.$page).hasText('page 3');
      assert.dom(pagination.$pageSize.$select).hasValue('10');

      ctx.pageSize = 20;
      await rerender();

      assert.dom(pagination.$items).hasText('41 – 60 items');
      assert.dom(pagination.$pageSize.$select).hasValue('20');
    });

    test('totalItems is reactive', async (assert) => {
      const ctx = new Context();

      await render(
        <template>
          <Pagination
            @pageSize={{ctx.pageSize}}
            @page={{ctx.page}}
            @totalItems={{ctx.totalItems}}
          />
        </template>
      );

      const pagination = new PaginationPageObject();

      assert.dom(pagination.$items).hasText('21 – 30 items');
      assert.dom(pagination.$page).hasText('page 3');
      assert.dom(pagination.$page.$input).doesNotExist();
      assert.dom(pagination.$page.$select).doesNotExist();

      ctx.totalItems = 100;
      await rerender();

      assert.dom(pagination.$items).hasText('21 – 30 of 100 items');
      assert.dom(pagination.$page.$input).doesNotExist();
      assert.dom(pagination.$page.$select).exists();
      assert.dom(pagination.$page.$select).hasValue('3');

      ctx.totalItems = 1000;
      await rerender();

      assert.dom(pagination.$items).hasText('21 – 30 of 1000 items');
      assert.dom(pagination.$page.$select).doesNotExist();
      assert.dom(pagination.$page.$input).exists();
      assert.dom(pagination.$page.$input).hasValue('3');
    });
  });
});
