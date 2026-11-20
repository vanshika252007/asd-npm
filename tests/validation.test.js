"use strict";

const test = require("node:test");
const assert = require("node:assert/strict");
const { isValidEmail, isValidPhone, isStrongPassword, isEmpty, isValidURL } = require("../src/validation");

test("isValidEmail accepts valid addresses and rejects malformed values", () => {
  assert.equal(isValidEmail("student@example.com"), true);
  assert.equal(isValidEmail("bad-address"), false);
  assert.equal(isValidEmail("a@b.c"), false);
  assert.equal(isValidEmail(null), false);
});

test("isValidPhone validates digit length and allowed characters", () => {
  assert.equal(isValidPhone("+91 98765-43210"), true);
  assert.equal(isValidPhone("(123) 456-7890"), true);
  assert.equal(isValidPhone("123"), false);
  assert.equal(isValidPhone("call-me"), false);
});

test("isStrongPassword enforces strength rules and options", () => {
  assert.equal(isStrongPassword("Strong1!"), true);
  assert.equal(isStrongPassword("weak"), false);
  assert.equal(isStrongPassword("ABCdef12!", { minLength: 12 }), false);
  assert.equal(isStrongPassword("Aa1!", { minLength: 4 }), true);
  assert.throws(() => isStrongPassword("Aa1!", { minLength: 0 }), RangeError);
  assert.throws(() => isStrongPassword("Aa1!", null), TypeError);
});

test("isEmpty detects null, whitespace, arrays, objects, and other values", () => {
  assert.equal(isEmpty(null), true);
  assert.equal(isEmpty(undefined), true);
  assert.equal(isEmpty("  "), true);
  assert.equal(isEmpty([]), true);
  assert.equal(isEmpty({}), true);
  assert.equal(isEmpty("text"), false);
  assert.equal(isEmpty(0), false);
});

test("isValidURL accepts only HTTP and HTTPS absolute URLs", () => {
  assert.equal(isValidURL("https://example.com/docs"), true);
  assert.equal(isValidURL("http://localhost:3000"), true);
  assert.equal(isValidURL("ftp://example.com"), false);
  assert.equal(isValidURL("example.com"), false);
  assert.equal(isValidURL(null), false);
});
