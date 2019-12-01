const createCompiler = require("@storybook/addon-docs/mdx-compiler-plugin");

module.exports = async ({ config }) => {
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
};
