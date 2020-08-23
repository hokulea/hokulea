# Classification

This article explains the classification of entities with the hokulea design
system. [Atomic design](https://bradfrost.com/blog/post/atomic-web-design/) is
the backbone of them all. They make up one of the axis in which entities are
placed. With an orthogonal axis of unrelated segments entites are placed on a
matrix of them two.

@[figma](https://www.figma.com/file/sWEslYwEe6y87vkVn5DtKm/Classification-Sheet?node-id=1%3A2)

The atomic design axis clearly indicates a progression from small to big, the
second axis is more about areas in which entities appear, based on some rules
but no progression whatsoever. Interessting is that hokulea only operates within
the scope of _system_ wheres everything larger than molecules are supposed to
live in product landscape where it can follow its own rules and guidelines. The
main entities for hokulea are **design tokens**, **utilities** and **components**.

## Design Tokens

Research while developing hokulea has identified three types of tokens: _Basic_,
_Purpose_ and _Component_.

### Basic

A very low-level token type, e.g. a color of your palette. _Basic_ tokens
are mostly worked on from the branding team of your product. They define
color palettes and typography.

### Purpose

A token given a _semantic meaning_, e.g. the _action_ color (referencing to a
`basic` token). This is were designers map the basic tokens from a color palette
to their intended purpose. For example, your brand color will be referenced to
the main intention of interactions of your product.

### Component

A token for a _specific_ use-case. E.g. The heading color for your hero
component. As such _component_ tokens are good to control exceptions from the
intention of _purpose_ tokens.

## Utilities

Utilities in combination with [construction components](#construction) play a
major role in hokulea's consistency layer. Utilities are CSS Ions providing
a utility for one thing (do one thing, but do it well). Utilities are
mostly meant for structure related needs, such as focus styles and shapes, such
as border and its radius. Also utilities combine various typography related
instructions and provide them as one consumable entity.

They are a combination of
[composition](https://piccalil.li/cube-css/composition) and
[utility](https://piccalil.li/cube-css/utility) in [CUBE
CSS](https://piccalil.li/cube-css/).

## Components

Relevant for hokulea are components that are used _within_ the design system
boundary. They are described here with the rules that apply for them.

### Construction

Construction components provide blueprints to construct specific primitives
from. They provide the shell for that group of components in an abstract form,
ready to receive the final touches. As such, they are never meant to be shown
to the user directly. They are more described in detail under
[concepts](./concepts.md#construction-components).

- Use structure utils to describe the shell, such as border and focus state
- Use local sizing
- May provide padding
- May consume an `@element` argument
- Do NOT have margins
- Do NOT have colors

Examples: `<ButtonBuilder>`, `<InputBuilder>`, `<CardBuilder>`, `<BaseBadge>`

### Primitives

Primitives are the atomic components shown to the user. They are best described
with "do one thing but do it well". Following the name, these components are
dumb and are mere presentational.

- Use construction components
- Use the decorator pattern to apply styling
- Use local sizing
- Are single elements
- Are dumb
- Are controllable through html attributes
- Can receive `{{on}}` modifiers for interactivity
- May have `@arguments` for syntactic sugar (optional - see the [joy
  layer](./concepts.md))
- Do NOT have margins

Examples: `<*Button>`, `<*Input>`, `<*Badge>`, `<Icon>`, `<MenuItem>`

### Composites

Composites consist of multiple elements providing slots for dedicated children
element, which the composites control and manage.

- Use structure utils to describe the shell, such as border and focus state
- Use local sizing
- Provide slots for children
- May have functionality for interactivity
- Do NOT have margins

Examples: `<Menu>`, `<Select>`

### Containers

Containers are shells and provide slots for arbitrary content.

- Use structure utils to describe the shell, such as border and focus state
- Use global sizing
- Provide slots for children
- May have functionality for interactivity
- Do NOT have margins

Examples: `<Modal>`, `<Card>`

### Overview

| Class | Intelligence | Sizing | Pattern(s) |
| ----- | ------------ | ------ | ---------- |
| Construction | Dumb | Local | Builder |
| Primitive | Dumb | Local | Decorator |
| Composite | Dumb / Functional Logic | Local | Proxy |
| Container | Dumb / Functional Logic | Global | - |

### Your Product

Everything that lives beyond the design system, in product landscape is up
for your product to define. They may reach from templates to pages only, or
also include product specific primitives, too.
