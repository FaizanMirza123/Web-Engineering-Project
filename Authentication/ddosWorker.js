const { parentPort, workerData } =require('worker_threads');
const http=require("http");
const https=require("https");
const {URL}=require('url');
// import http from 'http';
// import https from 'https';
// import { URL } from 'url';

const { targetUrl, requestsToSend } = workerData;
const parsedUrl = new URL(targetUrl);

const client = parsedUrl.protocol === 'https:' ? https : http;

let sent = 0;

function getCurrentTime() {
    const now = new Date();
    return now.toLocaleTimeString('en-US', { hour12: false }); // e.g. 13:45:23
  }

const sendRequest = () => {
  const req = client.request(
    {
      hostname: parsedUrl.hostname,
      port: parsedUrl.port || (parsedUrl.protocol === 'https:' ? 443 : 80),
      path: parsedUrl.pathname,
      method: 'GET',
      timeout: 3000,
    },
    (res) => {
      parentPort.postMessage(`[${getCurrentTime()}] Response Code: ${res.statusCode}`);
    }
  );

  req.on('error', (err) => {
    if (err.code === 'ECONNREFUSED') {
      parentPort.postMessage(`[${getCurrentTime()}] Connection Refused`);
    } else if (err.code === 'ETIMEDOUT') {
      parentPort.postMessage(` [${getCurrentTime()}] Timeout Error`);
    } else if (err.code === 'ENOTFOUND') {
      parentPort.postMessage(` [${getCurrentTime()}] DNS Resolution Failed`);
    } else {
      parentPort.postMessage(` [${getCurrentTime()}] Error: ${err.code || err.message}`);
    }
  });

  req.on('timeout', () => {
    req.abort();
    parentPort.postMessage(` [${getCurrentTime()}] Request Timeout`);
  });

  req.end();
};

const run = () => {
  const interval = setInterval(() => {
    if (sent >= requestsToSend) {
      clearInterval(interval);
      process.exit(0);
    }

    sendRequest();
    sent++;
  }, 10); // fire a request every 10ms per worker (adjust as needed)
};

run();
