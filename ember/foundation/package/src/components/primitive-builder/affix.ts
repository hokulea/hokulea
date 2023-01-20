import Component from '@glimmer/component';

import styles from '../primitive-builder.css';

interface PrimitiveBuilderAffixSignature {
  Element: HTMLSpanElement;
  Args: {
    class: string;
  };
  Blocks: {
    default: [];
  };
}

export default class PrimitiveBuilderAffix extends Component<PrimitiveBuilderAffixSignature> {
  styles = styles;
}
