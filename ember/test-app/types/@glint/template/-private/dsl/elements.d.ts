import type { AttrValue } from '@glint/template/-private/dsl';

declare module '@glint/template/-private/dsl/elements' {
  export declare namespace HtmlElementAttributes {
    interface GenericAttributes {
      ['part']: AttrValue;
    }

    interface HTMLTextAreaElementAttributes {
      ['type']: AttrValue;
    }
  }
}
