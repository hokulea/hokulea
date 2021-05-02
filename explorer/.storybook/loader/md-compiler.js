const MarkdownItCompiler = require('markdown-it-compiler');

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
};

function compileMarkdown(contents, options) {
  if (!compiler) {
    compiler = getCompiler(options.compiler || {});
  }

  const doc = compiler.compile(contents);

  // translate urls to storybook links
  if (options.translateLinks && typeof options.translateLinks === 'function') {
    doc.html = options.translateLinks(doc.html, options);
  }

  return doc;
}

module.exports = { compileMarkdown };
