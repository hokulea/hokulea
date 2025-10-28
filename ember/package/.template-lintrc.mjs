import config from '@gossi/config-template-lint';

export default {
  ...config,

  plugins: [...config.plugins, 'ember-scoped-css/src/template-lint/plugin'],

  rules: {
    ...config.rules,
    'no-negated-condition': false,
    'no-passed-in-event-handlers': {
      ignore: {
        Form: ['submit'],
        Pagination: ['change']
      }
    },
    'no-forbidden-elements': ['meta', 'html', 'script']
  }
};
