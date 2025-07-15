import config from '@gossi/config-template-lint';

export default {
  ...config,
  rules: {
    ...config.rules,
    'no-passed-in-event-handlers': {
      ignore: {
        Form: ['submit']
      }
    }
  },
  overrides: [
    ...config.overrides,
    {
      files: ['**/*.gts'],
      rules: {
        'no-forbidden-elements': ['meta', 'html', 'script']
      }
    },
    {
      files: ['tests/rendering/*.gts'],
      rules: {
        'require-mandatory-role-attributes': 'off'
      }
    }
  ]
};
