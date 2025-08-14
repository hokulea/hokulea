type Config = {
  modulePrefix: string;
  locationType: string;
  rootURL: string;
  APP: Record<string, unknown>;
} & Record<string, unknown>;

const ENV: Config = {
  modulePrefix: '@hokulea/pahu-ember',
  environment: import.meta.env.DEV ? 'development' : 'production',
  rootURL: '/',
  locationType: 'history',
  APP: {
    // Here you can pass flags/options to your application instance
    // when it is created
  }
};

export default ENV;

export function enterTestMode() {
  ENV.locationType = 'none';
  ENV.APP.rootElement = '#ember-testing';
  ENV.APP.autoboot = false;
}
