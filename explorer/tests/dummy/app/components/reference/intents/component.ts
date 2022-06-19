import { helper } from '@ember/component/helper';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

export default class IntentsComponent extends Component {
  states = ['base', 'active', 'hover', 'disabled'];
  colorProperties = ['background', 'border', 'text'];
  focusProperties = ['shadow'];

  intents = ['action', 'alternative', 'highlight', 'danger'];
  importanceLevels = ['fill', 'subtle', 'plain'];

  @tracked intent = 'action';
  @tracked importance = 'fill';

  get colors(): string[] {
    const colors = [];
    for (const state of this.states) {
      for (const prop of this.colorProperties) {
        colors.push(`${state}-${prop}`);
      }
    }

    return colors;
  }

  compileName = helper(
    ([type, prop]) =>
      `--intent-${this.intent}-${this.importance}-${prop}-${type}`
  );
}
