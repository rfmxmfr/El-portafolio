import React from 'react';
import { useTranslation } from 'react-i18next';
import { Badge } from '../../ui/badge';

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
});

const AnalysisResults = ({ result }) => {
  const { t } = useTranslation();
  
  if (!result) return null;
  
  return (
    <div className="bg-neutral-50 p-4 rounded-md">
      <h3 className="font-medium text-neutral-900 mb-2">{t('Analysis Results')}</h3>
      
      <div className="mb-4">
        <p className="text-sm text-neutral-600 mb-1">{t('Style Category')}:</p>
        <Badge className="bg-neutral-200 text-neutral-800">
          {result.style_analysis.style_category}
        </Badge>
      </div>
      
      <div className="mb-4">
        <p className="text-sm text-neutral-600 mb-1">{t('Color Palette')}:</p>
        <ColorPalette palette={result.color_analysis} />
      </div>
      
      <div>
        <p className="text-sm text-neutral-600 mb-1">{t('Top Predictions')}:</p>
        <ul className="space-y-1">
          {result.style_analysis.predictions.slice(0, 3).map((pred, index) => (
            <li key={index} className="text-sm">
              {pred.label}: {Math.round(pred.confidence * 100)}%
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default React.memo(AnalysisResults);