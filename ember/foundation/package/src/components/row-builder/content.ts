import Component from '@glimmer/component';

import styles from './content.css';

interface RowBuilderContentSignature {
  Element: HTMLSpanElement;
  Blocks: {
    default: [];
  };
}

export default class RowBuilderContent extends Component<RowBuilderContentSignature> {
  styles = styles;
}
