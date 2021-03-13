import { action } from '@ember/object';
import Component from '@glimmer/component';

import DropdownBuilderComponent from '@hokulea/foundation/components/dropdown-builder';

import { Control, Multiple } from '../control';

export interface SelectArgs<T> extends Control<T | T[]>, Multiple {
  options: T[];
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
    const value =
      !this.args.multiple && options.length > 0 ? options[0] : options;
    this.args.update?.(value);
  }

  @action
  close(close: () => void, event: MouseEvent) {
    if (this.args.multiple) {
      event.stopPropagation();
    } else {
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

    element.addEventListener(
      'mouseup',
      (event: MouseEvent) => {
        if (event.target === mousedownBuffer.target) {
          if (!ddb.expanded) {
            (element as HTMLElement).focus();
            ddb.open();
          } else if (this.args.multiple) {
            this.passthroughToList(event);
          } else {
            ddb.close();
          }
          event.stopPropagation();
        }
      },
      {
        capture: true
      }
    );

    element.addEventListener('focusout', () => {
      ddb.close();
    });
  }

  @action
  installRemoteControl(ddb: DropdownBuilderComponent, element: HTMLElement) {
    element.addEventListener('keydown', (event: KeyboardEvent) => {
      if (ddb.expanded) {
        this.passthroughToList(event);
      }
    });
  }

  private passthroughToList(event: Event) {
    const newEvent =
      event instanceof KeyboardEvent
        ? new KeyboardEvent(event.type, event)
        : new MouseEvent(event.type, event);
    this.dispatchEventOnList(newEvent);
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
