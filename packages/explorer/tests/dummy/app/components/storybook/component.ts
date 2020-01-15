import Component from '@glimmer/component';
import EmberComponent from '@ember/component';
import Owner from '@ember/application';

interface StorybookArgs {
  parent: {
    template: any,
    context: any
  }
}

export default class StorybookComponent extends Component<StorybookArgs> {
  constructor(owner: Owner, args: StorybookArgs) {
    super(owner, args);

    owner.register(
      'component:story',
      EmberComponent.extend({
        layout: args.parent.template,
        ...args.parent.context,
      })
    );
  }
}
