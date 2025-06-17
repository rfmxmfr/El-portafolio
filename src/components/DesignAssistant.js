import React, { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { useTranslation } from 'react-i18next';
import LoadingSpinner from './LoadingSpinner';

const DesignAssistant = ({ onAIRequest }) => {
  const { t } = useTranslation();
  const [designPrompt, setDesignPrompt] = useState('');
  const [designSuggestions, setDesignSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerateSuggestions = async () => {
    if (!designPrompt.trim()) return;

    setIsLoading(true);
    try {
      const suggestions = await onAIRequest('design-suggestions', designPrompt);
      setDesignSuggestions(suggestions);
    } catch (error) {
      console.error('Error generating suggestions:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="design-assistant">
      <Card>
        <CardHeader>
          <CardTitle>{t('design.title')}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4">
            <Input
              placeholder={t('design.promptPlaceholder')}
              value={designPrompt}
              onChange={(e) => setDesignPrompt(e.target.value)}
              disabled={isLoading}
            />
            <Button onClick={handleGenerateSuggestions} disabled={isLoading}>
              {isLoading ? <LoadingSpinner size={20} /> : t('design.generate')}
            </Button>

            {designSuggestions.length > 0 && (
              <div className="suggestions-list">
                {designSuggestions.map((suggestion, index) => (
                  <Card key={index} className="suggestion-card">
                    <CardContent>
                      <h4>{t('design.suggestion', { number: index + 1 })}</h4>
                      <p>{suggestion.text}</p>
                      {suggestion.image && (
                        <img
                          src={suggestion.image}
                          alt={suggestion.text}
                          className="suggestion-image"
                        />
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DesignAssistant;
