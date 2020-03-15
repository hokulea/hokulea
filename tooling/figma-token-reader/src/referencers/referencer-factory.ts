import { ReferencerConfig, ReferencerType } from '..';
import NullReferencer from './null-referencer';
import StyleReferencer from './plugin/style-referencer';
import Referencer from './referencer';

export default class ReferencerFactory {
  static create(config?: ReferencerConfig): Referencer {
    if (config?.type === ReferencerType.FigmaPlugin) {
      switch (config.plugin) {
        case 'style-referencer':
          return new StyleReferencer(config.options);

        default:
          return new NullReferencer();
      }
    }

    return new NullReferencer();
  }
}
