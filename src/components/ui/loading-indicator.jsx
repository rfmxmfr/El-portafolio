import React from 'react';
import { Loader2 } from 'lucide-react';

/**
 * LoadingIndicator component for displaying loading states
 * 
 * @param {Object} props
 * @param {boolean} props.loading - Whether the component is in loading state
 * @param {string} props.size - Size of the loading indicator (sm, md, lg)
 * @param {string} props.text - Optional text to display next to the spinner
 * @param {string} props.className - Additional CSS classes
 */
export function LoadingIndicator({ 
  loading = true, 
  size = 'md', 
  text, 
  className = '',
  ...props 
}) {
  if (!loading) return null;
  
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8'
  };
  
  return (
    <div 
      className={`inline-flex items-center gap-2 text-neutral-600 ${className}`}
      {...props}
    >
      <Loader2 className={`animate-spin ${sizeClasses[size] || sizeClasses.md}`} />
      {text && <span className="text-sm font-medium">{text}</span>}
    </div>
  );
}

/**
 * LoadingOverlay component for blocking UI during loading operations
 * 
 * @param {Object} props
 * @param {boolean} props.loading - Whether the overlay should be shown
 * @param {string} props.text - Text to display in the overlay
 * @param {boolean} props.fullScreen - Whether the overlay should cover the entire screen
 */
export function LoadingOverlay({ 
  loading = true, 
  text = 'Loading...', 
  fullScreen = false 
}) {
  if (!loading) return null;
  
  const containerClasses = fullScreen
    ? 'fixed inset-0 z-50 bg-black/50 backdrop-blur-sm'
    : 'absolute inset-0 z-10 bg-white/80';
    
  return (
    <div className={containerClasses}>
      <div className="flex h-full w-full items-center justify-center">
        <div className="flex flex-col items-center gap-2 rounded-lg bg-white p-4 shadow-lg">
          <Loader2 className="h-8 w-8 animate-spin text-neutral-600" />
          <p className="text-sm font-medium text-neutral-800">{text}</p>
        </div>
      </div>
    </div>
  );
}

/**
 * ButtonLoader component for showing loading state in buttons
 */
export function ButtonLoader() {
  return <Loader2 className="mr-2 h-4 w-4 animate-spin" />;
}

export default LoadingIndicator;