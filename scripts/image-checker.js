#!/usr/bin/env node

const fs = require("fs");

let raw = fs.readFileSync("src/data/cards.json");
let cards = JSON.parse(raw);

console.log('================= Compact ==================');
cards.forEach((card, i) => {
  try {
    fs.readFileSync(`public/images/compact/${card.title}.jpg`);
  } catch (e) {
    console.log(card.name);
  }
});

console.log('================= Medium ==================');
cards.forEach((card, i) => {
  try {
    fs.readFileSync(`public/images/medium/${card.title}.jpg`);
  } catch (e) {
    console.log(card.name);
  }
});