import React from 'react';
import { Loader2 } from 'lucide-react';

const LoadingSpinner = ({ size = 24, color = 'currentColor' }) => {
  return (
    <div className="loading-spinner">
      <Loader2 size={size} color={color} className="animate-spin" />
    </div>
  );
};

export default LoadingSpinner;
