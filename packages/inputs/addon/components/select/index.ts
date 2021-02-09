import { action } from '@ember/object';
import Component from '@glimmer/component';

import DropdownBuilderComponent from '@hokulea/foundation/components/dropdown-builder';

import { InputControl } from '@hokulea/inputs/components/input-builder';

interface SelectArgs<T> extends InputControl<T | T[]> {
  options: T[];
  multiple: boolean;
}

export default class SelectComponent<T> extends Component<SelectArgs<T>> {
  private list?: HTMLElement;

  @action
  setupList(element: HTMLElement) {
    this.list = element;
  }

  @action
  handleExpansion() {
    this.list?.dispatchEvent(new Event('focusin'));
  }

  @action
  select(options: T[]) {
    console.log('Select.select', options, this.args.update);

    const value =
      !this.args.multiple && options.length > 0 ? options[0] : options;
    this.args.update?.(value);
  }

  @action
  close(close: () => void) {
    if (!this.args.multiple) {
      close();
    }
  }

  @action
  installTriggerListener(element: Element, ddb: DropdownBuilderComponent) {
    element.addEventListener('keydown', (event: KeyboardEvent) => {
      // enter
      if (event.key === 'Enter') {
        ddb.toggle();
      }

      // escape
      else if (event.key === 'Escape') {
        ddb.close();
      }

      // spacebar
      else if (!ddb.expanded && event.key === ' ') {
        ddb.open();
        this.sendCommand('focus');
      }

      // arrow up and down to open
      else if (
        !ddb.expanded &&
        (event.key === 'ArrowUp' || event.key === 'ArrowDown')
      ) {
        ddb.open();

        const command =
          event.key === 'ArrowUp' ? 'navigate-previous' : 'navigate-next';

        this.sendCommand(command, {
          originalEvent: event
        });
      }

      // anyway pass through
      else if (ddb.expanded) {
        this.passthroughToList(event);
      }
    });

    let mousedownBuffer: MouseEvent;

    element.addEventListener('mousedown', (event: MouseEvent) => {
      mousedownBuffer = event;
    });

    element.addEventListener('mouseup', (event: MouseEvent) => {
      if (event.target === mousedownBuffer.target) {
        (element as HTMLElement).focus();
        ddb.open();
      }
    });

    element.addEventListener('focusout', () => {
      ddb.close();
    });
  }

  @action
  installRemoteControl(ddb: DropdownBuilderComponent, element: HTMLElement) {
    element.addEventListener('keydown', (event: KeyboardEvent) => {
      console.log('event', event, ddb, ddb.isExpanded());

      if (ddb.expanded) {
        this.passthroughToList(event);
      }
    });
  }

  private passthroughToList(event: KeyboardEvent) {
    this.dispatchEventOnList(new KeyboardEvent(event.type, event));
  }

  private sendCommand(command: string, details?: Record<string, unknown>) {
    this.dispatchEventOnList(
      new CustomEvent('listbox', {
        detail: {
          command,
          ...details
        }
      })
    );
  }

  private dispatchEventOnList(event: Event) {
    if (this.list) {
      this.list.dispatchEvent(event);
    }
  }
}
