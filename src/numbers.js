"use strict";

function assertFiniteNumber(value, name) {
  if (typeof value !== "number" || !Number.isFinite(value)) throw new TypeError(`${name} expects a finite number`);
}

/** Limits a number to an inclusive range. */
function clamp(value, min, max) {
  assertFiniteNumber(value, "value");
  assertFiniteNumber(min, "min");
  assertFiniteNumber(max, "max");
  if (min > max) throw new RangeError("min cannot be greater than max");
  return Math.min(Math.max(value, min), max);
}

/** Rounds a number to the requested decimal places. */
function roundTo(value, places = 0) {
  assertFiniteNumber(value, "value");
  if (!Number.isInteger(places) || places < 0 || places > 100) {
    throw new RangeError("places must be an integer between 0 and 100");
  }
  const factor = 10 ** places;
  return Math.round((value + Number.EPSILON) * factor) / factor;
}

/** Returns an integer in the inclusive range. */
function randomNumber(min = 0, max = 1) {
  assertFiniteNumber(min, "min");
  assertFiniteNumber(max, "max");
  if (!Number.isInteger(min) || !Number.isInteger(max) || min > max) {
    throw new RangeError("min and max must be integers with min less than or equal to max");
  }
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/** Checks whether an integer is even. */
function isEven(value) {
  assertFiniteNumber(value, "value");
  if (!Number.isInteger(value)) throw new RangeError("value must be an integer");
  return value % 2 === 0;
}

/** Checks whether an integer is odd. */
function isOdd(value) {
  assertFiniteNumber(value, "value");
  if (!Number.isInteger(value)) throw new RangeError("value must be an integer");
  return value % 2 !== 0;
}

module.exports = { clamp, roundTo, randomNumber, isEven, isOdd };
