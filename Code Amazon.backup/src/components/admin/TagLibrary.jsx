import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card.jsx';
import { Button } from '../ui/button.jsx';
import { Badge } from '../ui/badge.jsx';
import { Plus, X, Save } from 'lucide-react';
import { editableContentStorage } from '../../lib/utils';
import { changeTracker } from '../../lib/utils';

export default function TagLibrary({ onSelectTag }) {
  const { t } = useTranslation();
  const [tags, setTags] = useState(() => {
    return editableContentStorage.load('tagLibrary', {
      tags: [
        { id: 'tag-1', name: 'Minimalist', color: 'bg-neutral-100 text-neutral-700' },
        { id: 'tag-2', name: 'Professional', color: 'bg-blue-100 text-blue-700' },
        { id: 'tag-3', name: 'Sustainable', color: 'bg-green-100 text-green-700' },
        { id: 'tag-4', name: 'Bold', color: 'bg-purple-100 text-purple-700' },
        { id: 'tag-5', name: 'Luxury', color: 'bg-amber-100 text-amber-700' },
        { id: 'tag-6', name: 'Statement', color: 'bg-red-100 text-red-700' }
      ]
    }).tags;
  });
  
  const [newTagName, setNewTagName] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  
  const colorOptions = [
    { id: 'neutral', class: 'bg-neutral-100 text-neutral-700' },
    { id: 'blue', class: 'bg-blue-100 text-blue-700' },
    { id: 'green', class: 'bg-green-100 text-green-700' },
    { id: 'purple', class: 'bg-purple-100 text-purple-700' },
    { id: 'amber', class: 'bg-amber-100 text-amber-700' },
    { id: 'red', class: 'bg-red-100 text-red-700' },
    { id: 'pink', class: 'bg-pink-100 text-pink-700' },
    { id: 'indigo', class: 'bg-indigo-100 text-indigo-700' },
  ];
  
  const [selectedColor, setSelectedColor] = useState(colorOptions[0].class);
  
  useEffect(() => {
    editableContentStorage.save('tagLibrary', { tags });
  }, [tags]);
  
  const handleAddTag = () => {
    if (!newTagName.trim()) return;
    
    const newTag = {
      id: `tag-${Date.now()}`,
      name: newTagName.trim(),
      color: selectedColor
    };
    
    setTags([...tags, newTag]);
    setNewTagName('');
    
    changeTracker.trackChange('ADD_TAG', {
      tagId: newTag.id,
      name: newTag.name
    });
  };
  
  const handleDeleteTag = (tagId) => {
    setTags(tags.filter(tag => tag.id !== tagId));
    
    changeTracker.trackChange('DELETE_TAG', {
      tagId
    });
  };
  
  return (
    <Card className="bg-white border-neutral-200">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-medium text-neutral-900">
          {t('Tag Library')}
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
              <Plus size={16} className="mr-2" />
              {t('Manage Tags')}
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
                value={newTagName}
                onChange={(e) => setNewTagName(e.target.value)}
                placeholder={t('Enter tag name...')}
                className="flex-1 p-2 border border-neutral-300 rounded text-sm"
              />
              <div className="flex space-x-1">
                {colorOptions.map(color => (
                  <button
                    key={color.id}
                    onClick={() => setSelectedColor(color.class)}
                    className={`w-6 h-6 rounded-full ${color.class} ${
                      selectedColor === color.class ? 'ring-2 ring-offset-2 ring-neutral-500' : ''
                    }`}
                  />
                ))}
              </div>
              <Button
                onClick={handleAddTag}
                disabled={!newTagName.trim()}
                className="bg-neutral-900 hover:bg-neutral-800 text-white"
              >
                <Plus size={16} />
              </Button>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {tags.map(tag => (
                <div key={tag.id} className="flex items-center">
                  <Badge className={tag.color}>
                    {tag.name}
                  </Badge>
                  <button
                    onClick={() => handleDeleteTag(tag.id)}
                    className="ml-1 text-neutral-400 hover:text-red-600"
                  >
                    <X size={14} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex flex-wrap gap-2">
            {tags.map(tag => (
              <Badge
                key={tag.id}
                className={`${tag.color} cursor-pointer`}
                onClick={() => onSelectTag && onSelectTag(tag)}
              >
                {tag.name}
              </Badge>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}