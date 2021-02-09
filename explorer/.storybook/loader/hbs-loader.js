const { precompile } = require('ember-source/dist/ember-template-compiler');

module.exports = {
  loader: "babel-loader",
  options: {
    // remove presets when solved: https://github.com/storybookjs/storybook/issues/11853
    presets: ['@babel/preset-typescript'],
    plugins: [
      [
        require.resolve('babel-plugin-htmlbars-inline-precompile'),
        {
          precompile,
          modules: {
            'ember-cli-htmlbars': 'hbs',
            'ember-cli-htmlbars-inline-precompile': 'default',
            'htmlbars-inline-precompile': 'default',
          }
        }
      ],
      [
        '@babel/plugin-proposal-decorators',
        {
          legacy: true
        }
      ],
      '@babel/plugin-proposal-class-properties'
    ]
  }
};
