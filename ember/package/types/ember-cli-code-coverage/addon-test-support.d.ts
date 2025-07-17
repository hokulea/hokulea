declare module 'ember-cli-code-coverage/addon-test-support' {
  export function forceModulesToBeLoaded(): void;
  export function sendCoverage(): Promise<void>;
}
