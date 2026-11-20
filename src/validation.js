"use strict";

/** Checks whether a value is a valid email address. */
function isValidEmail(value) {
  if (typeof value !== "string") return false;
  if (value.length > 254) return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value);
}

/** Checks for an optional plus, digits, spaces, dashes, and parentheses. */
function isValidPhone(value) {
  if (typeof value !== "string") return false;
  if (!/^\+?[0-9()\s-]+$/.test(value)) return false;
  const digits = value.replace(/\D/g, "");
  return digits.length >= 7 && digits.length <= 15;
}

/**
 * Checks password strength.
 * Defaults to at least 8 characters, lowercase, uppercase, digit, and special character.
 */
function isStrongPassword(value, options = {}) {
  if (typeof value !== "string") return false;
  if (typeof options !== "object" || options === null || Array.isArray(options)) {
    throw new TypeError("options must be an object");
  }
  const minLength = options.minLength ?? 8;
  if (!Number.isInteger(minLength) || minLength < 1) throw new RangeError("minLength must be a positive integer");
  if (value.length < minLength) return false;
  return /[a-z]/.test(value) && /[A-Z]/.test(value) && /\d/.test(value) && /[^A-Za-z0-9]/.test(value);
}

/** Checks for null, undefined, or empty string/array/objects. */
function isEmpty(value) {
  if (value == null) return true;
  if (typeof value === "string") return value.trim().length === 0;
  if (Array.isArray(value)) return value.length === 0;
  if (typeof value === "object") return Object.keys(value).length === 0;
  return false;
}

/** Checks whether a value is an absolute HTTP or HTTPS URL. */
function isValidURL(value) {
  if (typeof value !== "string") return false;
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

module.exports = { isValidEmail, isValidPhone, isStrongPassword, isEmpty, isValidURL };
