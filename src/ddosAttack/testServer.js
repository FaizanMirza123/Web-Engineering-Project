import express from 'express';

const app = express();
const PORT = 6191;

app.get('/', (req, res) => {
  console.log(`🔁 Request received at ${new Date().toISOString()}`);
  res.send('Test server received your request!');
});

app.listen(PORT, () => {
  console.log(`✅ Test server running at http://localhost:${PORT}`);
});
