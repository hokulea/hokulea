import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

export default class DemoIntentTokens extends Component {
  intents = ['action', 'alternative', 'highlight', 'danger'];
  importanceLevels = ['fill', 'subtle', 'plain'];

  @tracked intent = 'action';
  @tracked importance = 'fill';
}
