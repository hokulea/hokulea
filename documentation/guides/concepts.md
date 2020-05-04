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
use to provide your own element, using the [`element` helper](https://github.com/tildeio/ember-element-helper) to customize the base
element and adjust them to your semantics.
