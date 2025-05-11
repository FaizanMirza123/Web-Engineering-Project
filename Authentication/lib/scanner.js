// lib/scanner.js
const axios = require('axios');
const cheerio = require('cheerio');
const pLimit = require('p-limit');
const { loadPayloads } = require('./payloadManager');

axios.interceptors.request.use(config => {
  config.metadata = { startTime: new Date() };
  return config;
});
axios.interceptors.response.use(response => {
  response.duration = new Date() - response.config.metadata.startTime;
  return response;
});
// Measuring time with Axios interceptors :contentReference[oaicite:5]{index=5}

const ERROR_REGEX = /(?:MySQL|PostgreSQL|Microsoft SQL Server)\s[\d\.]+|table\s['"]?([a-zA-Z0-9_]+)['"]?/gi; // extract versions & tables

async function sendAndAnalyze(url, param, payload) {
  const fullUrl = `${url}?${param}=${encodeURIComponent(payload)}`;
  try {
    const res = await axios.get(fullUrl, { timeout: 15000 });
    const data = res.data;
    let leaked = null;

    // ERROR‑BASED: parse SQL error text
    if (/SQL syntax|error in your SQL syntax|ORA-\d{5}/i.test(data)) {
      const matches = [...data.matchAll(ERROR_REGEX)].map(m => m[0]);
      leaked = {
        error_message: data.split('\n')[0],
        meta: matches
      };
    }
    // UNION‑BASED: parse HTML tables
    else if (/UNION\s+SELECT/i.test(payload) && /<table/i.test(data)) {
      const $ = cheerio.load(data);
      leaked = [];
      $('table tr').each((i, row) => {
        const cols = $(row).find('td').toArray().map(td => $(td).text().trim());
        if (cols.length) leaked.push(cols);
      });
    }
    // TIME‑BASED: blind check
    else if (/SLEEP\(/i.test(payload) && res.duration > 5000) {
      leaked = { note: 'Conditional sleep succeeded; blind exfiltration possible' };
    }

    return {
      payload,
      duration_ms: res.duration,
      leaked_data: leaked
    };
  } catch (err) {
    return { payload, duration_ms: err.duration || 0, leaked_data: null };
  }
}

async function scanEndpoint(url, param) {
  const payloads = loadPayloads();
  const limit = pLimit(10);
  const tasks = payloads.map(p => limit(() => sendAndAnalyze(url, param, p)));
  return Promise.all(tasks);
}

module.exports = { scanEndpoint };
