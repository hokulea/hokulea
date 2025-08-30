import config from '@gossi/config-template-lint';

export default {
  ...config,

  rules: {
    ...config.rules,
    'no-negated-condition': false,
    'no-passed-in-event-handlers': {
      ignore: {
        Form: ['submit']
      }
    },
    'no-forbidden-elements': ['meta', 'html', 'script']
  }
};
