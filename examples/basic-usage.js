"use strict";

const devutils = require("../src");

console.log(devutils.slugify("Hello DevUtils!"));
console.log(devutils.chunkArray([1, 2, 3, 4, 5], 2));
console.log(devutils.isValidEmail("student@example.com"));
console.log(devutils.capitalize("javascript"));
console.log(devutils.formatDate(new Date("2026-11-21"), "DD/MM/YYYY"));
