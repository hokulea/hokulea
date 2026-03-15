import config from '@gossi/config-stylelint';

export default {
  ...config,
  rules: {
    ...config.rules,
    'at-rule-empty-line-before': undefined,
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
        ignoreAtRules: [...config.rules['at-rule-no-unknown'][1].ignoreAtRules, 'mixin']
      }
    ],
    'custom-property-pattern': [
      '^(🔒-)?([a-z][a-z0-9]*)(-[a-z0-9]+)*$',
      {
        message: (name) => `Expected custom property name "${name}" to be kebab-case`
      }
    ],
    'nesting-selector-no-missing-scoping-root': [true, { ignoreAtRules: ['mixin'] }],
    'no-invalid-position-declaration': [true, { ignoreAtRules: ['mixin'] }]
  }
};
