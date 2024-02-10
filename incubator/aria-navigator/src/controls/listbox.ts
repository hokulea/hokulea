import { ListNavigationStrategy } from '../navigation-strategies/list-navigation';
import { Control } from './control';

export class Listbox extends Control {
  private navigationStrategy;

  constructor(element: HTMLElement) {
    super(element);
    this.navigationStrategy = new ListNavigationStrategy(this);

    element.addEventListener('mouseup', this.navigate);
    element.addEventListener('keydown', this.navigate);
    element.addEventListener('keyup', this.navigate);
    element.addEventListener('focusin', this.focus);
    element.addEventListener('listbox', this.customHandler);
  }

  teardown() {
    this.element.removeEventListener('mouseup', this.navigate);
    this.element.removeEventListener('keydown', this.navigate);
    this.element.removeEventListener('keyup', this.navigate);
    this.element.removeEventListener('focusin', this.focus);
    this.element.removeEventListener('listbox', this.customHandler);
  }

  readItems() {
    this.items = [...this.element.querySelectorAll('[role="option"]')] as HTMLElement[];
  }

  navigate(event: MouseEvent | KeyboardEvent) {
    this.navigationStrategy.navigate(event);
  }

  navigateHome(event: KeyboardEvent) {
    this.navigationStrategy.navigateHome(event);
  }

  navigateEnd(event: KeyboardEvent) {
    this.navigationStrategy.navigateEnd(event);
  }

  customHandler(event: Event) {
    const detail = (event as CustomEvent).detail;

    if (detail.command) {
      if (detail.command === 'navigate-next') {
        this.navigationStrategy.navigateNext(detail.originalEvent);
      } else if (detail.command === 'navigate-previous') {
        this.navigationStrategy.navigatePrevious(detail.originalEvent);
      } else if (detail.command === 'navigate-home') {
        this.navigationStrategy.navigateHome(detail.originalEvent);
      } else if (detail.command === 'navigate-end') {
        this.navigationStrategy.navigateEnd(detail.originalEvent);
      } else if (detail.command === 'focus') {
        this.focus();
      } else if (detail.command === 'select') {
        this.select(detail.selection);
      } else if (detail.command === 'activate-item') {
        this.activateItem(detail.item);
      }
    }
  }
}
