import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { X } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card.jsx';
import { Button } from '../ui/button.jsx';
import { Badge } from '../ui/badge.jsx';

export default function CollectionForm({ onSubmit, onCancel }) {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    tags: []
  });
  const [tagInput, setTagInput] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAddTag = (e) => {
    e.preventDefault();
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()]
      }));
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.title.trim() && formData.description.trim()) {
      onSubmit(formData);
    }
  };

  return (
    <Card className="bg-white border-neutral-200">
      <CardHeader>
        <CardTitle className="text-lg font-medium text-neutral-900">{t('Create New Collection')}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-neutral-700 mb-1">
              {t('Collection Title')}*
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-neutral-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-neutral-500"
              placeholder={t('Enter collection title')}
            />
          </div>
          
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-neutral-700 mb-1">
              {t('Description')}*
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows={4}
              className="w-full px-3 py-2 border border-neutral-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-neutral-500"
              placeholder={t('Enter collection description')}
            />
          </div>
          
          <div>
            <label htmlFor="tags" className="block text-sm font-medium text-neutral-700 mb-1">
              {t('Tags')}
            </label>
            <div className="flex">
              <input
                type="text"
                id="tags"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                className="flex-1 px-3 py-2 border border-neutral-300 rounded-l-md text-sm focus:outline-none focus:ring-2 focus:ring-neutral-500"
                placeholder={t('Add a tag')}
              />
              <button
                type="button"
                onClick={handleAddTag}
                className="px-4 py-2 bg-neutral-200 text-neutral-700 rounded-r-md hover:bg-neutral-300 transition-colors"
              >
                {t('Add')}
              </button>
            </div>
            
            {formData.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {formData.tags.map((tag) => (
                  <Badge 
                    key={tag} 
                    variant="secondary" 
                    className="bg-neutral-100 text-neutral-700 flex items-center gap-1"
                  >
                    {tag}
                    <button 
                      type="button" 
                      onClick={() => handleRemoveTag(tag)}
                      className="text-neutral-500 hover:text-neutral-700"
                    >
                      <X size={14} />
                    </button>
                  </Badge>
                ))}
              </div>
            )}
          </div>
          
          <div className="flex justify-end space-x-2 pt-4">
            <Button 
              type="button" 
              variant="outline" 
              onClick={onCancel}
              className="text-neutral-700 border-neutral-300 hover:bg-neutral-100"
            >
              {t('Cancel')}
            </Button>
            <Button 
              type="submit" 
              className="bg-neutral-900 hover:bg-neutral-800 text-white"
            >
              {t('Create Collection')}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}