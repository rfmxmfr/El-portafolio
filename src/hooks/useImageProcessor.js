import { useState, useCallback, useEffect, useRef } from 'react';

export default function useImageProcessor() {
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState(null);
  const workerRef = useRef(null);
  
  // Initialize worker
  useEffect(() => {
    // Create worker only on client side
    if (typeof window !== 'undefined') {
      workerRef.current = new Worker('/ml-worker.js');
      
      // Set up message handler
      workerRef.current.onmessage = (e) => {
        const { type, payload } = e.data;
        
        switch (type) {
          case 'PROCESS_COMPLETE':
            setProcessing(false);
            break;
          case 'ERROR':
            setError(payload);
            setProcessing(false);
            break;
        }
      };
    }
    
    // Clean up worker on unmount
    return () => {
      if (workerRef.current) {
        workerRef.current.terminate();
      }
    };
  }, []);
  
  // Process image using web worker
  const processImage = useCallback(async (imageFile) => {
    if (!workerRef.current) return null;
    
    setProcessing(true);
    setError(null);
    
    return new Promise((resolve, reject) => {
      // Create a one-time message handler for this specific request
      const messageHandler = (e) => {
        const { type, payload } = e.data;
        
        if (type === 'PROCESS_COMPLETE') {
          workerRef.current.removeEventListener('message', messageHandler);
          resolve(payload);
        } else if (type === 'ERROR') {
          workerRef.current.removeEventListener('message', messageHandler);
          setError(payload);
          reject(new Error(payload));
        }
      };
      
      // Add the temporary message handler
      workerRef.current.addEventListener('message', messageHandler);
      
      // Convert image to format suitable for worker
      const reader = new FileReader();
      reader.onload = (e) => {
        workerRef.current.postMessage({
          type: 'PROCESS_IMAGE',
          payload: { imageData: e.target.result }
        });
      };
      reader.onerror = () => {
        setError('Failed to read image file');
        setProcessing(false);
        reject(new Error('Failed to read image file'));
      };
      reader.readAsDataURL(imageFile);
    });
  }, []);
  
  // Optimize image for display
  const optimizeImage = useCallback((file, maxWidth = 800) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        // Calculate new dimensions
        let width = img.width;
        let height = img.height;
        
        if (width > maxWidth) {
          height = (height * maxWidth) / width;
          width = maxWidth;
        }
        
        // Create canvas and resize
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);
        
        // Convert to blob
        canvas.toBlob((blob) => {
          resolve(URL.createObjectURL(blob));
        }, 'image/jpeg', 0.85);
      };
      
      img.onerror = () => reject(new Error('Failed to load image'));
      img.src = URL.createObjectURL(file);
    });
  }, []);
  
  return {
    processing,
    error,
    processImage,
    optimizeImage
  };
}