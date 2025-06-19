import React, { useState } from 'react';

function ErrorBoundary({ children }) {
  const [error, setError] = useState(null);

  if (error) {
    return (
      <div className="error-boundary">
        <h2>Something went wrong</h2>
        <p>{error.message || 'An unexpected error occurred'}</p>
        <button onClick={() => window.location.reload()}>Try again</button>
      </div>
    );
  }

  return children;
}

export default ErrorBoundary;
