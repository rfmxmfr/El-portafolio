import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card.jsx';
import { Button } from '../ui/button.jsx';
import { Plus, X, Save, Edit2 } from 'lucide-react';
import { editableContentStorage } from '../../lib/utils';
import { changeTracker } from '../../lib/utils';

export default function FeatureLibrary({ onSelectFeature }) {
  const { t } = useTranslation();
  const [features, setFeatures] = useState(() => {
    return editableContentStorage.load('featureLibrary', {
      features: [
        { id: 'feature-1', name: 'Notched lapels' },
        { id: 'feature-2', name: 'Single button closure' },
        { id: 'feature-3', name: 'Flap pockets' },
        { id: 'feature-4', name: 'Relaxed fit' },
        { id: 'feature-5', name: 'V-neck design' },
        { id: 'feature-6', name: 'Ruffled sleeves' },
        { id: 'feature-7', name: 'Loose fit' },
        { id: 'feature-8', name: 'Silk construction' }
      ]
    }).features;
  });
  
  const [newFeature, setNewFeature] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editingFeature, setEditingFeature] = useState(null);
  
  useEffect(() => {
    editableContentStorage.save('featureLibrary', { features });
  }, [features]);
  
  const handleAddFeature = () => {
    if (!newFeature.trim()) return;
    
    const newFeatureObj = {
      id: `feature-${Date.now()}`,
      name: newFeature.trim()
    };
    
    setFeatures([...features, newFeatureObj]);
    setNewFeature('');
    
    changeTracker.trackChange('ADD_FEATURE', {
      featureId: newFeatureObj.id,
      name: newFeatureObj.name
    });
  };
  
  const handleDeleteFeature = (featureId) => {
    setFeatures(features.filter(feature => feature.id !== featureId));
    
    changeTracker.trackChange('DELETE_FEATURE', {
      featureId
    });
  };
  
  const handleEditFeature = (feature) => {
    setEditingFeature(feature);
    setNewFeature(feature.name);
  };
  
  const handleUpdateFeature = () => {
    if (!newFeature.trim() || !editingFeature) return;
    
    setFeatures(features.map(feature => 
      feature.id === editingFeature.id 
        ? { ...feature, name: newFeature.trim() } 
        : feature
    ));
    
    changeTracker.trackChange('UPDATE_FEATURE', {
      featureId: editingFeature.id,
      name: newFeature.trim()
    });
    
    setNewFeature('');
    setEditingFeature(null);
  };
  
  const handleCancelEdit = () => {
    setNewFeature('');
    setEditingFeature(null);
  };
  
  return (
    <Card className="bg-white border-neutral-200">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-medium text-neutral-900">
          {t('Feature Library')}
        </CardTitle>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsEditing(!isEditing)}
          className="text-neutral-700 border-neutral-300 hover:bg-neutral-100"
        >
          {isEditing ? (
            <>
              <Save size={16} className="mr-2" />
              {t('Done')}
            </>
          ) : (
            <>
              <Edit2 size={16} className="mr-2" />
              {t('Manage Features')}
            </>
          )}
        </Button>
      </CardHeader>
      <CardContent>
        {isEditing ? (
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={newFeature}
                onChange={(e) => setNewFeature(e.target.value)}
                placeholder={t('Enter feature name...')}
                className="flex-1 p-2 border border-neutral-300 rounded text-sm"
              />
              {editingFeature ? (
                <div className="flex space-x-1">
                  <Button
                    onClick={handleUpdateFeature}
                    disabled={!newFeature.trim()}
                    className="bg-neutral-900 hover:bg-neutral-800 text-white"
                    size="sm"
                  >
                    {t('Update')}
                  </Button>
                  <Button
                    onClick={handleCancelEdit}
                    variant="outline"
                    className="text-neutral-700 border-neutral-300 hover:bg-neutral-100"
                    size="sm"
                  >
                    {t('Cancel')}
                  </Button>
                </div>
              ) : (
                <Button
                  onClick={handleAddFeature}
                  disabled={!newFeature.trim()}
                  className="bg-neutral-900 hover:bg-neutral-800 text-white"
                >
                  <Plus size={16} />
                </Button>
              )}
            </div>
            
            <div className="space-y-2">
              {features.map(feature => (
                <div 
                  key={feature.id} 
                  className="flex items-center justify-between px-3 py-2 bg-neutral-50 rounded-md"
                >
                  <span className="text-neutral-700">{feature.name}</span>
                  <div className="flex space-x-1">
                    <button
                      onClick={() => handleEditFeature(feature)}
                      className="text-neutral-500 hover:text-neutral-700"
                    >
                      <Edit2 size={16} />
                    </button>
                    <button
                      onClick={() => handleDeleteFeature(feature.id)}
                      className="text-neutral-500 hover:text-red-600"
                    >
                      <X size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {features.map(feature => (
              <button
                key={feature.id}
                onClick={() => onSelectFeature && onSelectFeature(feature.name)}
                className="px-3 py-2 text-sm text-left bg-neutral-50 hover:bg-neutral-100 rounded-md transition-colors"
              >
                {feature.name}
              </button>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}