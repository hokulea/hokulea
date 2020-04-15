const { getOptions } = require('loader-utils');
const MarkdownItCompiler = require('markdown-it-compiler');
const fm = require('front-matter');
const fs = require('fs');
const path = require('path');
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

  // load story information
  const info = fm(source);

  // load stories
  const stories = {};

  const dir = path.join(path.dirname(this.resourcePath), info.attributes.source);
  if (fs.existsSync(dir)) {
    for (const name of info.attributes.stories) {
      const file = path.join(dir, `${name}.md`);

      if (fs.existsSync(file)) {
        const content = fs.readFileSync(file, { encoding: 'utf-8' });
        stories[Case.camel(name)] = compiler.compile(content);
      }
    }
  }

  const lines = Object.entries(stories).map(([name, story]) => {
    return `
      export const ${name} = () => {
        return {
          template: hbs\`${story.html}\`
        };
      };

      ${name}.story = {
        title: '${story.attributes.title}',
        parameters: {
          options: {
            showPanel: false,
            isToolshown: false
          }
        }
      };
    `;
  });

  const code = `import { hbs } from 'ember-cli-htmlbars';

  export default {
    title: '${info.attributes.id}'
  };

  ${lines.join('\n\n')}
  `;

  return code;
}

module.exports = loader;
