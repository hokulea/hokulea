import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { helper } from '@ember/component/helper';

import { Importance, Indicator } from '@hokulea/tokens';

export default class IndicatorsComponent extends Component {
  colorProperties = ['background', 'border', 'text'];
  focusProperties = ['shadow'];

  indicators = [Indicator.Success, Indicator.Info, Indicator.Warning, Indicator.Error];
  importanceLevels = [Importance.Supreme, Importance.Subtle, Importance.Plain];

  @tracked indicator = Indicator.Success;

  get colors(): string[] {
    const colors = [];

    for (const importance of this.importanceLevels) {
      for (const prop of this.colorProperties) {
        colors.push(`${importance}-${prop}`);
      }
    }

    return colors;
  }

  // eslint-disable-next-line unicorn/consistent-function-scoping
  compileName = helper(([prop]: [string]) => `--indicator-${this.indicator}-${prop}`);
}
