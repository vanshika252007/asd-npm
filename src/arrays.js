"use strict";

function assertArray(value, name = "value") {
  if (!Array.isArray(value)) throw new TypeError(`${name} expects an array`);
}

/** Removes duplicate values using SameValueZero equality. */
function removeDuplicates(value) {
  assertArray(value);
  return [...new Set(value)];
}

/** Splits an array into chunks of the requested size. */
function chunkArray(value, size) {
  assertArray(value);
  if (!Number.isInteger(size) || size <= 0) throw new RangeError("size must be a positive integer");
  const chunks = [];
  for (let i = 0; i < value.length; i += size) chunks.push(value.slice(i, i + size));
  return chunks;
}

/** Recursively flattens nested arrays. */
function flattenArray(value) {
  assertArray(value);
  return value.flat(Infinity);
}

/** Finds the maximum numeric value. */
function findMax(value) {
  assertArray(value);
  if (!value.every((item) => typeof item === "number" && Number.isFinite(item))) {
    throw new TypeError("findMax expects an array of finite numbers");
  }
  if (value.length === 0) throw new RangeError("findMax cannot operate on an empty array");
  return Math.max(...value);
}

/** Finds the minimum numeric value. */
function findMin(value) {
  assertArray(value);
  if (!value.every((item) => typeof item === "number" && Number.isFinite(item))) {
    throw new TypeError("findMin expects an array of finite numbers");
  }
  if (value.length === 0) throw new RangeError("findMin cannot operate on an empty array");
  return Math.min(...value);
}

/** Returns a shuffled copy using the Fisher-Yates algorithm. */
function shuffleArray(value) {
  assertArray(value);
  const copy = [...value];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

module.exports = { removeDuplicates, chunkArray, flattenArray, findMax, findMin, shuffleArray };
