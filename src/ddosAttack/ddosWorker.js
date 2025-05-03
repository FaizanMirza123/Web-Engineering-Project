
import axios from 'axios';
import { parentPort, workerData } from 'worker_threads';

const { targetUrl, requestsToSend } = workerData;

const attack = async () => {
  for (let i = 0; i < requestsToSend; i++) {
    axios.get(targetUrl)
      .then(() => parentPort.postMessage(`✓ Success`))
      .catch((err) => parentPort.postMessage(`✗ Failed: ${err.message}`));
  }
};

attack();
