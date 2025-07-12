const { getOptions } = require('loader-utils');

const { compileMarkdown } = require('./md-compiler');

const Case = require('case');

const path = require('path');

const translateLinks = function (html, options) {
  const baseDir = path.dirname(options.file);

  // internal links
  let output = html.replace(/<a href="([^"]+)\.md#?(.+)?">/g, (_match, target /*, _hash*/) => {
    const nav = path.relative(options.dir, path.normalize(`${baseDir}/${target}`));
    const parts = nav.split('/');
    const name = parts.pop();

    return `<a
      href="#"
      data-sb-kind="${Case.lower(options.root)}-${parts.join('-')}-${name}"
      data-sb-story="${name}"
    >`;
  });

  // external links
  output = output.replace(/<a href="[^#]+">/g, (link) => link.replace('>', ' target="_blank">'));

  // // anchor link
  // output = output.replace(/<a href="#(.+)">/g, (link, target) => {
  //   return link.replace('>', ` data-jump="${target}">`);
  // });

  return output;
};

const loader = function (source) {
  const options = getOptions(this);
  const doc = compileMarkdown(source, {
    ...options,
    file: this.resourcePath,
    translateLinks
  });

  // parse story identifiers
  const nav = path
    .relative(options.dir, this.resourcePath)
    .replace('.md', '')
    .split('/')
    .map((name) => Case.capital(name))
    .join('/');
  const parts = nav.split('/');
  const id = parts.pop();
  const name = Case.camel(id);
  const title = doc.attributes.title ? doc.attributes.title : id;
  // const metaId = `documentation-${parts.join('-').toLowerCase().replace(' ', '-')}--${id.toLowerCase()}`;

  const code = `import { hbs } from 'ember-cli-htmlbars';
  import { withLinks } from '@storybook/addon-links';

  export default {
    title: '${options.root}/${parts.join('/')}',
    decorators: [withLinks]
  };

  export const ${name} = () => {
    return {
      template: hbs\`${doc.html}\`
    };
  };

  ${name}.storyName = '${title}';
  ${name}.parameters = {
    options: {
      bottomPanelHeight: 0,
      showToolbar: false
    }
  };
  `;

  return code;
};

module.exports = loader;
