"use strict";

const test = require("node:test");
const assert = require("node:assert/strict");
const { formatDate, timeAgo, getDaysBetween, isValidDate } = require("../src/dates");

test("formatDate supports documented tokens", () => {
  const date = new Date(2024, 1, 3, 9, 5, 7);
  assert.equal(formatDate(date, "YYYY-MM-DD"), "2024-02-03");
  assert.equal(formatDate(date, "DD/MM/YYYY HH:mm:ss"), "03/02/2024 09:05:07");
  assert.throws(() => formatDate("bad"), TypeError);
  assert.throws(() => formatDate(new Date(), null), TypeError);
});

test("timeAgo reports past and future relative times", () => {
  const now = new Date("2024-01-10T12:00:00Z");
  assert.equal(timeAgo(new Date("2024-01-10T12:00:00Z"), now), "just now");
  assert.equal(timeAgo(new Date("2024-01-10T11:59:30Z"), now), "30 seconds ago");
  assert.equal(timeAgo(new Date("2024-01-10T12:01:00Z"), now), "in 1 minute");
  assert.equal(timeAgo(new Date("2024-01-09T12:00:00Z"), now), "1 day ago");
});

test("getDaysBetween returns absolute calendar-day difference", () => {
  assert.equal(getDaysBetween("2024-01-01", "2024-01-11"), 10);
  assert.equal(getDaysBetween("2024-01-11", "2024-01-01"), 10);
  assert.equal(getDaysBetween("2024-01-01", "2024-01-01"), 0);
  assert.throws(() => getDaysBetween("bad", "2024-01-01"), TypeError);
});

test("isValidDate handles dates, invalid dates, and invalid input types", () => {
  assert.equal(isValidDate("2024-01-01"), true);
  assert.equal(isValidDate(new Date("2024-01-01")), true);
  assert.equal(isValidDate("not-a-date"), false);
  assert.equal(isValidDate("2024-02-30"), false);
  assert.equal(isValidDate(""), false);
  assert.equal(isValidDate(null), false);
});
