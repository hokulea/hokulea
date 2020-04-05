import Component from '@glimmer/component';
import { Owner } from '@glimmer/di';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';

import MakeupService from 'ember-makeup/services/makeup';
// @ts-ignore
import styles from './styles';

// import TheemoService from 'ember-theemo/services/theemo';


export default class ThemeSwitcherComponent extends Component {

  @service theemo!;

  @service makeup!: MakeupService;

  private dummy!: HTMLDivElement;

  get themeNames() {
    return Object.keys(this.makeup.themePaths);
  }

  constructor(owner: Owner, args: object) {
    super(owner, args);

    this.makeup.on('theme-change', () => {
      this.activateContext(this.context);
    });
  }

  @tracked
  context: string = 'light';

  @action
  setupDummy(elem: HTMLDivElement) {
    this.dummy = elem;
    this.dummy.style.display = 'none';
  }

  @action
  switchContext(event: MouseEvent) {
    const checked = (event.target as HTMLInputElement).checked;
    this.activateContext(checked ? 'dark' : 'light');
  }

  private activateContext(context: string) {
    const className = this.makeup.resolveContext(`context.${this.context}`);
    console.log('className', className);

    if (className) {
      const bodyList = document.body.classList;
      bodyList.remove(className);
      this.context = context;

      bodyList.add(this.makeup.resolveContext(`context.${this.context}`) ?? '');
    }
  }

  @action
  selectMakeupTheme(theme: string) {
    this.makeup.setTheme(theme);
  }

  @action
  selectTheemoTheme(theme: string) {
    this.theemo.setTheme(theme);
  }

  @action
  selectTheemoScheme(scheme: string | undefined) {
    this.theemo.setColorScheme(scheme);
  }
}
