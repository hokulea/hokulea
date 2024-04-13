// eslint-disable-next-line ember/no-classic-components
import Component from '@glimmer/component';
// eslint-disable-next-line ember/no-classic-components
import EmberComponent from '@ember/component';
import { inject as service } from '@ember/service';

import type Owner from '@ember/owner';
import type { TheemoService } from 'ember-theemo';

interface Globals {
  theme: string;
  scheme: string;
  writingMode: string;
  direction: string;
  density: string;
}

interface StorybookArgs {
  story: {
    template: unknown;
    context: Record<string, unknown>;
  };
  globals: Globals;
}

export default class StorybookComponent extends Component<StorybookArgs> {
  @service declare theemo: TheemoService;

  constructor(owner: Owner, args: StorybookArgs) {
    super(owner, args);

    // render original story
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    owner.register(
      'component:story',
      // eslint-disable-next-line ember/no-classic-classes, ember/require-tagless-components
      EmberComponent.extend({
        layout: args.story.template,
        ...args.story.context
      })
    );

    // handle globals
    const { globals } = args;

    // this.theemo.setTheme(globals.theme);
    // this.theemo.setColorScheme(globals.scheme === 'system' ? undefined : globals.scheme);

    // global: direction
    document.documentElement.dir = globals.direction;

    // global: writing mode

    // remove all wm-* classes
    for (const className of document.body.classList.values()) {
      if (className.startsWith('wm-')) {
        document.body.classList.remove(className);
      }
    }

    document.body.classList.add(`wm-${globals.writingMode}`);

    // global: density
    document.documentElement.dataset.density = globals.density !== 'default' ? globals.density : '';
  }
}
