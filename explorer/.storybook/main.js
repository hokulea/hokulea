const createCompiler = require("@storybook/addon-docs/mdx-compiler-plugin");
const path = require('path');
const { precompile } = require('ember-source/dist/ember-template-compiler');

module.exports = {
  stories: ["../stories/**/*.(js|ts|mdx)", "../../packages/**/story.(js|ts)"],
  addons: [
    "@storybook/addon-knobs/register",
    "storybook-addon-designs/register",
    "@storybook/addon-a11y/register",
    "@storybook/addon-actions/register",
    "@storybook/addon-docs/register",
    {
      name: '@storybook/addon-storysource',
      options: {
        rule: {
          test: [/story\.(j|t)s$/, /stories\/.+\.(js|mdx)$/],
          include: [
            path.resolve(__dirname, '..'),
            path.resolve(__dirname, '..', '..', 'packages')
          ]
        }
      }
    }
  ],
  webpack: async config => {
    config.module.rules.push({
      test: /\.mdx$/,
      use: [
        {
          loader: "babel-loader",
          // may or may not need this line depending on your app's setup
          options: {
            plugins: ["@babel/plugin-transform-react-jsx"]
          }
        },
        {
          loader: "@mdx-js/loader",
          options: {
            compilers: [createCompiler({})]
          }
        }
      ]
    });
    config.module.rules.push({
      test: /\.ts$/,
      use: [
        {
          loader: "babel-loader",
          options: {
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
              ]
            ]
          }
        }
      ],
    });
    config.resolve.extensions.push('.ts');
    // config.module.rules.push({
    //   test: /stories\/.+\.js?$/,
    //   loader: require.resolve("@storybook/source-loader"),
    //   exclude: [/node_modules/],
    //   enforce: "pre"
    // });
    return config;
  }
};
