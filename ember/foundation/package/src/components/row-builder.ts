import Component from '@glimmer/component';

import styles from './row-builder.css';

import type RowBuilderAffix from './row-builder/affix';
import type RowBuilderContent from './row-builder/content';

interface RowBuilderSignature<E = HTMLDivElement> {
  Element: E;
  Args: {
    element?: E;
  };
  Blocks: {
    default: [
      {
        /* eslint-disable @typescript-eslint/naming-convention */
        Content: RowBuilderContent;
        Affix: RowBuilderAffix;
        Prefix: RowBuilderAffix;
        Suffix: RowBuilderAffix;
        /* eslint-enable @typescript-eslint/naming-convention */
        contentClass: string;
        affixClass: string;
        prefixClass: string;
        suffixClass: string;
      }
    ];
  };
}

export default class RowBuilder extends Component<RowBuilderSignature> {
  styles = styles;
}
