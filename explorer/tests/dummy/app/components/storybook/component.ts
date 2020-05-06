import EmberComponent from '@ember/component';
import { inject as service } from '@ember/service';
import Component from '@glimmer/component';
import { Owner } from '@glimmer/di';

import TheemoService from 'ember-theemo/services/theemo';

interface Globals {
  theme: string;
  scheme: string;
  writingMode: string;
  direction: string;
}

interface StorybookArgs {
  story: {
    template: unknown;
    context: object;
  };
  globals: Globals;
}

export default class StorybookComponent extends Component<StorybookArgs> {
  @service theemo!: TheemoService;

  constructor(owner: Owner, args: StorybookArgs) {
    super(owner, args);

    // render original story
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    owner.register(
      'component:story',
      EmberComponent.extend({
        layout: args.story.template,
        ...args.story.context
      })
    );

    // handle globals
    const { globals } = args;

    this.theemo.setTheme(globals.theme);
    this.theemo.setColorScheme(
      globals.scheme === 'system' ? undefined : globals.scheme
    );

    document.documentElement.dir = globals.direction;

    // remove all wm-* classes
    for (const className of document.body.classList.values()) {
      if (className.startsWith('wm-')) {
        document.body.classList.remove(className);
      }
    }

    document.body.classList.add(`wm-${globals.writingMode}`);
  }
}
