// from https://github.com/tc39/proposal-signals
export interface Signal<T> {
  // Get the value of the signal
  get(): T;

  set(t: T): void;
}
