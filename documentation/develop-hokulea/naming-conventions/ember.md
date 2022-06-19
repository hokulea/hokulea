# Naming Conventions for Ember

## Classes

- If they extend an ember class, they take it as suffix, e.g. `SessionService`,
  `ButtonComponent`, `AboutUsRoute`, ...
- If a component has arguments, they are defined in an interface, with the same
  name as the component, but with `Args` as its suffix, e.g. `ButtonComponent`
  and `ButtonArgs`. Example:

  ```ts
  export interface ButtonArgs {
    // ...
  }

  export default class ButtonComponent extends Component<ButtonArgs> {
    // ...
  }
  ```

## Components

### Arguments

Arguments for components:

- Arguments are defined in the respective interface to a component (see above)
- Choose semantic names over technical ones, see [Variable / Property
  Names](./typescript.md)
- Callback arguments follow the semantics of events
  - User events / Callbacks that mutate an argument are in active tense
  - System events are in past tense
- Allow `{{on}}` modifier over specific invocation argument, see
  [Classification](../classification.md)
- Configuration arguments to follow `allowXyz`, `enableAbc` etc.

  ✅

  ```hbs
  <Button
    {{on "click" this.openModal}}    {{!-- user event callback --}}
  />

  <Modal
    @open={{this.modalOpen}}         {{!-- state argument --}}
    @opened={{this.modalOpened}}     {{!-- system event callback --}}
    @closed={{this.modalClosed}}     {{!-- system event callback --}}
  />
  ```

  ⛔

  ```hbs
  <Button
    @click={{this.clickButton}}      {{!-- primitive component, use modifier --}}
  />

  <Modal
    @visible={{this.modalVisible}}   {{!-- stick within the naming scheme --}}
    @open={{this.modalOpened}}       {{!-- callback for system event, but has active tense -- }}
    @close={{this.modalClosed}}      {{!-- callback for system event, but has active tense -- }}
  />
  ```

Common argument names:

| Argument   |  Use-Case                                                                                                             |
| ---------- | --------------------------------------------------------------------------------------------------------------------- |
| `update()` | Callback handler, when the value has been changed within the component and this is the action to bubble up the change |
| `value`    | Passing down a generic value (e.g. mostly input components)                                                           |

### Argument / Component Name Parity

With the [single element pattern](../concepts.md) hokulea is following, the
arguments to components are reduced to its bare minimum or completely avoided at
best. On the other hand, the component name can be a hint of what argument is a
mandatory one. For example, the `<Button>` doesn't need any argument. When
extended to take a link argument, this will be a new `<LinkButton>` component
and the new prefix hints at an argument being needed now. Keep the argument name
and the prefix of the component name in sync:

✅

```hbs
<LinkButton @link={{link "home"}}>Home</LinkButton>
```

⛔

```hbs
<LinkButton @target={{link "home"}}>Home</LinkButton>
```

### Naming Properties (State)

For naming properties it may make sense to consult the [WAI ARIA States and Properties](https://www.w3.org/TR/wai-aria-1.1/#state_prop_def) to match properties with their respective aria-state.

Examples:

```js
class DisclosureComponent extends Component {
  @tracked expanded = false;
}
```

In this example, the `expanded` property represents that collapsible state and uses the same name as the aria-state (which, else could be `open`, `visible` or `show`).

### Properties / Methods

While arguments are the public interface to the component, properties are
internal. That said an argument shall be semantic, while properties can be
technical.

### Properties vs. Methods

When you are accessing a computed state, this shall be expressed as a "getter"
to utilize embers reactivity system. However, the actual code to determine for
example a boolean state can be defered to an `is*` or `has*` function method.
Important to note, everything beginning with `is` or `has` is considered to
_invocable_. This would mean: `this.hot` vs `this.isHot()`.

Examples:

```js
class ThermometerComponent extends Component {
  @tracked temperature;
  
  isHot(temperature) {
    return temperature > 100;
  }
  
  get hot() {
    return this.isHot(this.temperature);
  }
}

// or even better:
function isHot(temperature) {
  return temperature > 100;
}

class ThermometerComponent extends Component {
  @tracked temperature;

  get hot() {
    return isHot(this.temperature);
  }
}
```

### Named Blocks

With [RFC 460](https://emberjs.github.io/rfcs/0460-yieldable-named-blocks.html)
components can have named blocks as slots for particular content.

#### Common Names

Here are common names for the two main directions and the order in which names
blocks can appear.

Flow direction (In `horizontal-tb` writing mode this is from top to bottom):

- `header?`
- `main`
- `footer?`

Example:

```hbs
<Card>
  <:header>Title of the card</:header>
  <:main>Here goes the heavy content</:main>
</Card>
```

Writing direction (In `horizontal-tb` writing mode this is from left to right):

- `before?`
- `main`
- `after?`

Example:

```hbs
<Button>
  <:before>Arrow left Icon</:before>
  <:main>Go Back</:main>
</Button>
```

NOTE: If all optional named blocks are omitted, no named blocks are needed and
fall back to the `main` one.

#### Differences Named Blocks vs. Yielded Components

There is a different between named blocks and yielded components:

Named Blocks:

- Place your content at a particular spot within the component
- Can yield parameters
- Can NOT take html attributes
- Can NOT take arguments
- Limited to ONE invication

Yielded Components:

- Place your content at the current location
- Can yield parameters
- Can take attributes
- Can take arguments
- Multiple invocations
