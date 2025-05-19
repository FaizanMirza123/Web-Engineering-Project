// lib/payloadManager.js
const fs = require('fs');
const path = require('path');

function loadPayloads(file = 'payloads.txt') {
  return fs
    .readFileSync(path.resolve(__dirname, '..', file), 'utf8')
    .split('\n')
    .map(l => l.trim())
    .filter(Boolean);
}

module.exports = { loadPayloads };
