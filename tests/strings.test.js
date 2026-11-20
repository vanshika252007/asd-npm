"use strict";

const test = require("node:test");
const assert = require("node:assert/strict");
const { capitalize, reverseString, slugify, truncate, countWords, isPalindrome } = require("../src/strings");

test("capitalize handles normal, empty, and invalid input", () => {
  assert.equal(capitalize("hello"), "Hello");
  assert.equal(capitalize(""), "");
  assert.throws(() => capitalize(null), TypeError);
});

test("reverseString preserves Unicode code points", () => {
  assert.equal(reverseString("hello"), "olleh");
  assert.equal(reverseString("A😀B"), "B😀A");
  assert.equal(reverseString(""), "");
  assert.throws(() => reverseString(undefined), TypeError);
});

test("slugify normalizes text and separators", () => {
  assert.equal(slugify("  Hello, World!  "), "hello-world");
  assert.equal(slugify("Crème brûlée"), "creme-brulee");
  assert.equal(slugify("---"), "");
  assert.throws(() => slugify(42), TypeError);
});

test("truncate handles boundaries and suffix length", () => {
  assert.equal(truncate("Hello world", 8), "Hello...");
  assert.equal(truncate("Hi", 8), "Hi");
  assert.equal(truncate("Hello", 2), "..");
  assert.throws(() => truncate("Hi", -1), RangeError);
  assert.throws(() => truncate("Hi", 2, null), TypeError);
});

test("countWords handles whitespace and invalid input", () => {
  assert.equal(countWords("one two   three"), 3);
  assert.equal(countWords(" \n "), 0);
  assert.throws(() => countWords([]), TypeError);
});

test("isPalindrome ignores punctuation and case", () => {
  assert.equal(isPalindrome("A man, a plan, a canal: Panama"), true);
  assert.equal(isPalindrome("hello"), false);
  assert.equal(isPalindrome(""), true);
  assert.throws(() => isPalindrome(null), TypeError);
});
