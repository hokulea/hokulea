# Making Of Hokulea

The making of hokulea included a huge amount of research, which went into the
initial stage. Overall there is a blog series accompanying the creating process
of hokulea, titled with [From Figma to Ember to
Storybook](https://gos.si/blog/from-figma-to-ember-to-storybook-with-2-clicks/).

## Understanding Themes

First thing to understand was the role and scope of themes. What goes into a
theme? What does a theme provide? Where to _work_ on the theme? What's the
interface between to a theme? As part of this learning process a couple of
articles and code libraries were created:

### Articles

The articles contain the results of each learning steps.

- [Full Featured Themes in Figma](https://gos.si/blog/full-featured-themes-in-figma/)<br>
  This article will talk about design tokens, references of such and different
  contexts within one theme and how to organize them in Figma.

- [Say Hello to Theemo – the Yordle Powered Theme
  Automator](https://gos.si/blog/say-hello-to-theemo-the-yordle-powered-theme-automator/)<br>
  This article refines the understanding of a full featured theme as well as
  sharpen token usage.

- [Integrate Ember with the JS Ecosystem at the Example of
  Theemo](https://gos.si/blog/integrate-ember-with-the-js-ecosystem-at-the-example-of-theemo/)<br>
  Explains how to bring design tokens from Figma to Ember and develop libraries
  for the greater npm system rather for ember only.

### Libraries

The code that was created along with the learning process.

- **Style References plugin for Figma**
  [[Figma Plugin](https://www.figma.com/community/plugin/791262205400516364/Style-References)]
  [[Github](https://github.com/gossi/figma-style-references)]<br>
  Helps manage styles/design tokens in Figma

- **Theemo - the Yordle Powered Theme Automator**
  [[Website/Documentation](https://gossi.github.io/theemo/)]
  [[Github](https://github.com/gossi/theemo)]<br>
  Toolchain extender to manage design tokens from synching to structuring and
  building
  
- [**ember-theemo**](https://github.com/gossi/ember-theemo)
  Integration of theemo into ember world

## Experiments

The goal with Hokulea is to use modern CSS, therefore some experiments where
necessary to validate the usage of some new properties. For example at the time
of writing these problems exists and are not fully supported in browsers:

- `writing-mode: vertical-lr` and `writing-mode: vertical-rl` do not work for
  `<button>` and `<input>` in all webkit-based browsers (safari, chrome, edge,
  brave). Only firefox is able to render them properly

- `outline` does not follow a `border-radius`, instead the outline is a
  rectangle

Allowing to control some modern features directly from storybook toolbar in which hokulea is
developed helps to directly see and understand the impact. It also helps to
write proper logical CSS.

Other little experiments address HTML and how it can be used beneficially,
especially in regards to accessibility. Especially given that ember uses
components and it is unclear what the underlying used element will be, attaching
a modifier can lead to unexpected results.

More of these little experiments are listed under [research](./research.md).

## The Saga Continues

...
