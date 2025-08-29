import config from '@gossi/config-stylelint';

export default {
  ...config,
  rules: {
    ...config.rules,
    'property-no-unknown': [
      true,
      {
        ignoreProperties: [
          ...config.rules['property-no-unknown'][1].ignoreProperties
          // 'anchor-name'
        ]
      }
    ],
    'at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: [...config.rules['at-rule-no-unknown'][1].ignoreAtRules, 'each']
      }
    ],
    'custom-property-pattern': [
      '^(🔒-)?([a-z][a-z0-9]*)(-[a-z0-9]+)*$',
      {
        message: (name) => `Expected custom property name "${name}" to be kebab-case`
      }
    ]
  }
};
