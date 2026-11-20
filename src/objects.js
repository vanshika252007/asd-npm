"use strict";

function assertObject(value, name = "value") {
  if (typeof value !== "object" || value === null || Array.isArray(value)) {
    throw new TypeError(`${name} expects a non-null object`);
  }
}

/** Creates a deep clone of arrays and plain objects. */
function deepClone(value, seen = new WeakMap()) {
  if (typeof value === "undefined") return undefined;
  if (value === null || typeof value !== "object") return value;
  if (seen.has(value)) return seen.get(value);
  if (Array.isArray(value)) {
    const clone = [];
    seen.set(value, clone);
    for (const item of value) clone.push(deepClone(item, seen));
    return clone;
  }
  if (value instanceof Date) return new Date(value.getTime());
  if (value instanceof Map) {
    const clone = new Map();
    seen.set(value, clone);
    for (const [key, item] of value) clone.set(deepClone(key, seen), deepClone(item, seen));
    return clone;
  }
  if (value instanceof Set) {
    const clone = new Set();
    seen.set(value, clone);
    for (const item of value) clone.add(deepClone(item, seen));
    return clone;
  }
  const clone = {};
  seen.set(value, clone);
  for (const [key, item] of Object.entries(value)) clone[key] = deepClone(item, seen);
  return clone;
}

/** Creates an object containing only selected keys. */
function pick(value, keys) {
  assertObject(value);
  if (!Array.isArray(keys) || !keys.every((key) => typeof key === "string")) {
    throw new TypeError("keys expects an array of strings");
  }
  const result = {};
  for (const key of keys) if (Object.prototype.hasOwnProperty.call(value, key)) result[key] = value[key];
  return result;
}

/** Creates an object without the excluded keys. */
function omit(value, keys) {
  assertObject(value);
  if (!Array.isArray(keys) || !keys.every((key) => typeof key === "string")) {
    throw new TypeError("keys expects an array of strings");
  }
  const excluded = new Set(keys);
  const result = {};
  for (const [key, item] of Object.entries(value)) if (!excluded.has(key)) result[key] = item;
  return result;
}

/** Checks whether an object has no enumerable own properties. */
function isEmptyObject(value) {
  assertObject(value);
  return Object.keys(value).length === 0;
}

/** Performs a shallow merge of objects with later objects taking precedence. */
function mergeObjects(...objects) {
  if (objects.length === 0) return {};
  for (const value of objects) assertObject(value);
  return Object.assign({}, ...objects);
}

module.exports = { deepClone, pick, omit, isEmptyObject, mergeObjects };
