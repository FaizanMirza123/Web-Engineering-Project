const express=require("express");
const mongoose=require("mongoose");
const cors=require("cors");

const bodyParser = require('body-parser');
const scanRouter = require('./routes/routes')
const WebSocket =require('ws')
const http =require('http')
const { performDDoSAttack } = require('./ddosAttack.js');

require("dotenv").config()

const authRoutes=require('./routes/routes');

const app=express();
app.use(cors());
app.use(express.json());
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });
app.use(bodyParser.json());

mongoose.connect(process.env.MONGO_URI).then(()=>console.log("Successfully Connected")).catch((err)=>console.log(err))
app.use('/api/auth',authRoutes)




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
const broadcastLog = (log) => {
  if(connectedClients.length===0)
    {
      console.log("No clients connected");
      return;
    }
   

  connectedClients.forEach(ws => {
    if (ws.readyState === ws.OPEN) {
      console.log(`[WebSocket] Sending log: ${log}`);
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

  performDDoSAttack(targetUrl, requestsPerSecond, durationSeconds,broadcastLog);

  res.json({ message: `Started attack on ${targetUrl}` });
});


app.get('/api/auth/status', (req, res) => {
    res.status(200).json({ message: "Server is running" });
  });

// app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`));
server.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`));


module.exports={broadcastLog};