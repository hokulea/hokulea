import { helper } from '@ember/component/helper';
import Component from '@glimmer/component';

export interface IntentTokensArgs {
  intent: 'action' | 'alternative' | 'highlight' | 'danger';
  importance: 'fill' | 'subtle' | 'plain';
}

export default class IntentTokensComponent extends Component<IntentTokensArgs> {
  states = ['base', 'active', 'hover', 'disabled'];
  colorProperties = ['background', 'border', 'text'];
  focusProperties = ['shadow'];

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
    ([category, prop]) =>
      `--${category}-intent-${this.args.intent}-${this.args.importance}-${prop}`
  );
}
