import React, { useState } from 'react';
import axios from 'axios';

function ScanForm({ onResults }) {
  const [url, setUrl] = useState('');
  const [param, setParam] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
    console.log('📤 Submitting scan to backend...');
    console.log('Payload:', { targetUrl: url, paramName: param });

    try {
      const res = await axios.post('http://localhost:5000/check/scan', {
        targetUrl: url,
        paramName: param
      });
      console.log('✅ Scan results:', res.data);
      onResults(res.data);
    } catch (err) {
      console.error('❌ Scan failed:', err);
      onResults({ error: 'Scan request failed. Backend might be down or misconfigured.' });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={url}
        onChange={e => setUrl(e.target.value)}
        placeholder="Target URL"
      />
      <input
        type="text"
        value={param}
        onChange={e => setParam(e.target.value)}
        placeholder="Parameter name"
      />
      <button type="submit">Scan</button>
    </form>
  );
}

export default ScanForm;
