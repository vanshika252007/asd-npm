"use strict";

const test = require("node:test");
const assert = require("node:assert/strict");
const { deepClone, pick, omit, isEmptyObject, mergeObjects } = require("../src/objects");

test("deepClone clones nested objects and arrays without reference sharing", () => {
  const original = { a: 1, nested: { b: [2, 3] }, date: new Date("2024-01-01") };
  const clone = deepClone(original);
  assert.notEqual(clone, original);
  assert.notEqual(clone.nested, original.nested);
  assert.equal(clone.date instanceof Date, true);
  clone.nested.b.push(4);
  assert.deepEqual(original.nested.b, [2, 3]);
  assert.equal(deepClone(null), null);
  assert.equal(deepClone(42), 42);
});

test("pick and omit create new objects from selected keys", () => {
  const input = { name: "Dev", role: "student", level: 1 };
  assert.deepEqual(pick(input, ["name", "missing"]), { name: "Dev" });
  assert.deepEqual(omit(input, ["role"]), { name: "Dev", level: 1 });
  assert.throws(() => pick(input, "name"), TypeError);
  assert.throws(() => omit(input, [1]), TypeError);
});

test("isEmptyObject checks own enumerable keys", () => {
  assert.equal(isEmptyObject({}), true);
  assert.equal(isEmptyObject({ x: 1 }), false);
  assert.throws(() => isEmptyObject([]), TypeError);
  assert.throws(() => isEmptyObject(null), TypeError);
});

test("mergeObjects shallow merges in argument order", () => {
  assert.deepEqual(mergeObjects({ a: 1 }, { b: 2 }, { a: 3 }), { a: 3, b: 2 });
  assert.deepEqual(mergeObjects(), {});
  assert.throws(() => mergeObjects({ a: 1 }, null), TypeError);
});
