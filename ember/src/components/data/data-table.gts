import type { TOC } from '@ember/component/template-only';
import type { ComponentLike, ContentValue } from '@glint/template';

interface DataTableHeader {
  name: string;
  content: ContentValue;
}

interface DataTableSignature {
  Element: HTMLTableElement;
  Args: {
    header: DataTableHeader[];
    rows: Record<string, ContentValue | ComponentLike>[];
  };
  Blocks: {
    default: [];
  };
}

function get(haystack: Record<string, ContentValue | ComponentLike>, key: string): ContentValue {
  return key in haystack ? (haystack[key] as ContentValue) : '';
}

export const DataTable: TOC<DataTableSignature> = <template>
  <table class="data-table" data-test-data-table>
    <thead>
      <tr>
        {{#each @header as |header|}}
          <th>{{header.content}}</th>
        {{/each}}
      </tr>
    </thead>
    <tbody>
      {{#each @rows as |row|}}
        <tr>
          {{#each @header as |header|}}
            <td>
              {{#let (get row header.name) as |c|}}
                {{c}}
              {{/let}}
            </td>
          {{/each}}
        </tr>
      {{/each}}
    </tbody>

    {{#if (has-block "pagination")}}
      <tfoot>
        <tr>
          <td colspan="100%" data-pagination>
            {{yield to="pagination"}}
          </td>
        </tr>
      </tfoot>
    {{/if}}
  </table>
</template>;
