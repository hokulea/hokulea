import Component from '@glimmer/component';

import styles from './primitive-builder.css';
import PrimitiveBuilderAffix from './primitive-builder/affix';
import PrimitiveBuilderContent from './primitive-builder/content';

interface PrimitiveBuilderSignature<E = HTMLDivElement> {
  Element: E;
  Args: {
    element?: E;
  };
  Blocks: {
    default: [
      {
        /* eslint-disable @typescript-eslint/naming-convention */
        Content: PrimitiveBuilderContent;
        Affix: PrimitiveBuilderAffix;
        Prefix: PrimitiveBuilderAffix;
        Suffix: PrimitiveBuilderAffix;
        /* eslint-enable @typescript-eslint/naming-convention */
        // contentClass: string;
        // affixClass: string;
        // prefixClass: string;
        // suffixClass: string;
      }
    ];
  };
}

export default class PrimitiveBuilder extends Component<PrimitiveBuilderSignature> {
  styles = styles;

  contentComponent = PrimitiveBuilderContent;
  affixComponent = PrimitiveBuilderAffix;
}
