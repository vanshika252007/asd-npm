"use strict";

function toValidDate(value) {
  if (typeof value !== "string" && typeof value !== "number" && !(value instanceof Date)) return null;
  if (typeof value === "string" && value.trim() === "") return null;
  if (typeof value === "string" && /^\d{4}-\d{2}-\d{2}$/.test(value)) {
    const [year, month, day] = value.split("-").map(Number);
    const date = new Date(Date.UTC(year, month - 1, day));
    if (date.getUTCFullYear() !== year || date.getUTCMonth() !== month - 1 || date.getUTCDate() !== day) return null;
  }
  const date = value instanceof Date ? new Date(value.getTime()) : new Date(value);
  return Number.isFinite(date.getTime()) ? date : null;
}

/**
 * Formats a date using a small, predictable token set.
 * Tokens: YYYY, MM, DD, HH, mm, ss.
 */
function formatDate(value, format = "YYYY-MM-DD") {
  const date = toValidDate(value);
  if (!date) throw new TypeError("value must be a valid date");
  if (typeof format !== "string") throw new TypeError("format expects a string");
  const pad = (number) => String(number).padStart(2, "0");
  return format
    .replace(/YYYY/g, String(date.getFullYear()))
    .replace(/MM/g, pad(date.getMonth() + 1))
    .replace(/DD/g, pad(date.getDate()))
    .replace(/HH/g, pad(date.getHours()))
    .replace(/mm/g, pad(date.getMinutes()))
    .replace(/ss/g, pad(date.getSeconds()));
}

/** Returns a human-readable relative time string. */
function timeAgo(value, now = new Date()) {
  const date = toValidDate(value);
  const nowDate = toValidDate(now);
  if (!date) throw new TypeError("value must be a valid date");
  if (!nowDate) throw new TypeError("now must be a valid date");
  const seconds = Math.round((nowDate.getTime() - date.getTime()) / 1000);
  if (seconds === 0) return "just now";
  const prefix = seconds > 0 ? "" : "from ";
  const absolute = Math.abs(seconds);
  if (absolute < 60) return seconds > 0 ? `${absolute} second${absolute === 1 ? "" : "s"} ago` : `from now`;
  const minutes = Math.floor(absolute / 60);
  if (minutes < 60) return seconds > 0 ? `${minutes} minute${minutes === 1 ? "" : "s"} ago` : `in ${minutes} minute${minutes === 1 ? "" : "s"}`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return seconds > 0 ? `${hours} hour${hours === 1 ? "" : "s"} ago` : `in ${hours} hour${hours === 1 ? "" : "s"}`;
  const days = Math.floor(hours / 24);
  if (days < 30) return seconds > 0 ? `${days} day${days === 1 ? "" : "s"} ago` : `in ${days} day${days === 1 ? "" : "s"}`;
  const months = Math.floor(days / 30);
  if (months < 12) return seconds > 0 ? `${months} month${months === 1 ? "" : "s"} ago` : `in ${months} month${months === 1 ? "" : "s"}`;
  const years = Math.floor(months / 12);
  return seconds > 0 ? `${years} year${years === 1 ? "" : "s"} ago` : `in ${years} year${years === 1 ? "" : "s"}`;
}

/** Returns the absolute number of whole calendar UTC days between two dates. */
function getDaysBetween(start, end) {
  const startDate = toValidDate(start);
  const endDate = toValidDate(end);
  if (!startDate) throw new TypeError("start must be a valid date");
  if (!endDate) throw new TypeError("end must be a valid date");
  const startUTC = Date.UTC(startDate.getFullYear(), startDate.getMonth(), startDate.getDate());
  const endUTC = Date.UTC(endDate.getFullYear(), endDate.getMonth(), endDate.getDate());
  return Math.abs(Math.round((endUTC - startUTC) / 86400000));
}

/** Checks whether a value represents a valid date. */
function isValidDate(value) {
  return toValidDate(value) !== null;
}

module.exports = { formatDate, timeAgo, getDaysBetween, isValidDate };
