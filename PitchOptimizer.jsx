import React, { useState } from 'react';
import axios from 'axios';

const PitchOptimizer = () => {
  const [pitch, setPitch] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleOptimize = async () => {
    if (!pitch.trim()) {
      setError('Please enter a pitch.');
      return;
    }
    setError('');
    setLoading(true);
    try {
      // Relative URL, forwarded by proxy
      const response = await axios.post('/api/pitch-optimize', { pitch });
      setResult(response.data.result.content || 'No content returned.');
    } catch (err) {
      console.error(err);
      setError('Error optimizing pitch.');
    }
    setLoading(false);
  };

  return (
    <div>
      <h2>Pitch Optimizer</h2>
      <textarea
        value={pitch}
        onChange={(e) => setPitch(e.target.value)}
        placeholder="Enter your pitch..."
        rows={6}
        style={{ width: '100%', marginBottom: '10px' }}
      />
      <br />
      <button onClick={handleOptimize} disabled={loading}>
        {loading ? 'Optimizing...' : 'Optimize Pitch'}
      </button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {result && (
        <div>
          <h3>Optimized Pitch:</h3>
          <p>{result}</p>
        </div>
      )}
    </div>
  );
};

export default PitchOptimizer;
