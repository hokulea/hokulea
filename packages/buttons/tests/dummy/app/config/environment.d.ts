/**
 * Type declarations for
 *    import config from 'dummy/config/environment'
 *
 * For now these need to be managed by the developer
 * since different ember addons can materialize new entries.
 */
declare const config: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  environment: any;
  modulePrefix: string;
  podModulePrefix: string;
  locationType: string;
  rootURL: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  APP: any;
};

export default config;
