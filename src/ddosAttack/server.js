import { WebSocketServer } from 'ws';
import http from 'http';
import express from 'express';
import cors from 'cors';
import { performDDoSAttack } from './ddosAttack.js';

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

const server = http.createServer(app);
const wss = new WebSocketServer({ server });

let connectedClients = [];

wss.on('connection', ws => {
  console.log('[WebSocket] New client connected');
  connectedClients.push(ws);

  ws.on('close', () => {
    connectedClients = connectedClients.filter(client => client !== ws);
    console.log('[WebSocket] Client disconnected');
  });
});

// Broadcast function to send logs to all connected clients
export const broadcastLog = (log) => {
  connectedClients.forEach(ws => {
    if (ws.readyState === ws.OPEN) {
      ws.send(log);
    }
  });
};

app.post('/start-attack', async (req, res) => {
  const { targetUrl, requestsPerSecond, durationSeconds } = req.body;

  if (!targetUrl || !requestsPerSecond || !durationSeconds) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  console.log(`[API] Attack Requested on ${targetUrl}`);
  broadcastLog(`[API] Attack Requested on ${targetUrl}`);

  performDDoSAttack(targetUrl, requestsPerSecond, durationSeconds);

  res.json({ message: `Started attack on ${targetUrl}` });
});

app.get('/', (req, res) => {
  res.send('ThreatProbe Backend Running!');
});

server.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});
