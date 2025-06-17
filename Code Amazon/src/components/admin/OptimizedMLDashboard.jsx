import { useState, useEffect, useMemo, useCallback, lazy, Suspense } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Separator } from '../ui/separator';
import { Upload, Image as ImageIcon, RefreshCw } from 'lucide-react';
import mlApi from '../../services/mlApi';
import useMLModel from '../../hooks/useMLModel';
import useImageProcessor from '../../hooks/useImageProcessor';

// Lazy loaded components
const AnalysisResults = lazy(() => import('./ml/AnalysisResults'));
const SimilarItems = lazy(() => import('./ml/SimilarItems'));

// Memoized component for rendering color palette
const ColorPalette = React.memo(({ palette }) => {
  if (!palette || !palette.palette) return null;
  
  return (
    <div className="flex space-x-2 mt-2">
      {palette.palette.map((color, index) => (
        <div key={index} className="flex flex-col items-center">
          <div 
            className="w-8 h-8 rounded-full border border-neutral-200" 
            style={{ backgroundColor: color.color }}
          ></div>
          <span className="text-xs mt-1">{Math.round(color.percentage * 100)}%</span>
        </div>
      ))}
    </div>
  );
}, (prevProps, nextProps) => {
  // Custom comparison to prevent unnecessary re-renders
  if (!prevProps.palette && !nextProps.palette) return true;
  if (!prevProps.palette || !nextProps.palette) return false;
  
  const prevColors = prevProps.palette.palette || [];
  const nextColors = nextProps.palette.palette || [];
  
  if (prevColors.length !== nextColors.length) return false;
  
  return prevColors.every((color, i) => 
    color.color === nextColors[i].color && 
    color.percentage === nextColors[i].percentage
  );
});

// Loading fallback
const LoadingFallback = () => (
  <div className="p-4 bg-neutral-50 rounded-md">
    <div className="animate-pulse flex space-x-4">
      <div className="flex-1 space-y-4 py-1">
        <div className="h-4 bg-neutral-200 rounded w-3/4"></div>
        <div className="space-y-2">
          <div className="h-4 bg-neutral-200 rounded"></div>
          <div className="h-4 bg-neutral-200 rounded w-5/6"></div>
        </div>
      </div>
    </div>
  </div>
);

