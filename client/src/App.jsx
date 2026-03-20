import React, { useState } from 'react';
import axios from 'axios';
import ResultCard from './components/ResultCard';

const API_URL = 'http://localhost:5000/api/summarize';

const App = () => {
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const handleSummarize = async (e) => {
    e.preventDefault();
    
    // Minimum validation
    if (!text.trim()) {
      setError('Please enter some text to summarize.');
      setResult(null);
      return;
    }

    setLoading(true);
    setError('');
    setResult(null);

    try {
      const response = await axios.post(API_URL, { text });
      setResult(response.data);
    } catch (err) {
      console.error('API Error:', err);
      setError(
        err.response?.data?.error || 
        'Something went wrong. Please check if the server is running.'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setText('');
    setResult(null);
    setError('');
  }

  return (
    <div className="app-container">
      <h1>AI Text Summarizer</h1>
      
      <div className="card">
        <form onSubmit={handleSummarize}>
          <textarea
            placeholder="Paste your unstructured text here (e.g., an article, meeting notes, or raw thoughts)..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          
          <div style={{ display: 'flex', gap: '10px' }}>
            <button type="submit" disabled={loading || !text.trim()}>
              {loading ? 'Analyzing...' : 'Summarize Text'}
            </button>
            
            <button 
              type="button" 
              onClick={handleClear} 
              style={{ background: '#6b7280', width: 'auto', padding: '0 1rem' }}
              disabled={loading || !text}
            >
              Clear
            </button>
          </div>
        </form>
      </div>

      {error && (
        <div className="error-msg">
          <strong>Error: </strong> {error}
        </div>
      )}

      {loading && (
        <div className="loading">
          <p>Processing your text with AI...</p>
        </div>
      )}

      {result && <ResultCard result={result} />}

      <footer style={{ marginTop: '2rem', textAlign: 'center', color: '#6b7280', fontSize: '0.8rem' }}>
        <p>Built as a Shortlisting Task for AI Developer Intern Role — 2026</p>
      </footer>
    </div>
  );
}

export default App;
