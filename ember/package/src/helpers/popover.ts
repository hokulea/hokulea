import { tracked } from '@glimmer/tracking';
import { helper } from '@ember/component/helper';
import { uniqueId } from '@ember/helper';

import { modifier } from 'ember-modifier';

import type { PositionArea } from './-position';

type Fallback = 'none' | 'flip-inline' | 'flip-block' | 'flip-start';

interface PopoverArgs {
  /**
   * The position for the popover target.
   *
   * @see https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/position-area
   */
  position?: PositionArea;

  /**
   * The fallback strategy, when position is not a good fit
   *
   * @see https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/position-try
   * @see https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/position-try-fallbacks
   *
   * @default `none`
   */
  fallback?: Fallback;

  /**
   * Callback, when the popover is opened
   */
  opened?: () => void;

  /**
   * Callback, when the popover is closed
   */
  closed?: () => void;
}

class State {
  @tracked id = uniqueId();
  @tracked opened = false;
}

export const popover = helper((_, { position, fallback = 'none', opened, closed }: PopoverArgs) => {
  const state = new State();
  let targetElement: HTMLElement | undefined;

  return {
    trigger: modifier((element: HTMLElement) => {
      element.setAttribute('popovertarget', state.id);
      // @ts-expect-error doesn't know that CSS yet
      element.style.positionAnchor = `--${state.id}`;
    }),
    target: modifier((element: HTMLElement, __, { manual }: { manual?: boolean }) => {
      if (element.id) {
        state.id = element.id;
      } else {
        element.id = state.id;
      }

      element.setAttribute('popover', manual ? 'manual' : '');
      element.dataset.position = position;
      element.dataset.fallback = fallback;
      // @ts-expect-error doesn't know that CSS yet
      element.style.anchorName = `--${state.id}`;
      // @ts-expect-error doesn't know that CSS yet
      element.style.positionArea = position;
      targetElement = element;

      const toggleHandler = (event: ToggleEvent) => {
        state.opened = event.newState === 'open';

        if (event.newState === 'open') {
          opened?.();
        } else if (event.newState === 'closed') {
          closed?.();
        }
      };

      element.addEventListener('toggle', toggleHandler);

      return () => {
        element.removeEventListener('toggle', toggleHandler);
      };
    }),
    get opened() {
      return state.opened;
    },
    open: () => {
      targetElement?.showPopover();
    },
    close: () => {
      targetElement?.hidePopover();
    }
  };
});

export default popover;
