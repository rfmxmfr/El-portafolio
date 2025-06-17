import React, { useState, useEffect } from 'react';
import { useSpring, animated } from 'react-spring';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { useTranslation } from 'react-i18next';
import { springConfig, useCardAnimation, useTransitionAnimation } from '../services/springConfig';
import LoadingSpinner from './LoadingSpinner';
import ErrorBoundary from './ErrorBoundary';
import CollectionManager from './CollectionManager';
import DesignAssistant from './DesignAssistant';
import TrendAnalyzer from './TrendAnalyzer';

const AnimatedAdminDashboard = ({ onClose }) => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('collections');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  const cardAnimation = useCardAnimation(isMounted);
  const loadingAnimation = useLoadingAnimation(isLoading);
  const errorAnimation = useErrorAnimation(error);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const tabs = [
    { id: 'collections', title: t('dashboard.tabs.collections') },
    { id: 'design', title: t('dashboard.tabs.design') },
    { id: 'trends', title: t('dashboard.tabs.trends') },
  ];

  const tabsAnimation = useTransitionAnimation(tabs, (tab) => tab.id);

  return (
    <ErrorBoundary>
      <animated.div style={cardAnimation} className="admin-dashboard">
        <animated.div style={errorAnimation} className="error-container">
          {error && <p>{error}</p>}
        </animated.div>

        <animated.div style={loadingAnimation} className="loading-container">
          {isLoading && <LoadingSpinner size={32} />}
        </animated.div>

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
                {tabsAnimation((tab, i) => (
                  <animated.div key={tab.id} style={tab.style}>
                    <TabsTrigger value={tab.id}>{tab.title}</TabsTrigger>
                  </animated.div>
                ))}
              </TabsList>

              <TabsContent value="collections">
                <CollectionManager />
              </TabsContent>

              <TabsContent value="design">
                <DesignAssistant />
              </TabsContent>

              <TabsContent value="trends">
                <TrendAnalyzer />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </animated.div>
    </ErrorBoundary>
  );
};

export default AnimatedAdminDashboard;
