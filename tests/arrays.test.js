"use strict";

const test = require("node:test");
const assert = require("node:assert/strict");
const { removeDuplicates, chunkArray, flattenArray, findMax, findMin, shuffleArray } = require("../src/arrays");

test("removeDuplicates preserves first occurrence", () => {
  assert.deepEqual(removeDuplicates([1, 2, 2, 3]), [1, 2, 3]);
  assert.deepEqual(removeDuplicates([]), []);
  assert.throws(() => removeDuplicates("1,2"), TypeError);
});

test("chunkArray splits evenly and leaves a final remainder", () => {
  assert.deepEqual(chunkArray([1, 2, 3, 4, 5], 2), [[1, 2], [3, 4], [5]]);
  assert.deepEqual(chunkArray([], 2), []);
  assert.throws(() => chunkArray([1], 0), RangeError);
  assert.throws(() => chunkArray([1], 1.5), RangeError);
});

test("flattenArray recursively flattens nested arrays", () => {
  assert.deepEqual(flattenArray([1, [2, [3, 4]]]), [1, 2, 3, 4]);
  assert.deepEqual(flattenArray([]), []);
  assert.throws(() => flattenArray(null), TypeError);
});

test("findMax and findMin validate and find numeric boundaries", () => {
  assert.equal(findMax([-3, 0, 8]), 8);
  assert.equal(findMin([-3, 0, 8]), -3);
  assert.throws(() => findMax([]), RangeError);
  assert.throws(() => findMin([1, "2"]), TypeError);
});

test("shuffleArray returns a permutation without mutating input", () => {
  const input = [1, 2, 3, 4];
  const result = shuffleArray(input);
  assert.deepEqual([...result].sort(), [1, 2, 3, 4]);
  assert.deepEqual(input, [1, 2, 3, 4]);
  assert.deepEqual(shuffleArray([]), []);
  assert.throws(() => shuffleArray(null), TypeError);
});
