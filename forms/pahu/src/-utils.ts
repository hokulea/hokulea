import type { FieldElement } from './definitions';

// from https://github.com/tc39/proposal-signals
export interface Signal<T> {
  // Get the value of the signal
  get(): T;

  // Set the state Signal value to t
  set(t: T): void;
}

export type SignalFactory = <T>(t?: T) => Signal<T>;

class State<T> implements Signal<T> {
  #value?: T;

  // Create a state Signal starting with the value t
  constructor(t?: T) {
    this.#value = t;
  }

  // Get the value of the signal
  get(): T {
    return this.#value as T;
  }

  // Set the state Signal value to t
  set(t: T): void {
    this.#value = t;
  }
}

export const makeSignal: SignalFactory = <T>(t?: T) => {
  return new State(t);
};

type MaybePromise<T> = T | Promise<T>;

export type Subscriber<
  Events extends Record<keyof Events, unknown[]>,
  Event extends keyof Events
> = (...data: Events[Event]) => MaybePromise<unknown>;

export default class Publisher<Events extends Record<keyof Events, unknown[]>> {
  #subscribers = new Map<keyof Events, Set<Subscriber<Events, keyof Events>>>();

  subscribe<E extends keyof Events>(event: E, cb: Subscriber<Events, E>): void {
    const callbacks = this.#getSubscribersForEvent(event);

    callbacks.add(cb);
  }

  unsubscribe<E extends keyof Events>(event: E, cb: Subscriber<Events, E>): void {
    const callbacks = this.#getSubscribersForEvent(event);

    callbacks.delete(cb);
  }

  notify<E extends keyof Events>(event: E, ...data: Events[E]): void {
    const callbacks = this.#getSubscribersForEvent(event);

    for (const cb of callbacks) {
      void cb(...data);
    }
  }

  #getSubscribersForEvent<E extends keyof Events>(event: E) {
    if (!this.#subscribers.has(event)) {
      this.#subscribers.set(event, new Set());
    }

    return this.#subscribers.get(event) as Set<Subscriber<Events, E>>;
  }
}

export function isFormFieldElement(el: Element): el is FieldElement {
  return (
    el instanceof HTMLInputElement ||
    el instanceof HTMLTextAreaElement ||
    el instanceof HTMLSelectElement ||
    el instanceof HTMLButtonElement ||
    el instanceof HTMLFieldSetElement ||
    el instanceof HTMLObjectElement ||
    el instanceof HTMLOutputElement
  );
}
