import EmberComponent from '@ember/component';
import { sendEvent } from '@ember/object/events';
import { inject as service } from '@ember/service';
import Component from '@glimmer/component';
import { Owner } from '@glimmer/di';

import TheemoService from 'ember-theemo/services/theemo';

interface StorybookArgs {
  parent: {
    template: unknown;
    context?: object & {
      globals?: object;
    };
  };
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
        layout: args.parent.template,
        ...args.parent.context
      })
    );

    // handle globals
    const globals = args.parent.context?.globals ?? {};

    this.theemo.setTheme(globals.theme);
    this.theemo.setColorScheme(
      globals.scheme === 'system' ? undefined : globals.scheme
    );
  }
}
