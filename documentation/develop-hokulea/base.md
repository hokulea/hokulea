# Base CSS

The base CSS for hokulea is the [Modern CSS
Reset](https://hankchizljaw.com/wrote/a-modern-css-reset/) by [Andy
Bell](https://twitter.com/hankchizljaw).
After `reset.css` and `normalize.css` it is a very minimal reset for the modern
era of web development with some sensible defaults.

The article explains its details very well, so head over and give it a read.

## CUBE CSS

The base CSS is part of the `CSS` layer of [CUBE
CSS](https://piccalil.li/cube-css). It will provide you a base, but you should
enhance it with additions to your foundation CSS layer. Things you might want to
adjust:

- **Fonts** Hokulea only has the interface, you need to load them and use the
  `--typo-*` custom properties to define them
- **Links** By default, they do not receive a color (and use browser default),
  make sure to style `a, a:link a:visited` and `a:hover`
- (Optionally) Use the design tokens to style `<em>` and `<strong>` elements
- (Optionally) (definition) lists can use styling
- (Optionally) Tables - if you make use of them - can also be adjusted as well
