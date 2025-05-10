const express = require('express');
console.log('🔍 routes/scan.js loaded');            // <-- log module load
const router = express.Router();
const { scanEndpoint } = require('../lib/scanner');

router.post('/scan', async (req, res) => {
  console.log('🔍 POST /check/scan hit');           // <-- log route hit
  console.log('   Request body:', req.body);        // <-- log incoming JSON

  const { targetUrl, paramName } = req.body;
  if (!targetUrl || !paramName) {
    console.warn('⚠️ Missing params:', { targetUrl, paramName });
    return res.status(400).json({ error: 'Missing params' });
  }

  try {
    const results = await scanEndpoint(targetUrl, paramName);
    console.log('   scanEndpoint results:', results);  // <-- log scan results
    res.json(results);
  } catch (err) {
    console.error('❌ scanEndpoint error:', err);       // <-- log internal error
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
