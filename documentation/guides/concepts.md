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
achieveable quite straight forward. As such elements that are native available
in HTML will be wrapped by hokulea and decorated with its own styling but APIs
mostly stay as they are (no need to learn anything new). Some additions go on
top. That also means that accessibility can be implemented as learned and also
no need to learn anything on top. E.g. `aria-*` attributes as you already do in
HTML.

For example, the `<Button>` components are really just `<button>` with
additional styling:

```hbs
<Button disabled={{true}} aria-labelledby="my-button-label">
  <span aria-hidden="true">🐹</span>
</Button>
```

will render a `<button>` with additional CSS `class` on top. HTML API continues
to work. Same goes for inputs:

```hbs
<TextInput value="foo" {{on "input" this.handleTyping}}/>
```

!!! Note: `<Input>` and `<Textarea>` are taken by ember itself

For inputs, there is a common interface that hokulea puts on top, to create a
consistency between them all and use it in combination with the [builder
construction component](#construction-components). All inputs implement this interface:

```ts
interface InputControl {
  value: unknown;
  update: (value: unknown) => void;
}
```

Each respective input declares what type `@value` is and `@update` is a shortcut
version to not handle the event but receive the value directly. The example from
above can also be written as this (and is basically also a preferred way):

```hbs
<TextInput @value={{this.value}} @update={{set this.value}}/>
```

Despite this layer on top, you can use hokulea components as if it where native
HTML elements, like so:

```hbs
<TextInput id="input-1234" readonly/>
```
