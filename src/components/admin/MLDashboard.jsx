import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Separator } from '../ui/separator';
import { Upload, Image as ImageIcon, Palette, Sparkles, RefreshCw } from 'lucide-react';
import mlApi from '../../services/mlApi';

export default function MLDashboard() {
  const { t } = useTranslation();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [analyzing, setAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
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
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      setAnalysisResult(null);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    try {
      setAnalyzing(true);
      setError(null);

      const newItem = await mlApi.createFashionItem({
        title: selectedFile.name.split('.')[0],
        description: 'Uploaded for ML analysis',
        image: selectedFile
      });

      // Get the analysis results
      const analysis = await mlApi.analyzeFashionItem(newItem.id);
      setAnalysisResult(analysis);
      
      // Refresh the items list
      fetchItems();
    } catch (err) {
      setError('Failed to analyze image');
      console.error(err);
    } finally {
      setAnalyzing(false);
    }
  };

  const handleGetSimilar = async (itemId) => {
    try {
      setLoading(true);
      const similarItems = await mlApi.getSimilarItems(itemId);
      
      // Update the item with similar items
      const updatedItems = items.map(item => {
        if (item.id === itemId) {
          return { ...item, similarItems };
        }
        return item;
      });
      
      setItems(updatedItems);
    } catch (err) {
      setError(`Failed to get similar items for ID: ${itemId}`);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const renderColorPalette = (palette) => {
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
  };

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
                disabled={!selectedFile || analyzing}
                className="w-full mt-4 bg-neutral-900 hover:bg-neutral-800 text-white"
              >
                {analyzing ? t('Analyzing...') : t('Analyze with ML')}
              </Button>
            </div>
            
            {analysisResult && (
              <div className="bg-neutral-50 p-4 rounded-md">
                <h3 className="font-medium text-neutral-900 mb-2">{t('Analysis Results')}</h3>
                
                <div className="mb-4">
                  <p className="text-sm text-neutral-600 mb-1">{t('Style Category')}:</p>
                  <Badge className="bg-neutral-200 text-neutral-800">
                    {analysisResult.style_analysis.style_category}
                  </Badge>
                </div>
                
                <div className="mb-4">
                  <p className="text-sm text-neutral-600 mb-1">{t('Color Palette')}:</p>
                  {renderColorPalette(analysisResult.color_analysis)}
                </div>
                
                <div>
                  <p className="text-sm text-neutral-600 mb-1">{t('Top Predictions')}:</p>
                  <ul className="space-y-1">
                    {analysisResult.style_analysis.predictions.slice(0, 3).map((pred, index) => (
                      <li key={index} className="text-sm">
                        {pred.label}: {Math.round(pred.confidence * 100)}%
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
      
      <h3 className="text-xl font-medium text-neutral-900 mt-8">{t('Fashion Items')}</h3>
      
      {loading ? (
        <p className="text-neutral-600">{t('Loading...')}</p>
      ) : items.length === 0 ? (
        <p className="text-neutral-600">{t('No fashion items found')}</p>
      ) : (
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
                  
                  {item.color_palette && renderColorPalette(item.color_palette)}
                  
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
                <div className="p-4 border-t border-neutral-200">
                  <h5 className="font-medium text-neutral-900 mb-2">{t('Similar Items')}</h5>
                  <div className="space-y-2">
                    {item.similarItems.map((rec) => (
                      <div key={rec.id} className="flex items-center">
                        <div className="w-8 h-8 bg-neutral-200 rounded-full flex items-center justify-center mr-2">
                          <ImageIcon size={16} />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">{rec.recommended_item_details.title}</p>
                          <p className="text-xs text-neutral-500">{rec.recommendation_reason}</p>
                        </div>
                        <Badge className="bg-neutral-100 text-neutral-800">
                          {Math.round(rec.similarity_score * 100)}%
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}