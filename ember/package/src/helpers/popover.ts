import { tracked } from '@glimmer/tracking';
import { helper } from '@ember/component/helper';

import { computePosition, flip, type Placement } from '@floating-ui/dom';
import { modifier } from 'ember-modifier';
import { v4 as uuid } from 'uuid';

class State {
  @tracked id = uuid();
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

      const pos = (event: ToggleEvent) => {
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
      element.addEventListener('toggle', pos);

      return () => {
        // @ts-expect-error c'mon typescript
        element.removeEventListener('toggle', pos);
      };
    })
  };
});

export default popover;
