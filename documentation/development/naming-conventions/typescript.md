# Naming Conventions for Typescript

Naming conventions for pure typescript (javacscript) code.

## Variable / Property Names

- Variables are written in `camelCase`
- Use a noun for an object
- Use plural form for enumberables
- Use adjectives for states
  - Be careful with words such as [open](https://en.wiktionary.org/wiki/open)
  - Consult [WAI ARIA States and
    Properties](https://www.w3.org/TR/wai-aria-1.1/#state_prop_def) for a
    name
- Keep parity between variable name and a thing that a function returns
- Do not prefix with `is`, `has`, `on` or types `b`, `i` etc.

Examples:

```js
const expanded = false;
const selected = true;
const selection = [];
const user = new User();
const foods = getFoods();
const temperature = getTemperature();
```

## Functions / Methods

### Does the Function Return a Boolean

- Prefix with `is` or `has`
- Use `is` with an adjective
- Use `has` with a noun
- Avoid using a negative

Examples:

```js
function isHot() {
  return temperature > 100;
}

function hasEggs(carton) {
  return carton.eggs.length > 0;
}
```

### Does the Function Return Anything Else

- Prefix with `get`
- End with the thing it returns
- Use the plural form if it returns an enumerable

Examples:

```js
function getTemperature() {
  return temperature;
}

function getEggs() {
  const eggs = [];
  return eggs;
}
```

### Functions that do Things

- Start with a verb end with a noun
- Make the noun the thing that is the receipient of the action:

Examples:

```js
calculateTemperature();
findThermometer();
```

### Parameter Names

- Don't include the type as part of the name; Use types for that rsp. comments for explanation
- Parameter names to match with the name of the thing they do from their function name

Examples:

```js
sendOffer(offer);
evaluateRecommendation(recommendation);
```

### Function / Argument Parity

- Keep function arguments and parameters similar (between definition and invocation)

Examples:

```js
function addNumbers(firstNum, secondNum) {
  return firstNum + secondNum;
}

const first = 40;
const second = 2;
const sum = addNumbers(first, second);
```

## Classes

- Class names are written in `PascalCase`

### Properties

- See [Variable / Property Names](#variable-%2F-property-names)
- Compounds as nouns

### Methods

- Methods follow the format: `verb (+ noun)`

  ✅

  - `change()`
  - `changeValue()`

  ⛔

  - `changed()`
  - `valueChanging()`
  - `onChange()`

- ❗Exception ❗Listeners for system calls/events are in the format: `noun + past tense verb` (think of event sourcing)

  ✅

  - `messageReceived()`
  - `messageUpdated()`

  ⛔

  - `received()`
  - `updated()`

## Events

Events can be divided into two groups:

1. User events:
   - emerging from user interaction (e.g. user clicks a button)
   - Direct feedback/interaction
3. System events:
   - origin is something _technically_ (e.g. message received from
   a socket)
   - Delayed/Async/Transitive feedback/interaction (e.g. user clicks a button
     and also a modal close is triggered)

### 1) User Events

Technical events (e.g. `"click"`) map to their handlers (methods in classes).

Handlers ...

- ... are in active tense
- ... do not use their technical names (e.g. `"click"`)
- ... are named to describe what they do respective to the domain they are in

Handlers **must not** ...

- ... start with prefixes, like `did` or `on`
- ... be in past tense

:exclamation:Execption:exclamation:

There are situations when handlers relate to their technical names (e.g. when
working very low-level), then those handlers usually start with `handle*` and
take the event as camel cased suffix.

✅

> - `handleKeyDown()`
> - `handleTouchStart()`

⛔

> - `handleKeydown()`
> - `touchstart()`

**Take your time to think about a proper name!**

Examples:

✅

```ts
class MyComponent extends Component {
  // domain names
  @action
  fetchMessages();

  @action
  dispatchOrder();

  // acceptable, fallback names (when operating low-level)
  @action
  handleTyping();

  @action
  handleKeyDown();
}
```

⛔

```ts
class MyComponent extends Component {
  @action
  clickCta();

  @action
  onClick();

  @action
  didClick();

  @action
  keyDown();
}
```

### 2) System Events

System events are those not initiated by a user interaction. Can be a socket
or an event bus publishing new messages. Their naming scheme is relatable to event
sourcing meaning past tense, e.g. `messageRecevied()`.

## References

This is based on the great work from [Frank M
Taylor](https://blog.frankmtaylor.com) with his [Tiny Rules gist](https://gist.github.com/paceaux/8638765e747f5bd6387b721cde99e066).
