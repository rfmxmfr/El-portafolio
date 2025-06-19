import React, { useState, useEffect } from 'react';
import { useSpring, animated } from 'react-spring';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { useTranslation } from 'react-i18next';
import { springConfig, useCardAnimation, useButtonAnimation } from '../services/springConfig';
import LoadingSpinner from './LoadingSpinner';

const AnimatedCollectionManager = () => {
  const { t } = useTranslation();
  const [collections, setCollections] = useState([]);
  const [newCollectionName, setNewCollectionName] = useState('');
  const [selectedCollection, setSelectedCollection] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  const cardAnimation = useCardAnimation(true);
  const buttonAnimation = useButtonAnimation(isHovered, isPressed);
  const loadingAnimation = useLoadingAnimation(isLoading);

  useEffect(() => {
    loadCollections();
  }, []);

  const loadCollections = async () => {
    setIsLoading(true);
    try {
      // Replace with actual API call
      const mockCollections = [
        { id: 1, name: 'Spring 2024', items: 12 },
        { id: 2, name: 'Summer 2024', items: 8 },
      ];
      setCollections(mockCollections);
    } catch (error) {
      console.error('Error loading collections:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateCollection = async () => {
    if (!newCollectionName.trim()) return;

    setIsPressed(true);
    setIsLoading(true);
    
    try {
      // Replace with actual API call
      const newCollection = {
        id: Date.now(),
        name: newCollectionName.trim(),
        items: 0,
      };
      setCollections([...collections, newCollection]);
      setNewCollectionName('');
    } catch (error) {
      console.error('Error creating collection:', error);
    } finally {
      setIsPressed(false);
      setIsLoading(false);
    }
  };

  const handleAIAnalysis = async () => {
    if (!selectedCollection) return;

    setIsLoading(true);
    try {
      // Replace with actual AI call
      console.log('Analyzing collection:', selectedCollection);
    } catch (error) {
      console.error('AI analysis error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <animated.div style={cardAnimation} className="collection-manager">
      <Card>
        <CardHeader>
          <CardTitle>{t('collections.title')}</CardTitle>
        </CardHeader>
        
        <CardContent>
          <animated.div style={loadingAnimation} className="loading-container">
            {isLoading && <LoadingSpinner size={24} />}
          </animated.div>

          <div className="flex gap-4 mb-4">
            <Input
              placeholder={t('collections.newCollection')}
              value={newCollectionName}
              onChange={(e) => setNewCollectionName(e.target.value)}
              disabled={isLoading}
            />
            <animated.button
              style={buttonAnimation}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              onMouseDown={() => setIsPressed(true)}
              onMouseUp={() => setIsPressed(false)}
              onClick={handleCreateCollection}
              disabled={isLoading}
            >
              {isLoading ? <LoadingSpinner size={16} /> : t('common.create')}
            </animated.button>
          </div>

          <div className="collections-list">
            {collections.map((collection) => (
              <animated.div
                key={collection.id}
                style={useCardAnimation(true)}
                className={`collection-card ${
                  selectedCollection?.id === collection.id ? 'selected' : ''
                }`}
                onClick={() => setSelectedCollection(collection)}
              >
                <CardContent>
                  <div className="collection-info">
                    <h3>{collection.name}</h3>
                    <p>{t('collections.items', { count: collection.items })}</p>
                  </div>
                </CardContent>
              </animated.div>
            ))}
          </div>

          {selectedCollection && (
            <animated.div style={buttonAnimation}>
              <Button onClick={handleAIAnalysis}>
                {t('collections.analyzeWithAI')}
              </Button>
            </animated.div>
          )}
        </CardContent>
      </Card>
    </animated.div>
  );
};

export default AnimatedCollectionManager;
