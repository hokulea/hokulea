const createCompiler = require("@storybook/addon-docs/mdx-compiler-plugin");

module.exports = {
  stories: ["../stories/**/*.(js|mdx)", "../../components/**/story.js"],
  addons: [
    "@storybook/addon-storysource",
    "@storybook/addon-knobs/register",
    "storybook-addon-designs/register",
    "@storybook/addon-a11y/register",
    "@storybook/addon-actions/register",
    "@storybook/addon-docs/register"
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
      test: /stories\/.+\.js?$/,
      loader: require.resolve("@storybook/source-loader"),
      exclude: [/node_modules/],
      enforce: "pre"
    });
    return config;
  }
};
