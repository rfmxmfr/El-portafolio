import React, { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { useTranslation } from 'react-i18next';
import LoadingSpinner from './LoadingSpinner';

const TrendAnalyzer = ({ onAIRequest }) => {
  const { t } = useTranslation();
  const [trendImages, setTrendImages] = useState([]);
  const [analysisResults, setAnalysisResults] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleImageUpload = async (event) => {
    const files = Array.from(event.target.files);
    setTrendImages(files);
  };

  const handleAnalyzeTrends = async () => {
    if (trendImages.length === 0) return;

    setIsLoading(true);
    try {
      const results = await onAIRequest('trend-analysis', trendImages);
      setAnalysisResults(results);
    } catch (error) {
      console.error('Error analyzing trends:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="trend-analyzer">
      <Card>
        <CardHeader>
          <CardTitle>{t('trends.title')}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4">
            <div className="upload-section">
              <Button asChild>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
                {t('trends.uploadImages')}
              </Button>
              <p className="text-sm text-muted-foreground">
                {t('trends.uploadInstructions')}
              </p>
            </div>

            {trendImages.length > 0 && (
              <div className="images-preview">
                {trendImages.map((file, index) => (
                  <img
                    key={index}
                    src={URL.createObjectURL(file)}
                    alt={`Trend ${index + 1}`}
                    className="preview-image"
                  />
                ))}
              </div>
            )}

            <Button onClick={handleAnalyzeTrends} disabled={isLoading}>
              {isLoading ? <LoadingSpinner size={20} /> : t('trends.analyze')}
            </Button>

            {analysisResults && (
              <div className="analysis-results">
                <h3>{t('trends.results')}</h3>
                <ul>
                  {analysisResults.map((result, index) => (
                    <li key={index}>{result}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TrendAnalyzer;
