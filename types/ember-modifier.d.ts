import { setOwner } from '@ember/application';

interface InvokeArgs {
  positional: Array<unknown>;
  named: {};
}

export default class Modifier<Args extends InvokeArgs> {
  args: Args;
  element: HTMLElement | null;

  get isDestroying(): boolean;
  get isDestroyed(): boolean;

  constructor(owner: unknown, args: Args);

  didReceiveArguments(): void;
  didUpdateArguments(): void;
  didInstall(): void;
  willRemove(): void;
  willDestroy(): void;
}