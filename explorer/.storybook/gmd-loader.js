const MarkdownItCompiler = require('markdown-it-compiler');
const config = {
  options: {
    linkify: true,
    html: true,
    typographer: true
  },
  plugins: [
    'markdown-it-abbr',
    'markdown-it-anchor',
    'markdown-it-deflist',
    'markdown-it-highlightjs',
    'markdown-it-ins',
    'markdown-it-mark',
    'markdown-it-sub',
    'markdown-it-sup'
  ],
  format(data) {
    const result = { ...data };
    const title = data.attributes.title
      ? data.attributes.title
      : data.attributes.id.replace('|', '/').split('/').pop();
    result.html = `<Page @title="${title}">${data.html}</Page>`;
    return result;
  }
};

const compiler = new MarkdownItCompiler(config);

const loader = function (source) {
  // Apply some transformations to the source...
  const result = compiler.compile(source);

  const code = `import { hbs } from 'ember-cli-htmlbars';

  export default {
    title: '${result.attributes.id}'
  };

  export const Doc = () => {
    return {
      template: hbs\`${result.html}\`
    };
  };

  Doc.story = {
    parameters: {
      options: {
        showPanel: false,
        isToolshown: false
      }
    }
  };
  `;

  return code;
}

module.exports = loader;
