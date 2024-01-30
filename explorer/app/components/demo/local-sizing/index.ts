import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

import styles from './index.css';

export default class LocalScaleDemoComponent extends Component {
  styles = styles;

  @tracked token = '--s0';
}
