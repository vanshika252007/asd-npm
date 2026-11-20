# DevUtils

**DevUtils** is a lightweight, dependency-free JavaScript utility toolkit for everyday Node.js and JavaScript development. It provides predictable helpers for strings, arrays, validation, objects, numbers, and dates.

[![Node.js](https://img.shields.io/badge/node-%3E%3D18-brightgreen)](https://nodejs.org/)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](./LICENSE)

## Features

- String capitalization, reversing, slugs, truncation, word counting, and palindromes
- Array deduplication, chunking, flattening, min/max, and shuffling
- Email, phone, password, emptiness, and URL validation
- Deep cloning and safe object key operations
- Number boundaries, rounding, randomness, and parity checks
- Date formatting, relative time, day differences, and date validation
- CommonJS exports and individual subpath imports
- No runtime dependencies

## Requirements

- Node.js 18 or newer
- npm 9 or newer

## Installation

```bash
npm install devutils-npm
```

## Quick Start

```js
const devutils = require("devutils-npm");

devutils.capitalize("javascript"); // "Javascript"
devutils.slugify("Hello, World!"); // "hello-world"
devutils.chunkArray([1, 2, 3, 4], 2); // [[1, 2], [3, 4]]
devutils.isValidEmail("student@example.com"); // true
devutils.randomNumber(1, 6); // an integer from 1 through 6
```

You can also import only a category:

```js
const { slugify, truncate } = require("devutils-npm/strings");
const { isValidEmail } = require("devutils-npm/validation");
```

## API Reference

Invalid types normally throw `TypeError`. Invalid ranges or boundaries throw `RangeError`. Check helpers such as `isValidEmail` return `false` for invalid input instead of throwing.

### String Utilities

| Function | Parameters | Result |
|---|---|---|
| `capitalize(value)` | `value: string` | Capitalizes the first character |
| `reverseString(value)` | `value: string` | Reverses Unicode code points |
| `slugify(value)` | `value: string` | Returns a lowercase URL-friendly slug |
| `truncate(value, length, suffix?)` | String, non-negative integer, optional string suffix | Truncated text |
| `countWords(value)` | `value: string` | Number of whitespace-separated words |
| `isPalindrome(value)` | `value: string` | Whether letters and digits are symmetric |

```js
const { reverseString, truncate, countWords } = devutils;

reverseString("hello"); // "olleh"
truncate("Hello world", 8); // "Hello..."
countWords("Dev utilities are useful"); // 4
```

### Array Utilities

| Function | Parameters | Result |
|---|---|---|
| `removeDuplicates(value)` | `value: Array` | Copy with duplicate values removed |
| `chunkArray(value, size)` | Array, positive integer | Chunks in a nested array |
| `flattenArray(value)` | Nested array | Fully flattened array |
| `findMax(value)` | Array of finite numbers | Largest number |
| `findMin(value)` | Array of finite numbers | Smallest number |
| `shuffleArray(value)` | Array | Shuffled copy; input is not mutated |

```js
devutils.removeDuplicates([1, 1, 2]); // [1, 2]
devutils.chunkArray([1, 2, 3, 4, 5], 2); // [[1, 2], [3, 4], [5]]
devutils.flattenArray([1, [2, [3]]]); // [1, 2, 3]
devutils.findMax([3, 9, 2]); // 9
```

Empty arrays passed to `findMax` or `findMin` cause `RangeError`.

### Validation Utilities

| Function | Parameters | Result |
|---|---|---|
| `isValidEmail(value)` | Unknown | `true` for a basic valid email |
| `isValidPhone(value)` | Unknown | `true` for 7–15 digits with common formatting |
| `isStrongPassword(value, options?)` | Value and optional `{ minLength }` | `true` for mixed-strength password |
| `isEmpty(value)` | Unknown | `true` for null, whitespace, empty arrays, or empty objects |
| `isValidURL(value)` | Unknown | `true` for absolute HTTP or HTTPS URLs |

```js
devutils.isValidEmail("student@example.com"); // true
devutils.isValidPhone("+91 98765-43210"); // true
devutils.isStrongPassword("Strong1!", { minLength: 8 }); // true
devutils.isValidURL("https://example.com"); // true
```

The default password policy requires lowercase, uppercase, a digit, a special character, and at least 8 characters.

### Object Utilities

| Function | Parameters | Result |
|---|---|---|
| `deepClone(value)` | Any supported value | Independent deep copy |
| `pick(value, keys)` | Object and string key array | New object containing selected keys |
| `omit(value, keys)` | Object and string key array | New object excluding selected keys |
| `isEmptyObject(value)` | Object | Whether own enumerable keys are empty |
| `mergeObjects(...objects)` | One or more objects | New shallow merged object |

```js
const clone = devutils.deepClone({ nested: { value: 1 } });
devutils.pick({ name: "Dev", age: 20 }, ["name"]); // { name: "Dev" }
devutils.omit({ name: "Dev", age: 20 }, ["age"]); // { name: "Dev" }
```

`deepClone` supports arrays, plain objects, `Date`, `Map`, `Set`, and circular object references.

### Number Utilities

| Function | Parameters | Result |
|---|---|---|
| `clamp(value, min, max)` | Three finite numbers | Value limited to the inclusive range |
| `roundTo(value, places?)` | Number and 0–100 decimal places | Rounded number |
| `randomNumber(min?, max?)` | Inclusive integer range | Random integer |
| `isEven(value)` | Integer | Evenness |
| `isOdd(value)` | Integer | Oddness |

```js
devutils.clamp(15, 0, 10); // 10
devutils.roundTo(1.235, 2); // 1.24
devutils.randomNumber(1, 6); // Random integer from 1 to 6
```

### Date Utilities

| Function | Parameters | Result |
|---|---|---|
| `formatDate(value, format?)` | Date input and token format | Formatted date |
| `timeAgo(value, now?)` | Date input and optional reference date | Relative-time string |
| `getDaysBetween(start, end)` | Two date inputs | Absolute whole calendar-day difference |
| `isValidDate(value)` | Unknown | Whether the value represents a valid date |

Supported format tokens are `YYYY`, `MM`, `DD`, `HH`, `mm`, and `ss`.

```js
const date = new Date("2026-11-21");
devutils.formatDate(date, "DD/MM/YYYY"); // "21/11/2026"
devutils.getDaysBetween("2026-11-21", "2026-11-25"); // 4
devutils.isValidDate("2026-11-21"); // true
```

## Error Handling

```js
try {
  devutils.chunkArray([1, 2], 0);
} catch (error) {
  console.error(error.name, error.message);
}
```

- Wrong argument types → `TypeError`
- Invalid ranges or boundaries → `RangeError`
- Validation helpers usually return `false`

## Testing

```bash
npm test
npm run test:coverage
```

The test suite uses Node.js built-in test runner, so no test framework dependency is required.

## Project Structure

```text
src/       Public modules and CommonJS entry point
tests/     Node.js unit tests
examples/  Small runnable usage examples
types/     TypeScript declaration shims for editor support
```

## Publishing

Before publishing:

```bash
npm login
npm test
npm run test:coverage
npm pack --dry-run
npm publish --access public
```

Version updates:

```bash
npm version patch
npm version minor
npm version major
git push origin main --tags
```

Publishing is intentionally never performed by this package's scripts.

## Contributing

1. Fork the repository.
2. Create a focused feature or fix branch.
3. Add tests for every behavior change.
4. Run `npm test` and `npm run test:coverage`.
5. Open a pull request with a clear description.

## License

MIT. See [LICENSE](./LICENSE).
