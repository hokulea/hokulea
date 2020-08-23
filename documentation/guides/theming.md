# Theming

## Typography

Typography is done with the following scheme:

```txt
--typo-{flavor}-{prop}
```

Flavors are: `prose`, `heading` and `display`

With this list of properties:

### Properties

#### General

`family`

: Choose the font's family

- [MDN: `font-family`](https://developer.mozilla.org/en-US/docs/Web/CSS/font-family)

#### Regular Axis

`weight` (Axis: `wght`)
: The thickness of the font

- [Variable Fonts: `wght`](https://variablefonts.io/about-variable-fonts/#wght)
- [MDN: `font-weight`](https://developer.mozilla.org/en-US/docs/Web/CSS/font-weight)
- [MDN: `wght`](https://developer.mozilla.org/en-US/docs/Web/CSS/font-variation-settings#Weight_wght)

`stretch` (Axis: `wdht`)

: Control a normal, condensed or expaded face

- [MDN:
  `font-stretch`](https://developer.mozilla.org/en-US/docs/Web/CSS/font-stretch)
- [Variable Fonts: `wdht`](https://variablefonts.io/about-variable-fonts/#wdth)

`optical-size` (Axis `opsz`)

: Optimize text rendering for viewing at different sizes

- [MDN:`font-optical-sizing`](https://developer.mozilla.org/en-US/docs/Web/CSS/font-optical-sizing)
- [Variable Fonts: `opsz`](https://variablefonts.io/about-variable-fonts/#opsz)

`style` (Axes: `ital` and `slnt`)
: Control normal, italic or oblique face

- [MDN:
  `font-style`](https://developer.mozilla.org/en-US/docs/Web/CSS/font-style)
- [Variable Fonts: `ital`](https://variablefonts.io/about-variable-fonts/#ital)
- [Variable Fonts: `slnt`](https://variablefonts.io/about-variable-fonts/#slnt)
- [Variable Fonts: Slant & Italics](https://variablefonts.io/about-variable-fonts/#slnt_ital)

#### Text Rendering

`synthesis`

: Missing typefaces synthesized by the browser (mostly bold and italics)

- [MDN:
  `font-synthesis`](https://developer.mozilla.org/en-US/docs/Web/CSS/font-synthesis)

`tracking`

: Spacing between letters (applied _after_ kerning)

- [MDN: `letter-spacing`](https://developer.mozilla.org/en-US/docs/Web/CSS/letter-spacing)

#### Features

`kerning`

: Controls the letter spacing for certain character tuples

- [MDN: `font-kerning`](https://developer.mozilla.org/en-US/docs/Web/CSS/font-kerning)

`variant-alternates`

: Controls the usage of alternate glyphs

- [MDN:
  `font-variant-alternates`](https://developer.mozilla.org/en-US/docs/Web/CSS/font-variant-alternates)

`variant-caps`

: Controls the usage of alternate glyhps for capital letters

- [MDN:
  `font-variant-caps`](https://developer.mozilla.org/en-US/docs/Web/CSS/font-variant-caps)

`variant-east-asian`

: Controls the usage of alternate glyphs for east asian scripts, like japanese
or chinese

- [MDN:
  `font-variant-east-asian`](https://developer.mozilla.org/en-US/docs/Web/CSS/font-variant-east-asian)

`variant-ligatures`

: Controls which ligtures and contextual forms are used for a more harmized form
of text.

- [MDN:
  `font-variant-ligatures`](https://developer.mozilla.org/en-US/docs/Web/CSS/font-variant-ligatures)

`variant-numeric`

: Controls usage for alternate glyphs, fractions and ordinal markers

- [MDN:
  `font-variant-numeric`](https://developer.mozilla.org/en-US/docs/Web/CSS/font-variant-numeric)

`variant-position`

: Controls usage for alternate glyphs, that are positioned as superscript or
subscript

- [MDN: `font-variant-position`](https://developer.mozilla.org/en-US/docs/Web/CSS/font-variant-position)

`feature-settings`

: Controls advanced typographic features in OpenType fonts. Refer to the
documentation of the font to turn those on or off.

- [MDN:
  `font-feature-settings`](https://developer.mozilla.org/en-US/docs/Web/CSS/font-feature-settings)

#### Variable Fonts

`variation-settings`

: Control regular and custom axes through these settings

- [MDN:
  `font-variation-settings`](https://developer.mozilla.org/en-US/docs/Web/CSS/font-variation-settings)
- [MDN: Variable Fonts Guide](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Fonts/Variable_Fonts_Guide)
- [Variable Fonts](https://variablefonts.io/about-variable-fonts)
- [Axis Praxis](https://www.axis-praxis.org)

### Best Practices

At best try to make use of modern variable fonts and control it through
variations and features to create various styles for prose, headings and
display.

In order to do this, when defining the font in your tokens, prefer to use
`variation-settings` and `feature-settings` and use the others to overwrite
particular cases.
