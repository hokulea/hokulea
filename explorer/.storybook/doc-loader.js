const { getOptions } = require('loader-utils');
const MarkdownItCompiler = require('markdown-it-compiler');
const Case = require('case');
const path = require('path');

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

const translateLinks = function (options, file, html) {
  const baseDir = path.dirname(file);

  // internal links
  let output = html.replace(/<a href="(.+)\.md">/g, (_match, target) => {
    const nav = path.relative(options.dir, path.normalize(`${baseDir}/${target}`));
    const parts = nav.split('/');
    const name = parts.pop();

    return `<a href="#" data-sb-kind="${Case.lower(options.root)}-${parts.join('-')}" data-sb-story="${name}">`;
  });

  // external links
  output = output.replace(/<a href="[^#]+">/g, (link) => {
    return link.replace('>', ' target="_blank">');
  });

  // // anchor link
  // output = output.replace(/<a href="#(.+)">/g, (link, target) => {
  //   return link.replace('>', ` data-jump="${target}">`);
  // });

  return output;
}

const loader = function (source) {
  const options = getOptions(this);

  if (!compiler) {
    compiler = getCompiler(options.compiler || {});
  }

  const doc = compiler.compile(source);

  // parse story identifiers
  const nav = path.relative(options.dir, this.resourcePath).replace('.md', '')
    .split('/')
    .map(name => Case.capital(name))
    .join('/');
  const parts = nav.split('/');
  const id = parts.pop();
  const name = Case.camel(id);
  const title = doc.attributes.title ? doc.attributes.title : id;

  // translate urls to storybook links
  doc.html = translateLinks(options, this.resourcePath, doc.html);

  const code = `import { hbs } from 'ember-cli-htmlbars';
  import { withLinks } from '@storybook/addon-links';

  export default {
    title: '${options.root}|${parts.join('/')}',
    decorators: [withLinks]
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
