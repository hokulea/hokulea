// from https://github.com/tc39/proposal-signals
export interface Signal<T> {
  // Get the value of the signal
  get(): T;

  set(t: T): void;
}

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
