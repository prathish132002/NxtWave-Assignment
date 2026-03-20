import React from 'react';

const ResultCard = ({ result }) => {
  if (!result) return null;

  return (
    <div className="card result-section">
      <h3 style={{ marginTop: 0 }}>Summary</h3>
      <p>{result.summary}</p>

      <h3 style={{ marginTop: '1.5rem' }}>Key Points</h3>
      <ul className="key-points">
        {result.keyPoints.map((point, index) => (
          <li key={index}>{point}</li>
        ))}
      </ul>

      <h3 style={{ marginTop: '1.5rem' }}>Sentiment</h3>
      <span className={`sentiment sentiment-${result.sentiment.toLowerCase()}`}>
        {result.sentiment.charAt(0).toUpperCase() + result.sentiment.slice(1)}
      </span>
    </div>
  );
};

export default ResultCard;
