const { getOptions } = require('loader-utils');
const MarkdownItCompiler = require('markdown-it-compiler');
const Case = require('case');

let compiler;

const getCompiler = function (config) {
  const options = {
    ...{
      options: {
        linkify: true,
        html: true,
        typographer: true
      }
    },
    ...config
  };

  return new MarkdownItCompiler(options);
}

const loader = function (source) {
  const options = getOptions(this);

  if (!compiler) {
    compiler = getCompiler(options.compiler || {});
  }

  const doc = compiler.compile(source);

  const parts = doc.attributes.id.split('/');
  const id = parts.pop();
  const name = Case.camel(id);
  const title = doc.attributes.title ? doc.attributes.title : id;

  const code = `import { hbs } from 'ember-cli-htmlbars';

  export default {
    title: '${parts.join('/')}'
  };

  export const ${name} = () => {
    return {
      template: hbs\`${doc.html}\`
    };
  };

  ${name}.story = {
    title: '${title}',
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
