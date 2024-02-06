import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { helper } from '@ember/component/helper';

export default class IndicatorsComponent extends Component {
  colorProperties = ['background', 'border', 'text'];
  focusProperties = ['shadow'];

  indicators = ['success', 'info', 'warning', 'error'];
  importanceLevels = ['fill', 'subtle', 'plain'];

  @tracked indicator = 'success';

  get colors(): string[] {
    const colors = [];

    for (const importance of this.importanceLevels) {
      for (const prop of this.colorProperties) {
        colors.push(`${importance}-${prop}`);
      }
    }

    return colors;
  }

  compileName = helper(([type, prop]) => `--indicator-${this.indicator}-${prop}-${type}`);
}
