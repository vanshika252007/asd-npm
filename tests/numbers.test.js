"use strict";

const test = require("node:test");
const assert = require("node:assert/strict");
const { clamp, roundTo, randomNumber, isEven, isOdd } = require("../src/numbers");

test("clamp limits values to inclusive boundaries", () => {
  assert.equal(clamp(-5, 0, 10), 0);
  assert.equal(clamp(5, 0, 10), 5);
  assert.equal(clamp(15, 0, 10), 10);
  assert.throws(() => clamp(1, 10, 0), RangeError);
  assert.throws(() => clamp("1", 0, 10), TypeError);
});

test("roundTo rounds to decimal places", () => {
  assert.equal(roundTo(1.234, 2), 1.23);
  assert.equal(roundTo(1.235, 2), 1.24);
  assert.equal(roundTo(42), 42);
  assert.throws(() => roundTo(Infinity), TypeError);
  assert.throws(() => roundTo(1.2, -1), RangeError);
});

test("randomNumber stays inside an inclusive integer range", () => {
  for (let i = 0; i < 100; i++) {
    const value = randomNumber(3, 5);
    assert.equal(Number.isInteger(value), true);
    assert.equal(value >= 3 && value <= 5, true);
  }
  assert.equal(randomNumber(7, 7), 7);
  assert.throws(() => randomNumber(1.2, 3), RangeError);
});

test("isEven and isOdd validate integers", () => {
  assert.equal(isEven(-4), true);
  assert.equal(isEven(3), false);
  assert.equal(isOdd(-3), true);
  assert.equal(isOdd(4), false);
  assert.throws(() => isEven(1.5), RangeError);
  assert.throws(() => isOdd("3"), TypeError);
});
