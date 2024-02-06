const customBlock = require('markdown-it-custom-block');

module.exports = {
  plugins: [
    'markdown-it-abbr',
    'markdown-it-anchor',
    'markdown-it-ember',
    'markdown-it-deflist',
    'markdown-it-highlightjs',
    'markdown-it-ins',
    'markdown-it-mark',
    'markdown-it-sub',
    'markdown-it-sup'
  ],
  configure(md) {
    md.use(customBlock, {
      figma(url) {
        return `<iframe
          style="width: 100%; min-height: 400px; resize: both;"
          src="https://www.figma.com/embed?embed_host=share&url=${url}"
          allowfullscreen
        />`;
      }
    });
    //   const wrap = render =>
    //     function (...args) {
    //       return render.apply(this, args)
    //         .replace('<code class="', '<code class="hljs ')
    //         .replace('<code>', '<code class="hljs">')
    //     };

    //   md.renderer.rules.code_inline = wrap(md.renderer.rules.code_inline)
  },
  format(doc) {
    const title = doc.attributes.title
      ? doc.attributes.title
      : doc.toc && doc.toc.length > 0
        ? doc.toc[0].content
        : '';

    // strip first <h1> off of html
    if (!doc.attributes.title) {
      doc.html = doc.html.replace(/<h1(.+)>(.+)<\/h1>/, '');
    }

    return `<Page @title="${title}" @toc="${encodeURIComponent(
      JSON.stringify(doc.toc)
    )}">${doc.html}</Page>`;
  }
};
