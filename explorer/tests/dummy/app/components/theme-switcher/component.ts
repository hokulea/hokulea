import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import Component from '@glimmer/component';

import TheemoService from 'ember-theemo/services/theemo';

export default class ThemeSwitcherComponent extends Component {
  @service theemo!: TheemoService;

  @action
  selectTheemoTheme(theme: string) {
    this.theemo.setTheme(theme);
  }

  @action
  selectTheemoScheme(scheme: string | undefined) {
    this.theemo.setColorScheme(scheme);
  }
}
