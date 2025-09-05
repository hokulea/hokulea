import { render } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';

import { DataTable, Pagination } from '#src';

import { DataTablePageObject } from '#src/test-support/index.ts';

import type { TOC } from '@ember/component/template-only';

const Tag: TOC<{ Blocks: { default: [] } }> = <template>
  <span ...attributes>{{yield}}</span>
</template>;

const header = [
  {
    name: 'givenName',
    content: 'Given Name'
  },
  {
    name: 'familyName',
    content: 'Family Name'
  },
  {
    name: 'lightsaber',
    content: 'Lightsaber'
  }
];

const rows = [
  {
    givenName: 'Anakin',
    familyName: 'Skywalker',
    lightsaber: <template>
      <Tag>blue</Tag>
    </template>
  },
  {
    givenName: 'Obi Wan',
    familyName: 'Kenobi',
    lightsaber: <template>
      <Tag>green</Tag>
    </template>
  },
  {
    givenName: 'Ahsoka',
    familyName: 'Tano',
    lightsaber: <template>
      <Tag>white</Tag>
    </template>
  }
];

module('Rendering | Data | <DataTable>', function (hooks) {
  setupRenderingTest(hooks);

  test('basic example', async (assert) => {
    await render(<template><DataTable @header={{header}} @rows={{rows}} /></template>);

    const table = new DataTablePageObject();

    assert.dom(table.$col).exists({ count: 3 });
    assert.dom(table.$rows).exists({ count: 3 });
    assert.dom(table.$paginationFooter).doesNotExist();
  });

  test('slot for pagination', async (assert) => {
    await render(
      <template>
        <DataTable @header={{header}} @rows={{rows}}>
          <:pagination>
            <Pagination @pageSize={{10}} />
          </:pagination>
        </DataTable>
      </template>
    );

    const table = new DataTablePageObject();

    assert.dom(table.$paginationFooter).exists();
    assert.dom(table.$paginationFooter.$pagination).exists();
  });
});
