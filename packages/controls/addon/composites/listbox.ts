import { action } from '@ember/object';

import { match } from 'ts-pattern';

import {
  scrollDownwardsToItem,
  scrollUpwardsToItem
} from '@hokulea/controls/composites/dom/scroll';
import { KeyboardCollectionNavigationListener } from '@hokulea/controls/composites/navigation-strategies/keyboard-collection-navigation';

import Composite, { Features, Selectors } from './composite';
import {
  FocusManagementEmitter,
  FocusManagementOptions
} from './features/focus-management-feature';
import {
  SelectionEmitter,
  SelectionOptions
} from './features/selection-feature';
import AriaCurrentStrategy from './focus-management/aria-current-strategy';
import KeyboardBlockNavigationStrategy from './navigation-strategies/keyboard-block-navigation';
import KeyboardEdgeNavigationStrategy, {
  KeyboardEdgeNavigationListener
} from './navigation-strategies/keyboard-edge-navigation';
import MouseInvokeNavigationStrategy from './navigation-strategies/mouse-invoke-navigation';

export type ListboxEmitter = FocusManagementEmitter & SelectionEmitter;
export type ListboxOptions = FocusManagementOptions & SelectionOptions;

interface Config<E, O> {
  emitter?: E;
  options?: O;
  selectors?: Selectors;
}

export enum Command {
  NavigateNext = 'navigate-next',
  NavigatePrevious = 'navigate-previous',
  NavigateHome = 'navigate-home',
  NavigateEnd = 'navigate-end',
  Focus = 'focus',
  Select = 'select',
  FocusItem = 'activate-item'
}

type KeyboardEventCommands =
  | Command.NavigateNext
  | Command.NavigatePrevious
  | Command.NavigateHome
  | Command.NavigateEnd;

type Commands =
  | { command: KeyboardEventCommands; originalEvent: KeyboardEvent }
  | { command: Command.Focus; originalEvent: FocusEvent }
  | { command: Command.Select; selection: HTMLElement[] }
  | { command: Command.FocusItem; item: HTMLElement };

export default class Listbox<
  E extends ListboxEmitter = ListboxEmitter,
  O extends ListboxOptions = ListboxOptions
> extends Composite<E, O>
  implements
    KeyboardCollectionNavigationListener,
    KeyboardEdgeNavigationListener {
  private collectionNavigation: KeyboardBlockNavigationStrategy;
  private edgeNavigation: KeyboardEdgeNavigationStrategy;

  protected focusStrategy = new AriaCurrentStrategy();

  constructor(element: HTMLElement, config?: Config<E, O>) {
    super(element, {
      ...{ elements: ':scope > [role="option"]' },
      ...config?.selectors
    });

    this.edgeNavigation = new KeyboardEdgeNavigationStrategy(this);
    this.edgeNavigation.addListener(this);
    this.collectionNavigation = new KeyboardBlockNavigationStrategy(this);
    this.collectionNavigation.addListener(this);
    const navigations = [
      this.collectionNavigation,
      this.edgeNavigation,
      new MouseInvokeNavigationStrategy()
    ];

    this.setup(navigations, [Features.FocusManagement, Features.Selection], {
      emitter: config?.emitter,
      options: config?.options
    });

    element.addEventListener('listbox', this.customHandler);

    if (!element.hasAttribute('tabindex')) {
      element.setAttribute('tabindex', '0');
    }
  }

  teardown(): void {
    this.element.removeEventListener('listbox', this.customHandler);
  }

  readElements(): void {
    this.elements = [
      ...this.element.querySelectorAll('[role="option"]')
    ] as HTMLElement[];
  }

  @action
  customHandler(event: CustomEvent): void {
    match(event.detail as Commands)
      .with({ command: Command.NavigateNext }, ({ originalEvent }) => {
        this.collectionNavigation.navigateNext(originalEvent);
      })
      .with({ command: Command.NavigatePrevious }, ({ originalEvent }) => {
        this.collectionNavigation.navigatePrevious(originalEvent);
      })
      .with({ command: Command.NavigateHome }, ({ originalEvent }) => {
        this.edgeNavigation.navigateHome(originalEvent);
      })
      .with({ command: Command.NavigateEnd }, ({ originalEvent }) => {
        this.edgeNavigation.navigateEnd(originalEvent);
      })
      .with({ command: Command.Focus }, ({ originalEvent }) => {
        this.focusIn(originalEvent);
      })
      .with({ command: Command.Select }, ({ selection }) => {
        this.selection?.select(selection);
      })
      .with({ command: Command.FocusItem }, ({ item }) => {
        this.focusManagement?.focus(item);
      })
      .run();
  }

  // implement scrolling. Externalize this!
  navigatePrevious(element: HTMLElement, event: KeyboardEvent): void {
    scrollUpwardsToItem(this.element, element);
    event.preventDefault();
  }

  navigateNext(element: HTMLElement, event: KeyboardEvent): void {
    scrollDownwardsToItem(this.element, element);
    event.preventDefault();
  }

  navigateHome(element: HTMLElement, event: KeyboardEvent): void {
    scrollUpwardsToItem(this.element, element);
    event.preventDefault();
  }

  navigateEnd(element: HTMLElement, event: KeyboardEvent): void {
    scrollDownwardsToItem(this.element, element);
    event.preventDefault();
  }
}