export default function OptimizedMLDashboard() {
  const { t } = useTranslation();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [analyzing, setAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [error, setError] = useState(null);
  
  // Use custom hooks
  const { model, isLoading: modelLoading, loadModel } = useMLModel('fashion-model');
  const { processing, processImage, optimizeImage } = useImageProcessor();
  
  // Load model on component mount
  useEffect(() => {
    loadModel();
  }, [loadModel]);
  
  // Fetch items with memoized callback
  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const data = await mlApi.getFashionItems();
      setItems(data);
    } catch (err) {
      setError('Failed to load fashion items');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);
  
  // Initial data fetch
  useEffect(() => {
    fetchItems();
  }, [fetchItems]);
  
  // Optimized file change handler
  const handleFileChange = useCallback(async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    try {
      // Optimize image for preview
      const optimizedUrl = await optimizeImage(file);
      setSelectedFile(file);
      setPreviewUrl(optimizedUrl);
      setAnalysisResult(null);
    } catch (err) {
      setError('Failed to process image');
      console.error(err);
    }
  }, [optimizeImage]);
  
  // Memoized upload handler
  const handleUpload = useCallback(async () => {
    if (!selectedFile || analyzing || !model) return;
    
    try {
      setAnalyzing(true);
      setError(null);
      
      // Process image in web worker
      await processImage(selectedFile);
      
      const newItem = await mlApi.createFashionItem({
        title: selectedFile.name.split('.')[0],
        description: 'Uploaded for ML analysis',
        image: selectedFile
      });
      
      // Track performance
      const tracker = model.trackInference?.(selectedFile.size);
      
      // Get the analysis results
      const analysis = await mlApi.analyzeFashionItem(newItem.id);
      
      // End performance tracking
      if (tracker) tracker.end();
      
      setAnalysisResult(analysis);
      
      // Refresh the items list
      fetchItems();
    } catch (err) {
      setError('Failed to analyze image');
      console.error(err);
    } finally {
      setAnalyzing(false);
    }
  }, [selectedFile, analyzing, model, processImage, fetchItems]);
  
  // Memoized similar items handler
  const handleGetSimilar = useCallback(async (itemId) => {
    try {
      setLoading(true);
      const similarItems = await mlApi.getSimilarItems(itemId);
      
      // Update the item with similar items using immutable update
      setItems(prevItems => 
        prevItems.map(item => 
          item.id === itemId ? { ...item, similarItems } : item
        )
      );
    } catch (err) {
      setError(`Failed to get similar items for ID: ${itemId}`);
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);
  
  // Memoized items list
  const itemsList = useMemo(() => {
    if (loading) return <p className="text-neutral-600">{t('Loading...')}</p>;
    if (items.length === 0) return <p className="text-neutral-600">{t('No fashion items found')}</p>;
    
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {items.map((item) => (
          <Card key={item.id} className="bg-white border-neutral-200">
            <div className="flex">
              <div className="w-1/3 p-4">
                {item.image && (
                  <img 
                    src={item.image} 
                    alt={item.title}
                    className="w-full h-auto rounded-md"
                    loading="lazy" // Lazy load images
                  />
                )}
              </div>
              <div className="w-2/3 p-4">
                <h4 className="font-medium text-neutral-900">{item.title}</h4>
                
                {item.style_category && (
                  <div className="mt-2">
                    <Badge className="bg-neutral-200 text-neutral-800">
                      {item.style_category}
                    </Badge>
                  </div>
                )}
                
                {item.color_palette && <ColorPalette palette={item.color_palette} />}
                
                <div className="mt-4">
                  <Button
                    onClick={() => handleGetSimilar(item.id)}
                    size="sm"
                    className="bg-neutral-800 hover:bg-neutral-700 text-white"
                  >
                    <RefreshCw size={16} className="mr-2" />
                    {t('Find Similar Items')}
                  </Button>
                </div>
              </div>
            </div>
            
            {item.similarItems && (
              <Suspense fallback={<LoadingFallback />}>
                <SimilarItems items={item.similarItems} />
              </Suspense>
            )}
          </Card>
        ))}
      </div>
    );
  }, [items, loading, t, handleGetSimilar]);
  
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-medium text-neutral-900">{t('Fashion ML Dashboard')}</h2>
      
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-md">
          {error}
        </div>
      )}
      
      <Card className="bg-white border-neutral-200">
        <CardHeader>
          <CardTitle className="text-lg font-medium text-neutral-900">
            {t('Analyze New Fashion Item')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div className="border-2 border-dashed border-neutral-300 rounded-md p-6 text-center">
                <input
                  type="file"
                  id="image-upload"
                  className="hidden"
                  accept="image/*"
                  onChange={handleFileChange}
                />
                <label htmlFor="image-upload" className="cursor-pointer">
                  {previewUrl ? (
                    <img 
                      src={previewUrl} 
                      alt="Preview" 
                      className="max-h-64 mx-auto rounded-md"
                    />
                  ) : (
                    <div className="flex flex-col items-center">
                      <Upload className="text-neutral-400 mb-2" size={40} />
                      <p className="text-neutral-600">{t('Click to upload an image')}</p>
                    </div>
                  )}
                </label>
              </div>
              
              <Button
                onClick={handleUpload}
                disabled={!selectedFile || analyzing || modelLoading || processing}
                className="w-full mt-4 bg-neutral-900 hover:bg-neutral-800 text-white"
              >
                {analyzing || modelLoading || processing ? t('Analyzing...') : t('Analyze with ML')}
              </Button>
            </div>
            
            {analysisResult && (
              <Suspense fallback={<LoadingFallback />}>
                <AnalysisResults result={analysisResult} />
              </Suspense>
            )}
          </div>
        </CardContent>
      </Card>
      
      <h3 className="text-xl font-medium text-neutral-900 mt-8">{t('Fashion Items')}</h3>
      {itemsList}
    </div>
  );
}