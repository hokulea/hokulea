import Component from '@glimmer/component';

import styles from './base-card.css';

export interface CardSignature {
  Element: HTMLDivElement; // ElementFor<BaseCard>
  Blocks: {
    header?: [];
    footer?: [];
    main?: [];
    default?: [];
  };
}

export default class Card extends Component<CardSignature> {
  styles = styles;
}
