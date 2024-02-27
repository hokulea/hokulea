declare module 'ember-svg-jar/helpers/svg-jar' {
  import Helper from '@ember/component/helper';

  import type { htmlSafe } from '@ember/template';

  type SafeString = ReturnType<typeof htmlSafe>;

  export interface SvgJarSignature {
    Args: {
      Positional: [assetId: string];
      Named: object;
    };
    Return: SafeString;
  }

  export default class SvgJarHelper extends Helper<SvgJarSignature> {}
}
