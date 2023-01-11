import Component from '@glimmer/component';

import styles from './base-card.css';

export interface BaseCardSignature<E extends Element = HTMLDivElement> {
  Element: E;
}

export default class BaseCard<E extends Element = HTMLDivElement> extends Component<
  BaseCardSignature<E>
> {
  styles = styles;
}
