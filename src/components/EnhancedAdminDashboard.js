import React, { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { useTranslation } from 'react-i18next';
import { aiService } from '../services/aiService';
import LoadingSpinner from './LoadingSpinner';
import ErrorBoundary from './ErrorBoundary';
import CollectionManager from './CollectionManager';
import DesignAssistant from './DesignAssistant';
import TrendAnalyzer from './TrendAnalyzer';

const EnhancedAdminDashboard = ({ onClose }) => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('collections');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleAIRequest = async (type, data) => {
    setIsLoading(true);
    setError(null);
    try {
      switch (type) {
        case 'design-suggestions':
          return await aiService.generateDesignSuggestions(data);
        case 'trend-analysis':
          return await aiService.analyzeTrends(data);
        case 'color-palette':
          return await aiService.generateColorPalette(data);
        default:
          throw new Error('Unknown AI request type');
      }
    } catch (err) {
      setError(err.message || 'AI service error');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ErrorBoundary>
      <div className="admin-dashboard">
        <Card>
          <CardHeader>
            <CardTitle>{t('dashboard.title')}</CardTitle>
            <Button onClick={onClose} variant="outline">
              {t('common.close')}
            </Button>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="collections" onValueChange={handleTabChange}>
              <TabsList>
                <TabsTrigger value="collections">{t('dashboard.tabs.collections')}</TabsTrigger>
                <TabsTrigger value="design">{t('dashboard.tabs.design')}</TabsTrigger>
                <TabsTrigger value="trends">{t('dashboard.tabs.trends')}</TabsTrigger>
              </TabsList>
              
              <TabsContent value="collections">
                <CollectionManager onAIRequest={handleAIRequest} />
              </TabsContent>
              
              <TabsContent value="design">
                <DesignAssistant onAIRequest={handleAIRequest} />
              </TabsContent>
              
              <TabsContent value="trends">
                <TrendAnalyzer onAIRequest={handleAIRequest} />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </ErrorBoundary>
  );
};

export default EnhancedAdminDashboard;
