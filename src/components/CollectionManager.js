import React, { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { useTranslation } from 'react-i18next';
import LoadingSpinner from './LoadingSpinner';

const CollectionManager = ({ onAIRequest }) => {
  const { t } = useTranslation();
  const [collections, setCollections] = useState([]);
  const [newCollectionName, setNewCollectionName] = useState('');
  const [selectedCollection, setSelectedCollection] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

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
      setIsLoading(false);
    }
  };

  const handleAIAnalysis = async () => {
    if (!selectedCollection) return;

    try {
      const suggestions = await onAIRequest('design-suggestions', {
        collectionName: selectedCollection.name,
        currentItems: selectedCollection.items,
      });
      console.log('AI suggestions:', suggestions);
    } catch (error) {
      console.error('AI analysis error:', error);
    }
  };

  return (
    <div className="collection-manager">
      <Card>
        <CardHeader>
          <CardTitle>{t('collections.title')}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 mb-4">
            <Input
              placeholder={t('collections.newCollection')}
              value={newCollectionName}
              onChange={(e) => setNewCollectionName(e.target.value)}
              disabled={isLoading}
            />
            <Button onClick={handleCreateCollection} disabled={isLoading}>
              {isLoading ? <LoadingSpinner size={20} /> : t('common.create')}
            </Button>
          </div>

          <div className="collections-list">
            {collections.map((collection) => (
              <Card
                key={collection.id}
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
              </Card>
            ))}
          </div>

          {selectedCollection && (
            <div className="mt-4">
              <Button onClick={handleAIAnalysis}>
                {t('collections.analyzeWithAI')}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default CollectionManager;
