"use strict";

/**
 * Capitalizes the first character of a string.
 * @param {string} value
 * @returns {string}
 */
function capitalize(value) {
  if (typeof value !== "string") throw new TypeError("capitalize expects a string");
  if (!value) return "";
  return value.charAt(0).toUpperCase() + value.slice(1);
}

/**
 * Reverses a string by Unicode code point.
 * @param {string} value
 * @returns {string}
 */
function reverseString(value) {
  if (typeof value !== "string") throw new TypeError("reverseString expects a string");
  return Array.from(value).reverse().join("");
}

/**
 * Converts text to a lowercase, URL-friendly slug.
 * @param {string} value
 * @returns {string}
 */
function slugify(value) {
  if (typeof value !== "string") throw new TypeError("slugify expects a string");
  return value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/**
 * Truncates text to a maximum length and appends an ellipsis.
 * @param {string} value
 * @param {number} length
 * @param {string} [suffix="..."]
 * @returns {string}
 */
function truncate(value, length, suffix = "...") {
  if (typeof value !== "string") throw new TypeError("truncate expects a string");
  if (!Number.isInteger(length) || length < 0) throw new RangeError("length must be a non-negative integer");
  if (typeof suffix !== "string") throw new TypeError("suffix expects a string");
  if (value.length <= length) return value;
  if (suffix.length >= length) return suffix.slice(0, length);
  return value.slice(0, length - suffix.length) + suffix;
}

/**
 * Counts whitespace-separated words.
 * @param {string} value
 * @returns {number}
 */
function countWords(value) {
  if (typeof value !== "string") throw new TypeError("countWords expects a string");
  const words = value.trim().match(/\S+/g);
  return words ? words.length : 0;
}

/**
 * Checks whether text reads the same forward and backward.
 * @param {string} value
 * @returns {boolean}
 */
function isPalindrome(value) {
  if (typeof value !== "string") throw new TypeError("isPalindrome expects a string");
  const normalized = value.toLowerCase().replace(/[^a-z0-9]/g, "");
  return normalized === Array.from(normalized).reverse().join("");
}

module.exports = { capitalize, reverseString, slugify, truncate, countWords, isPalindrome };
