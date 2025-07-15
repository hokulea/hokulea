/* eslint-disable no-undef */
/* eslint-disable unicorn/prefer-module */
const { getOptions } = require('loader-utils');

const { compileMarkdown } = require('./md-compiler');

const path = require('node:path');
const fs = require('node:fs');

const translateLinks = function (html) {
  // internal links
  let output = html.replaceAll(/<a href="\.\/([^"]+)\.md">/g, (_match, target) => {
    const parts = target.split('.');
    const kind = (parts.length === 3 ? parts.slice(0, -1) : parts).join('-');
    const story = parts.length === 3 ? parts.at(-1) : 'overview';

    return `<a href="#" data-sb-kind="api-hokulea-${kind}" data-sb-story="${story}">`;
  });

  // external links
  output = output.replaceAll(/<a href="[^#]+">/g, (link) => link.replace('>', ' target="_blank">'));

  return output;
};

const generateStoryCode = (name, title, html) => `
    export const ${name} = () => {
      return {
        template: hbs\`${html}\`
      };
    };

    ${name}.storyName = '${title}';
    ${name}.parameters = {
      options: {
        showPanel: false,
        isToolshown: false
      }
    };
  `;

const loadPackage = (fileName) => {
  if (fs.existsSync(fileName)) {
    return require(fileName);
  }
};

const getPackageObject = (pkg, path) => {
  let node = pkg.members[0];

  // traverse members from here
  while (path.length > 0) {
    const entity = path.shift();

    for (const item of node.members) {
      if (item.name.toLowerCase() === entity) {
        node = item;

        if (path.length === 0) {
          return node;
        }

        continue;
      }
    }
  }
};

const sanitizeMarkdown = (contents) => {
  // remove first 4 lines and make first heading a h1
  let source = contents.replaceAll(/^([^\n]*\n){4}/gi, '');

  source = source.replaceAll(/^##/g, '#');

  // trim code blocks
  source = source.replaceAll(
    /(```)([^`]+)(```)/g,
    (_match, begin, code, end) => `${begin}${code.trim()}\n${end.trim()}`
  );

  return source;
};

const loader = function (source) {
  const options = getOptions(this);

  const doc = compileMarkdown(sanitizeMarkdown(source), {
    ...options,
    translateLinks
  });
  const dir = path.dirname(this.resourcePath);

  const fileName = path.relative(options.dir, this.resourcePath).replace('.md', '');
  const segments = fileName.split('.');

  // overview
  if (fileName === 'index') {
    return '';
  }

  // find package
  const packageFileName = `${dir}/${segments[0]}.api.json`;
  const pkg = loadPackage(packageFileName);

  if (!pkg) {
    return '';
  }

  // Uh-Oh
  // Forward slash is used in storybook for creating hierarchy
  // hack: use homoglyph, e.g. ／
  // https://www.irongeek.com/homoglyph-attack-generator.php
  const packageName = pkg.name.replace('/', '／');

  // package overview
  if (segments.length === 1) {
    return `
    import { hbs } from 'ember-cli-htmlbars';
    import { withLinks } from '@storybook/addon-links';

    export default {
      title: '${options.root}/${packageName}',
      decorators: [withLinks]
    };

    ${generateStoryCode('Overview', 'Overview', doc.html)}
    `;
  }

  // package entity (class, interface, etc.)
  const entity = getPackageObject(pkg, segments.slice(1, 2));

  if (segments.length === 2) {
    return `
    import { hbs } from 'ember-cli-htmlbars';
    import { withLinks } from '@storybook/addon-links';

    export default {
      title: '${options.root}/${packageName}/${entity.name}',
      decorators: [withLinks]
    };

    ${generateStoryCode('Overview', 'Overview', doc.html)}
    `;
  }

  // entity member (property, method, ...)
  if (segments.length === 3) {
    const member = getPackageObject(pkg, segments.slice(1));

    return `
    import { hbs } from 'ember-cli-htmlbars';
    import { withLinks } from '@storybook/addon-links';

    export default {
      title: '${options.root}/${packageName}/${entity.name}',
      decorators: [withLinks]
    };

    ${generateStoryCode(segments.at(-1), member.name, doc.html)}
    `;
  }
};

module.exports = loader;
