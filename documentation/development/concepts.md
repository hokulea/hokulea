# Concepts

This page describes some re-occuring concepts being used in hokulea that are
also accessible for you.

## Construction Components

Hokulea has a low-level set of components classified as construction components
to compose and construct components of a specific type. These construction
components provide the structure of a component while a specific implementation
uses the [deocrator pattern](https://refactoring.guru/design-patterns/decorator)
to apply the final touches, such as styling.

These construction components come in two different variants:

Builder Components

: They implement the [builder
pattern](https://refactoring.guru/design-patterns/builder) in a declarative
way. Either internally but also ready for you to construct components
the way you need them to be. You see various `Builder` stories
throughout the documentation, that is where this builder mechanics are passed
through the specific implementation and you can compose then in the applied
style.

Base Components

: When the construction components do not offer builder mechanics then a base
component is provided. They offer you the rim/shell of which you compose your
specific implementation.

Both have in common they provide you with an `@element` argument, which you can
use to provide your own element, using the [`{{element}}` helper](https://github.com/tildeio/ember-element-helper) to customize the base
element and adjust them to your semantics.

## Decorate Native Elements

To create the most enjoyable DX, hokulea aims to stick to HTML as much
as possible. Thanks to ember and its HTML first approach this is goal is
achieveable straight forward. As such elements that are available
in HTML will be wrapped by hokulea and decorated with its own styling but APIs
mostly stay as they are (no need to learn anything new). Hokulea provides a thin
layer on top, where it can to bring even more joy when working with it.
That also means that accessibility can be implemented as learned and also
no need to learn anything on top. For example, use `aria-*` attributes as
you already do in HTML.

### Use HTML as You Already Do

For example, the `<Button>` components are really just `<button>` with
additional styling:

```hbs
<Button>Hello</Button>
```

will render as

```html
<button class="...">Hello</Button>
```

Here is an example for accessibility. Well... you already know how to do this:

```hbs
<Button aria-label="Go Tomster">
  <span aria-hidden="true">🐹</span>
</Button>
```

will render as:

```html
<button class="..." aria-label="Go Tomster">
  <span aria-hidden="true">🐹</span>
</button>
```

And the last example with an input:

```hbs
<TextInput value="foo" {{on "input" this.handleTyping}}/>
```

!!! Note: `<Input>` and `<Textarea>` are taken by ember itself.

Use hokulea components as if it where native HTML elements, like so:

```hbs
<TextInput id="input-1234" readonly disabled/>
```

!!! Note: Due to some bugs in glimmer you might need to use `readonly={{true}}` and `disabled={{true}}`

### More Productivity With the Joy-Layer on Top

For inputs, there is a common interface that hokulea puts on top, to create a
consistency between them all and use it in combination with the [builder
construction component](#construction-components). All inputs implement this
generic interface:

```ts
interface InputControl {
  value: unknown;
  update: (value: unknown) => void;
}
```

Each respective input declares its type for `@value` and `@update` is a shortcut
version to not handle the event but receive the value directly. The example from
above can also be written as this (and is basically also a preferred way):

```hbs
<TextInput @value={{this.value}} @update={{set this.value}}/>
```

## Single Element Pattern

With the [construction components](#construction-components) it is super easy to
create variants of each base as its own component. As such, in hokulea you will
not find `@intent`, `@appearance`, `@indicator` or similar arguments to control
the variant of a component. Instead those will be available as direct component,
e.g. `<AccentButton>` and `<WarningBadge>`. This way the coherence of these
component is kept high, mainteneance is reduced to the minimum and side-effects
are lowered to a minimum if not cleared away completely.

More of this benefits are, that the arguments for a developer to remember will
be reduced to only the minimum (or at best none at all). Developers do not have
to find themselves in re-occuring failing recall scenarios of misspelled
argument names. (Almost) zero-arguments for components greatly adds to the
joy-layer hokulea is about.

This is referred to as the [single element
pattern](https://www.freecodecamp.org/news/introducing-the-single-element-pattern-dfbd2c295c5d/).
