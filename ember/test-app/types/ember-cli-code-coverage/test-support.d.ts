declare module 'ember-cli-code-coverage/test-support' {
  export function forceModulesToBeLoaded(): void;
  export function sendCoverage(): Promise<void>;
}
