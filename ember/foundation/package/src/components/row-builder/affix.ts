import Component from '@glimmer/component';

import styles from './affix.css';

interface RowBuilderAffixSignature {
  Element: HTMLSpanElement;
  Args: {
    class: string;
  };
  Blocks: {
    default: [];
  };
}

export default class RowBuilderAffix extends Component<RowBuilderAffixSignature> {
  styles = styles;
}
