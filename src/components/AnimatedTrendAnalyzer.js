import React, { useState, useEffect } from 'react';
import { useSpring, animated } from 'react-spring';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { useTranslation } from 'react-i18next';
import { springConfig, useCardAnimation, useButtonAnimation } from '../services/springConfig';
import LoadingSpinner from './LoadingSpinner';

const AnimatedTrendAnalyzer = () => {
  const { t } = useTranslation();
  const [trendImages, setTrendImages] = useState([]);
  const [analysisResults, setAnalysisResults] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  const cardAnimation = useCardAnimation(true);
  const buttonAnimation = useButtonAnimation(isHovered, isPressed);
  const loadingAnimation = useLoadingAnimation(isLoading);

  const handleImageUpload = async (event) => {
    const files = Array.from(event.target.files);
    setTrendImages(files);
  };

  const handleAnalyzeTrends = async () => {
    if (trendImages.length === 0) return;

    setIsPressed(true);
    setIsLoading(true);
    
    try {
      // Replace with actual AI call
      const mockResults = [
        'Trend 1: Minimalist silhouettes',
        'Trend 2: Sustainable materials',
        'Trend 3: Monochrome palettes',
      ];
      setAnalysisResults(mockResults);
    } catch (error) {
      console.error('Error analyzing trends:', error);
    } finally {
      setIsPressed(false);
      setIsLoading(false);
    }
  };

  return (
    <animated.div style={cardAnimation} className="trend-analyzer">
      <Card>
        <CardHeader>
          <CardTitle>{t('trends.title')}</CardTitle>
        </CardHeader>
        
        <CardContent>
          <animated.div style={loadingAnimation} className="loading-container">
            {isLoading && <LoadingSpinner size={24} />}
          </animated.div>

          <div className="flex flex-col gap-4">
            <div className="upload-section">
              <animated.button
                style={buttonAnimation}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                onMouseDown={() => setIsPressed(true)}
                onMouseUp={() => setIsPressed(false)}
              >
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
                {t('trends.uploadImages')}
              </animated.button>
              <p className="text-sm text-muted-foreground">
                {t('trends.uploadInstructions')}
              </p>
            </div>

            {trendImages.length > 0 && (
              <div className="images-preview">
                {trendImages.map((file, index) => (
                  <animated.img
                    key={index}
                    style={useCardAnimation(true)}
                    src={URL.createObjectURL(file)}
                    alt={`Trend ${index + 1}`}
                    className="preview-image"
                  />
                ))}
              </div>
            )}

            <animated.button
              style={buttonAnimation}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              onMouseDown={() => setIsPressed(true)}
              onMouseUp={() => setIsPressed(false)}
              onClick={handleAnalyzeTrends}
              disabled={isLoading}
            >
              {isLoading ? <LoadingSpinner size={16} /> : t('trends.analyze')}
            </animated.button>

            {analysisResults && (
              <animated.div style={useCardAnimation(true)} className="analysis-results">
                <h3>{t('trends.results')}</h3>
                <ul>
                  {analysisResults.map((result, index) => (
                    <li key={index}>{result}</li>
                  ))}
                </ul>
              </animated.div>
            )}
          </div>
        </CardContent>
      </Card>
    </animated.div>
  );
};

export default AnimatedTrendAnalyzer;
