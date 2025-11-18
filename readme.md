# Miovo

> Type-safe, dependency-free, modern utility library for JavaScript and TypeScript

[![npm version](https://img.shields.io/npm/v/miovo.svg)](https://www.npmjs.com/package/miovo)
[![bundle size](https://img.shields.io/bundlephobia/minzip/miovo)](https://bundlephobia.com/package/miovo)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

## ✨ Features

- 🎯 **TypeScript First** - Written in TypeScript with full type safety
- 📦 **Zero Dependencies** - No external dependencies, lightweight and secure
- 🌍 **Universal** - Works in Node.js, Browsers, Deno, Bun, and Cloudflare Workers
- 🔥 **Modern** - Uses latest ECMAScript features with ES2025+ support
- 🌲 **Tree-shakable** - Optimized for tree-shaking, only bundle what you use
- ⚡️ **Performant** - Carefully optimized for performance
- 📝 **Well Documented** - Comprehensive documentation and examples
- ✅ **Fully Tested** - High test coverage with 400+ tests

## 📦 Installation

```bash
# npm
npm install miovo

# pnpm
pnpm add miovo

# yarn
yarn add miovo

# bun
bun add miovo
```

## 🚀 Usage

```typescript
import { debounce, formatMs, unique, match, chunk, retry } from 'miovo'

// Debounce function
const handleSearch = debounce((query: string) => {
  console.log('Searching for:', query)
}, 300)

// Format milliseconds
console.log(formatMs(90000)) // "1m 30s"

// Remove duplicates with custom identity
const users = unique(
  [
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' },
    { id: 1, name: 'Alice' },
  ],
  (user) => user.id,
) // [{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }]

// Split array into chunks
chunk([1, 2, 3, 4, 5], 2) // [[1, 2], [3, 4], [5]]

// Retry failed operations
await retry(async () => {
  const res = await fetch('/api/data')
  if (!res.ok) throw new Error('Failed')
  return res.json()
}, { retries: 3, delay: 1000 })

// Pattern matching
const result = match(value)
  .case(1, 'one')
  .case(2, 'two')
  .case(
    (x) => x > 10,
    (v) => `large: ${v}`,
  )
  .default('other')
```

## 📑 API Overview

### Function Utilities

| Category          | Functions                                                                                                                                                               |
| ----------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **⏱️ Timing**     | [`debounce`](#debouncefn-delay-options) · [`throttle`](#throttlefn-delay-options) · [`wait`](#waitms) · [`sleep`](#sleepms) · [`timestamp`](#timestampinseconds)       |
| **🎨 Formatting** | [`formatMs`](#formatmsms-options) · [`formatByte`](#formatbytebytes-options) · [`formatTime`](#formattimedate-format)                                                   |
| **🔐 Encoding**   | [`base64`](#base64encodestr--base64decodestr) · [`hash`](#hashstr) · [`md5`](#md5str) · [`uuid`](#uuid)                                                                 |
| **🎲 Random**     | [`random`](#randomseed) · [`Random`](#random-class) · [`randomId`](#randomidlength-seed) · [`randomInt`](#randomintmin-max-seed) · [`sample`](#samplearray-seed) · [`shuffle`](#shufflearray-seed) |
| **📊 Array**      | [`chunk`](#chunkarray-size) · [`unique`](#uniquearray-identity) · [`toArray`](#toarrayvalue) · [`range`](#rangestart-end-step) · [`sum`](#sumnumbers)                  |
| **🔢 Number**     | [`clamp`](#clampvalue-min-max) · [`inRange`](#inrangevalue-min-max)                                                                                                     |
| **🎯 Pattern**    | [`match`](#matchvalue)                                                                                                                                                  |
| **🔗 String**     | [`dedent`](#dedentstr--dedenttemplate) · [`truncate`](#truncatestr-length-suffix) · [`qs`](#qsparsestr--qsstringifyobj)                                                 |
| **🔄 Control**    | [`retry`](#retryfn-options) · [`noop`](#noop)                                                                                                                            |

### TypeScript Utilities

| Category                 | Types                                                              |
| ------------------------ | ------------------------------------------------------------------ |
| **Object Transform**     | `DeepPartial` · `DeepRequired` · `DeepReadonly` · `Mutable`        |
| **Type Manipulation**    | `Prettify` · `UnionToIntersection` · `PickByValue` · `OmitByValue` |
| **Selective Modifiers**  | `RequireKeys` · `PartialKeys` · `Nullable`                         |
| **Function Utils**       | `FunctionKeys` · `OmitFunctions`                                   |
| **Advanced Constraints** | `RequireAtLeastOne` · `RequireOnlyOne`                             |
| **Type Detection**       | `IsAny` · `IsNever` · `IsUnknown`                                  |
| **Template Literals**    | `StringToNumber`                                                   |

---

## 📚 API Reference

### 🔧 Function Utilities

#### `debounce(fn, delay, options?)`

Creates a debounced function that delays invoking `fn` until after `delay` milliseconds have elapsed since the last time the debounced function was invoked.

```typescript
import { debounce } from 'miovo'

const saveData = debounce((data: string) => console.log('Saving:', data), 1000, {
  leading: false,
  trailing: true,
  maxWait: 5000,
})

saveData('hello') // Will execute after 1000ms
```

**Options:**

- `leading: boolean` - Execute on the leading edge (default: `false`)
- `trailing: boolean` - Execute on the trailing edge (default: `true`)
- `maxWait: number` - Maximum time to wait before forced execution

**Returns:** `DebouncedFunction<T>` with `.cancel()` and `.flush()` methods

---

#### `throttle(fn, delay, options?)`

Creates a throttled function that only invokes `fn` at most once per every `delay` milliseconds.

```typescript
import { throttle } from 'miovo'

const handleScroll = throttle(() => console.log('Scrolling...'), 200, {
  leading: true,
  trailing: true,
})

window.addEventListener('scroll', handleScroll)
```

**Options:**

- `leading: boolean` - Execute on the leading edge (default: `true`)
- `trailing: boolean` - Execute on the trailing edge (default: `true`)

**Returns:** `ThrottledFunction<T>` with `.cancel()` method

---

#### `wait(ms)`

Returns a promise that resolves after the specified milliseconds.

```typescript
import { wait } from 'miovo'

async function demo() {
  console.log('Start')
  await wait(1000)
  console.log('After 1 second')
}
```

---

### 🎨 Formatting Utilities

#### `formatMs(ms, options?)`

Formats milliseconds into a human-readable time string.

```typescript
import { formatMs } from 'miovo'

formatMs(90000) // "1m 30s"
formatMs(3665000) // "1h 1m"
formatMs(1234, { composite: false }) // "1.23s"
formatMs(93784000, { maxUnits: 3 }) // "1d 2h 3m"
```

**Options:**

- `composite: boolean` - Use multiple units (default: `true`)
- `maxUnits: number` - Maximum number of units to show (default: `2`)
- `precision: number` - Decimal places for single unit mode (default: `2`)

---

#### `formatByte(bytes, options?)`

Formats bytes into a human-readable size string.

```typescript
import { formatByte } from 'miovo'

formatByte(1024) // "1 KB"
formatByte(1536, { precision: 2 }) // "1.50 KB"
formatByte(1024 ** 3) // "1 GB"
```

**Options:**

- `precision: number` - Decimal places (default: `0`)

---

#### `formatTime(date, format?)`

Formats a date into a string using a template.

```typescript
import { formatTime } from 'miovo'

const date = new Date('2024-01-15 14:30:45')

formatTime(date, 'YYYY-MM-DD') // "2024-01-15"
formatTime(date, 'YYYY/MM/DD HH:mm:ss') // "2024/01/15 14:30:45"
formatTime(date, 'HH:mm') // "14:30"
```

**Supported tokens:**

- `YYYY` - 4-digit year
- `MM` - 2-digit month (01-12)
- `DD` - 2-digit day (01-31)
- `HH` - 2-digit hour (00-23)
- `mm` - 2-digit minute (00-59)
- `ss` - 2-digit second (00-59)

---

### 🔐 Encoding & Hashing

#### `base64.encode(str)` / `base64.decode(str)`

Cross-platform Base64 encoding/decoding with Unicode support.

```typescript
import { base64 } from 'miovo'

const encoded = base64.encode('Hello, 世界!') // "SGVsbG8sIOS4lueVjCE="
const decoded = base64.decode(encoded) // "Hello, 世界!"
```

---

#### `hash(str, seed?)`

Fast non-cryptographic hash function (MurmurHash3).

```typescript
import { hash } from 'miovo'

hash('hello') // 1335831723
hash('hello', 42) // Different seed = different hash
```

---

#### `md5(str)`

MD5 hash function (for non-security purposes).

```typescript
import { md5 } from 'miovo'

md5('hello') // "5d41402abc4b2a76b9719d911017c592"
```

⚠️ **Note:** MD5 is not cryptographically secure. Use for checksums only.

---

#### `uuid()`

Generates a RFC4122 v4 compliant UUID.

```typescript
import { uuid } from 'miovo'

uuid() // "f47ac10b-58cc-4372-a567-0e02b2c3d479"
```

---

### 🎲 Random Utilities

#### `random(seed)`

Creates a seeded pseudo-random number generator with reproducible sequences.

```typescript
import { random } from 'miovo'

const rng = random(12345)
rng.random() // 0.6011037053447217
rng.random() // 0.2541264604032785

// Same seed produces same sequence
const rng2 = random(12345)
rng2.random() // 0.6011037053447217 (same as first)
```

---

#### `Random` Class

A seeded pseudo-random number generator class with utility methods.

```typescript
import { Random } from 'miovo'

const rng = new Random(42)

// Generate random numbers
rng.random() // [0, 1) float
rng.int(1, 10) // Random integer 1-10 (inclusive)
rng.float(0, 100) // Random float [0, 100)

// Array operations
rng.pick(['a', 'b', 'c']) // Random element
rng.shuffle([1, 2, 3, 4]) // Shuffled array

// Boolean with probability
rng.bool() // 50% true/false
rng.bool(0.7) // 70% chance of true

// Reset to initial state
rng.reset(42)
```

---

#### `randomId(length?, seed?)`

Generates a random alphanumeric ID with optional seed for reproducibility.

```typescript
import { randomId } from 'miovo'

randomId() // "gx4k2n7p9m5q8j3w" (default length: 16)
randomId(8) // "a3k9m2p5"
randomId(12, 42) // Reproducible ID with seed
```

---

#### `randomInt(min, max, seed?)`

Generates a random integer with optional seed for reproducibility.

```typescript
import { randomInt } from 'miovo'

randomInt(1, 10) // Random number from 1 to 10
randomInt(0, 100) // Random number from 0 to 100
randomInt(1, 6, 42) // Reproducible dice roll with seed
```

---

#### `sample(array, seed?)`

Returns a random element from an array with optional seed.

```typescript
import { sample } from 'miovo'

const fruits = ['apple', 'banana', 'cherry']
sample(fruits) // Randomly returns one of the fruits
sample(fruits, 42) // Reproducible random selection

sample([]) // undefined
```

---

#### `shuffle(array, seed?)`

Shuffles an array using Fisher-Yates algorithm with optional seed.

```typescript
import { shuffle } from 'miovo'

shuffle([1, 2, 3, 4, 5]) // [3, 1, 5, 2, 4]
shuffle([1, 2, 3, 4, 5], 42) // Reproducible shuffle

const original = [1, 2, 3]
const shuffled = shuffle(original)
// original is unchanged
```

---

### 📊 Array Utilities

#### `chunk(array, size)`

Splits an array into chunks of specified size.

```typescript
import { chunk } from 'miovo'

chunk([1, 2, 3, 4, 5], 2) // [[1, 2], [3, 4], [5]]
chunk([1, 2, 3, 4], 2) // [[1, 2], [3, 4]]
chunk(['a', 'b', 'c'], 1) // [['a'], ['b'], ['c']]

// Edge cases
chunk([], 2) // []
chunk([1, 2, 3], 5) // [[1, 2, 3]]
```

---

#### `unique(array, identity?)`

Removes duplicate values from an array.

```typescript
import { unique } from 'miovo'

// Simple deduplication
unique([1, 2, 2, 3, 4, 4, 5]) // [1, 2, 3, 4, 5]

// With custom identity function
const users = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
  { id: 1, name: 'Alice Clone' },
]
unique(users, (user) => user.id) // [{ id: 1, ... }, { id: 2, ... }]

// Case-insensitive deduplication
unique(['Apple', 'banana', 'APPLE'], (s) => s.toLowerCase())
// ['Apple', 'banana']
```

---

#### `toArray(value)`

Converts a value to an array.

```typescript
import { toArray } from 'miovo'

toArray(5) // [5]
toArray([1, 2, 3]) // [1, 2, 3] (unchanged)
toArray(null) // []
toArray(undefined) // []
```

---

#### `range(start, end, step?)`

Creates an array of numbers progressing from start to end.

```typescript
import { range } from 'miovo'

range(0, 5) // [0, 1, 2, 3, 4, 5]
range(1, 10) // [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
range(0, 10, 2) // [0, 2, 4, 6, 8, 10]
range(5, 0, -1) // [5, 4, 3, 2, 1, 0]

// Negative ranges
range(-5, -1) // [-5, -4, -3, -2, -1]
```

---

#### `sum(numbers)`

Calculates the sum of an array of numbers.

```typescript
import { sum } from 'miovo'

sum([1, 2, 3, 4, 5]) // 15
sum([10, -5, 3]) // 8
sum([]) // 0
sum([42]) // 42
```

---

### 🔢 Number Utilities

#### `clamp(value, min, max)`

Clamps a number within the inclusive range defined by min and max.

```typescript
import { clamp } from 'miovo'

clamp(15, 0, 10) // 10
clamp(-5, 0, 10) // 0
clamp(5, 0, 10) // 5

// With negative numbers
clamp(-15, -10, -5) // -10
clamp(-3, -10, -5) // -5
```

---

#### `inRange(value, min, max)`

Checks if a number is within the specified range (inclusive).

```typescript
import { inRange } from 'miovo'

inRange(5, 0, 10) // true
inRange(0, 0, 10) // true
inRange(10, 0, 10) // true
inRange(11, 0, 10) // false
inRange(-1, 0, 10) // false
```

---

### 🎯 Pattern Matching

#### `match(value)`

Rust-style pattern matching with type-safe cases.

```typescript
import { match } from 'miovo'

// Simple value matching
const result = match(status)
  .case('idle', () => 'Waiting...')
  .case('loading', () => 'Loading...')
  .case('error', () => 'Failed!')
  .default(() => 'Unknown')

// Predicate matching
const size = match(value)
  .case((x) => x < 10, 'small')
  .case((x) => x < 100, 'medium')
  .case((x) => x < 1000, 'large')
  .default('huge')

// Direct value return (no function)
const color = match(type).case('success', 'green').case('warning', 'yellow').case('error', 'red').default('gray')
```

---

### 🔗 String Utilities

#### `dedent(str)` / `` dedent`template` ``

Removes leading indentation from multi-line strings.

```typescript
import { dedent } from 'miovo'

// Function call
const code = dedent(`
  function hello() {
    console.log('world')
  }
`)

// Template literal
const html = dedent`
  <div>
    <h1>Title</h1>
    <p>Content</p>
  </div>
`
```

---

#### `truncate(str, length, suffix?)`

Truncates a string to specified length with optional suffix.

```typescript
import { truncate } from 'miovo'

truncate('Hello, World!', 8) // "Hello..."
truncate('Hello, World!', 8, '…') // "Hello, …"
truncate('Short', 10) // "Short"

// Custom suffix
truncate('Lorem ipsum dolor sit amet', 15, '...[more]')
// "Lorem ip...[more]"
```

---

#### `qs.parse(str)` / `qs.stringify(obj)`

Parse and stringify URL query strings.

```typescript
import { qs } from 'miovo'

// Parse
qs.parse('foo=bar&baz=qux') // { foo: 'bar', baz: 'qux' }
qs.parse('?name=John&age=30') // { name: 'John', age: '30' }

// Stringify
qs.stringify({ foo: 'bar', baz: 'qux' }) // "foo=bar&baz=qux"
qs.stringify({ name: 'John', age: 30 }) // "name=John&age=30"
```

---

### 🔄 Control Flow Utilities

#### `retry(fn, options?)`

Retries an async function with configurable attempts, delay, and backoff.

```typescript
import { retry } from 'miovo'

// Basic retry
const data = await retry(
  async () => await fetch('/api/data').then((r) => r.json()),
  { attempts: 3, delay: 1000 },
)

// With exponential backoff
const result = await retry(async () => await fetchData(), {
  attempts: 5,
  delay: 1000,
  backoff: 2, // 1s, 2s, 4s, 8s, 16s
  maxDelay: 10000, // Cap at 10s
})

// Conditional retry
const result = await retry(async () => await fetchData(), {
  attempts: 3,
  shouldRetry: (error) => error.status === 503, // Only retry on 503
})
```

**Options:**

- `attempts: number` - Maximum retry attempts (default: 3)
- `delay: number` - Delay between retries in ms (default: 1000)
- `backoff: number` - Exponential backoff multiplier (default: 1)
- `maxDelay: number` - Maximum delay in ms (default: Infinity)
- `shouldRetry: (error, attempt) => boolean` - Retry predicate

---

#### `noop()`

A no-operation function that does nothing.

```typescript
import { noop } from 'miovo'

const onClick = isEnabled ? handleClick : noop

// Useful as default callback
function fetchData(onSuccess = noop, onError = noop) {
  // ...
}
```

---

### ⏱️ Time Utilities

#### `timestamp(inSeconds?)`

Returns current timestamp in milliseconds or seconds.

```typescript
import { timestamp } from 'miovo'

timestamp() // Current time in milliseconds (default: false)
timestamp(false) // Current time in milliseconds
timestamp(true) // Current time in seconds
```

---

#### `sleep(ms)`

Alias for `wait(ms)` - Returns a promise that resolves after the specified milliseconds.

```typescript
import { sleep } from 'miovo'

await sleep(1000) // Wait for 1 second
```

---

## 🎭 TypeScript Utilities

Miovo includes 21 powerful TypeScript utility types:

### Object Transformations

```typescript
import type { DeepPartial, DeepRequired, DeepReadonly, Mutable } from 'miovo'

// DeepPartial - Make all properties optional recursively
type User = { name: string; address: { city: string; zip: number } }
type PartialUser = DeepPartial<User>
// { name?: string; address?: { city?: string; zip?: number } }

// DeepRequired - Make all properties required recursively
type RequiredUser = DeepRequired<PartialUser>
// { name: string; address: { city: string; zip: number } }

// DeepReadonly - Make all properties readonly recursively
type ReadonlyUser = DeepReadonly<User>
// { readonly name: string; readonly address: { readonly city: string; ... } }

// Mutable - Remove readonly modifiers
type MutableUser = Mutable<ReadonlyUser>
// { name: string; address: { ... } }
```

### Type Manipulation

```typescript
import type { Prettify, UnionToIntersection, PickByValue, OmitByValue } from 'miovo'

// Prettify - Flatten intersection types
type A = { a: string } & { b: number }
type Pretty = Prettify<A> // { a: string; b: number }

// UnionToIntersection - Convert union to intersection
type Union = { a: string } | { b: number }
type Intersection = UnionToIntersection<Union>
// { a: string } & { b: number }

// PickByValue - Pick properties by value type
type User = { name: string; age: number; email: string }
type Strings = PickByValue<User, string> // { name: string; email: string }

// OmitByValue - Omit properties by value type
type NonStrings = OmitByValue<User, string> // { age: number }
```

### Selective Modifiers

```typescript
import type { RequireKeys, PartialKeys, Nullable } from 'miovo'

type User = { name?: string; age?: number; email?: string }

// RequireKeys - Make specific keys required
type UserWithName = RequireKeys<User, 'name' | 'email'>
// { name: string; age?: number; email: string }

// PartialKeys - Make specific keys optional
type UserWithOptionalAge = PartialKeys<Required<User>, 'age'>
// { name: string; age?: number; email: string }

// Nullable - Make keys nullable
type UserWithNullableAge = Nullable<User, 'age'>
// { name?: string; age: number | null; email?: string }
```

### Function Utilities

```typescript
import type { FunctionKeys, OmitFunctions } from 'miovo'

type User = {
  name: string
  age: number
  getName: () => string
  setAge: (age: number) => void
}

// FunctionKeys - Extract function property keys
type Methods = FunctionKeys<User> // 'getName' | 'setAge'

// OmitFunctions - Remove all function properties
type Data = OmitFunctions<User> // { name: string; age: number }
```

### Advanced Constraints

```typescript
import type { RequireAtLeastOne, RequireOnlyOne } from 'miovo'

type Contact = {
  name: string
  email?: string
  phone?: string
}

// RequireAtLeastOne - Require at least one of specified keys
type ValidContact = RequireAtLeastOne<Contact, 'email' | 'phone'>
// Must have name and at least one of email or phone

// RequireOnlyOne - Require exactly one of specified keys
type Payment = {
  amount: number
  card?: string
  paypal?: string
}
type ValidPayment = RequireOnlyOne<Payment, 'card' | 'paypal'>
// Must have amount and exactly one payment method
```

### Type Detection

```typescript
import type { IsAny, IsNever, IsUnknown } from 'miovo'

type T1 = IsAny<any> // true
type T2 = IsAny<string> // false

type T3 = IsNever<never> // true
type T4 = IsNever<void> // false

type T5 = IsUnknown<unknown> // true
type T6 = IsUnknown<any> // false
```

### Template Literals

```typescript
import type { StringToNumber } from 'miovo'

type Five = StringToNumber<'5'> // 5
type Ten = StringToNumber<'10'> // 10
```

## 💡 Use Native TypeScript Instead

Some operations have simpler native alternatives:

```typescript
// ❌ Don't need a custom type
type ArrayElement<T> = T extends (infer E)[] ? E : never

// ✅ Use T[number] directly
type Nums = [1, 2, 3][number] // 1 | 2 | 3

// ❌ Don't need custom type
type PromiseType<T> = T extends Promise<infer U> ? U : never

// ✅ Use built-in Awaited<T>
type Data = Awaited<Promise<{ id: number }>>

// ❌ Don't need alias
type Except<T, K> = Omit<T, K>

// ✅ Use built-in Omit directly
type PublicUser = Omit<User, 'password'>
```

## 📖 Best Practices

### 1. Use Specific Imports

```typescript
// ✅ Good - Tree-shakable
import { debounce, formatMs } from 'miovo'

// ❌ Avoid - Imports everything
import * as miovo from 'miovo'
```

### 2. Type-Safe Pattern Matching

```typescript
// ✅ Type-safe with TypeScript
const result = match<Status, string>(status)
  .case('loading', 'Loading...')
  .case('error', (err) => `Error: ${err}`)
  .default('Unknown')
```

### 3. Debounce/Throttle Cleanup

```typescript
// ✅ Clean up on unmount
const debouncedFn = debounce(handleInput, 300)

// Later...
debouncedFn.cancel() // Cancel pending execution
```

## 🧪 Testing

```bash
# Run tests
pnpm test

# Run tests with coverage
pnpm test:coverage

# Type check
pnpm typecheck
```

## 📦 Build

```bash
pnpm build
```

Output:

- `dist/index.mjs` - ESM bundle
- `dist/index.cjs` - CommonJS bundle
- `dist/index.d.ts` - TypeScript declarations

## 🌟 Why Miovo?

- **No Lodash Needed**: Modern replacements for common Lodash/Underscore utilities
- **Better than date-fns**: Lightweight formatting without heavy dependencies
- **Type-Safe Alternative**: To ramda, fp-ts with easier learning curve
- **Universal Runtime**: Works everywhere JavaScript runs

## 📄 License

MIT © [Viki](https://github.com/vikiboss)

## 🤝 Contributing

Contributions, issues and feature requests are welcome!

## 🙏 Credits

Inspired by:

- [VueUse](https://vueuse.org/)
- [Lodash](https://lodash.com/)
- [date-fns](https://date-fns.org/)
- [type-fest](https://github.com/sindresorhus/type-fest)
