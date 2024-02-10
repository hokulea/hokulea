import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { helper } from '@ember/component/helper';

import { Importance, Intent } from '@hokulea/tokens';

export default class IntentsComponent extends Component {
  states = ['base', 'active', 'hover', 'disabled'];
  colorProperties = ['background', 'border', 'text'];
  focusProperties = ['shadow'];

  intents = [Intent.Action, Intent.Alternative, Intent.Highlight, Intent.Danger];
  importanceLevels = [Importance.Supreme, Importance.Subtle, Importance.Plain];

  @tracked intent = Intent.Action;
  @tracked importance = Importance.Subtle;

  get colors(): string[] {
    const colors = [];

    for (const state of this.states) {
      for (const prop of this.colorProperties) {
        colors.push(`${state}-${prop}`);
      }
    }

    return colors;
  }

  compileName = helper(([prop]) => `--intent-${this.intent}-${this.importance}-${prop}`);
}
