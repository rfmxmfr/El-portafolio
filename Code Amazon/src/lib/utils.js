import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// Centralized API error handler
export const handleApiError = (error, defaultMessage = 'Operation failed') => {
  const errorMessage = error.response?.data?.message || defaultMessage;
  
  // Log error details to console in development
  if (process.env.NODE_ENV !== 'production') {
    console.error('API Error:', error);
  }
  
  return errorMessage;
};

// Image optimization utility
export const optimizeImageUrl = (url, width = 800, quality = 80) => {
  if (!url) return '';
  
  // If it's an external URL that supports image optimization (like Cloudinary)
  if (url.includes('cloudinary.com')) {
    return url.replace('/upload/', `/upload/w_${width},q_${quality}/`);
  }
  
  // If it's a local URL, add query parameters
  if (url.startsWith('/uploads/')) {
    return `${url}?w=${width}&q=${quality}`;
  }
  
  // Return original URL if no optimization is possible
  return url;
};

// Editable content storage utility
export const editableContentStorage = {
  save(key, content) {
    try {
      localStorage.setItem(`editable_${key}`, JSON.stringify(content));
    } catch (error) {
      console.error('Error saving editable content to localStorage:', error);
    }
  },

  load(key, defaultValue) {
    try {
      const stored = localStorage.getItem(`editable_${key}`);
      return stored ? JSON.parse(stored) : defaultValue;
    } catch (error) {
      console.error('Error loading editable content from localStorage:', error);
      return defaultValue;
    }
  }
};

// Change tracking utility
export const changeTracker = {
  changes: [],
  maxChanges: 50, // Maximum number of changes to keep in history

  trackChange(type, details) {
    const change = {
      type,
      details,
      timestamp: new Date().toISOString(),
    };

    this.changes.unshift(change);

    // Keep only the last maxChanges entries
    if (this.changes.length > this.maxChanges) {
      this.changes = this.changes.slice(0, this.maxChanges);
    }

    // Log the change to console in development
    if (process.env.NODE_ENV === 'development') {
      console.log('Change tracked:', change);
    }

    return change;
  },

  getChanges() {
    return [...this.changes];
  },

  clearChanges() {
    this.changes = [];
  }
};
