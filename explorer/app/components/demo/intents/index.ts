import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

import styles from './index.css';

export default class DemoIntentTokens extends Component {
  styles = styles;

  intents = ['action', 'alternative', 'highlight', 'danger'];
  importanceLevels = ['fill', 'subtle', 'plain'];

  @tracked intent = 'action';
  @tracked importance = 'fill';
}
