import Component from '@glimmer/component';

import styles from './content.css';

interface PrimitiveBuilderContentSignature {
  Element: HTMLSpanElement;
  Blocks: {
    default: [];
  };
}

export default class PrimitiveBuilderContent extends Component<PrimitiveBuilderContentSignature> {
  styles = styles;
}
