import { ActiveDescendentStrategy } from '../navigation-patterns/active-descendent-strategy';
import { EndNavigation } from '../navigation-patterns/end-navigation';
import { HomeNavigation } from '../navigation-patterns/home-navigation';
import { MouseNavigation } from '../navigation-patterns/mouse-navigation';
import { NextNavigation } from '../navigation-patterns/next-navigation';
import { PreviousNavigation } from '../navigation-patterns/previous-navigation';
import { SelectionStrategy } from '../navigation-patterns/selection-strategy';
import { Control } from './control';

export class Listbox extends Control {
  capabilities = {
    singleSelection: true,
    multiSelection: true
  };

  constructor(element: HTMLElement) {
    super(element);

    this.registerNavigationPatterns([
      new NextNavigation(this, ['ArrowDown', 'ArrowRight']),
      new PreviousNavigation(this, ['ArrowUp', 'ArrowLeft']),
      new HomeNavigation(this),
      new EndNavigation(this),
      new MouseNavigation(this),
      new ActiveDescendentStrategy(this),
      new SelectionStrategy(this)
    ]);

    element.addEventListener('focusin', this.focus.bind(this));
  }

  teardown() {}

  readItems() {
    console.log('items', this, this.element.querySelectorAll('[role="option"]'));

    this.items = [...this.element.querySelectorAll('[role="option"]')] as HTMLElement[];
  }

  // event handlers
  focus() {
    console.log('focus', this);

    if (this.items.length === 0) {
      return;
    }

    if (this.selection.length > 0) {
      this.activateItem(this.selection[0]);
    } else {
      this.activateItem(this.items[0]);

      if (!this.multiple) {
        this.select([this.items[0]]);
      }
    }
  }

  // navigate(event: MouseEvent | KeyboardEvent) {
  //   this.navigationStrategy.navigate(event);
  // }

  // navigateHome(event: KeyboardEvent) {
  //   this.navigationStrategy.navigateHome(event);
  // }

  // navigateEnd(event: KeyboardEvent) {
  //   this.navigationStrategy.navigateEnd(event);
  // }

  // customHandler(event: Event) {
  //   const detail = (event as CustomEvent).detail;

  //   if (detail.command) {
  //     if (detail.command === 'navigate-next') {
  //       this.navigationStrategy.navigateNext(detail.originalEvent);
  //     } else if (detail.command === 'navigate-previous') {
  //       this.navigationStrategy.navigatePrevious(detail.originalEvent);
  //     } else if (detail.command === 'navigate-home') {
  //       this.navigationStrategy.navigateHome(detail.originalEvent);
  //     } else if (detail.command === 'navigate-end') {
  //       this.navigationStrategy.navigateEnd(detail.originalEvent);
  //     } else if (detail.command === 'focus') {
  //       this.focus();
  //     } else if (detail.command === 'select') {
  //       this.select(detail.selection);
  //     } else if (detail.command === 'activate-item') {
  //       this.activateItem(detail.item);
  //     }
  //   }
  // }
}
