import { tracked } from '@glimmer/tracking';
import { helper } from '@ember/component/helper';
import { uniqueId } from '@ember/helper';

import { computePosition, flip, type Placement } from '@floating-ui/dom';
import { modifier } from 'ember-modifier';

class State {
  @tracked id = uniqueId();
  @tracked opened = false;
}

const popover = helper((_, { position }: { position?: Placement }) => {
  const state = new State();
  let triggerElement: HTMLElement | undefined = undefined;

  return {
    trigger: modifier((element: HTMLElement) => {
      element.setAttribute('popovertarget', state.id);
      triggerElement = element;
    }),
    target: modifier((element: HTMLElement, __, { manual }: { manual?: boolean }) => {
      element.setAttribute('popover', manual ? 'manual' : '');

      if (element.id) {
        state.id = element.id;
      } else {
        element.id = state.id;
      }

      const toggleHandler = (event: ToggleEvent) => {
        state.opened = event.newState === 'open';

        if (position && event.newState === 'open' && triggerElement) {
          // eslint-disable-next-line @typescript-eslint/no-floating-promises
          computePosition(triggerElement, element, {
            placement: position,
            middleware: [flip()]
          }).then(({ x, y }): void => {
            Object.assign(element.style, {
              left: `${String(x)}px`,
              top: `${String(y)}px`
            });
          });
        }
      };

      // @ts-expect-error c'mon typescript
      element.addEventListener('toggle', toggleHandler);

      return () => {
        // @ts-expect-error c'mon typescript
        element.removeEventListener('toggle', toggleHandler);
      };
    }),
    get opened() {
      return state.opened;
    }
  };
});

export default popover;
