import { locators } from '@vitest/browser/context';

locators.extend({
  q(selector: string) {
    return selector;
  }
});

declare module '@vitest/browser/context' {
  interface LocatorSelectors {
    // if the custom method returns a string, it will be converted into a locator
    // if it returns anything else, then it will be returned as usual
    q(selector: string): Locator;
  }
}
