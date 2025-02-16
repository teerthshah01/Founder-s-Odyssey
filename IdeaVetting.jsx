import React, { useState } from 'react';
import axios from 'axios';

const IdeaVetting = () => {
  const [idea, setIdea] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    if (!idea.trim()) {
      setError('Please enter a startup idea.');
      return;
    }
    setError('');
    setLoading(true);
    try {
      // Using a relative URL; the proxy forwards to http://127.0.0.1:5000
      const response = await axios.post('/api/idea-vetting', { idea });
      // Assuming backend response structure: { result: { content: "..." } }
      setResult(response.data.result.content || 'No content returned.');
    } catch (err) {
      console.error(err);
      setError('Error fetching analysis.');
    }
    setLoading(false);
  };

  return (
    <div>
      <h2>Idea Vetting</h2>
      <textarea
        value={idea}
        onChange={(e) => setIdea(e.target.value)}
        placeholder="Enter your startup idea..."
        rows={6}
        style={{ width: '100%', marginBottom: '10px' }}
      />
      <br />
      <button onClick={handleSubmit} disabled={loading}>
        {loading ? 'Processing...' : 'Submit Idea'}
      </button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {result && (
        <div>
          <h3>Analysis:</h3>
          <p>{result}</p>
        </div>
      )}
    </div>
  );
};

export default IdeaVetting;
