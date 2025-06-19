import React from 'react';
import { Loader2 } from 'lucide-react';

function LoadingSpinner({ size = 24, color = '#6B7280' }) {
  return (
    <div className="loading-spinner">
      <Loader2 size={size} color={color} className="animate-spin" />
    </div>
  );
}

export default LoadingSpinner;
