import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { X, Sparkles } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card.jsx';
import { Button } from '../ui/button.jsx';
import { Badge } from '../ui/badge.jsx';
import TagLibrary from './TagLibrary';
import ImageGridGallery from './ImageGridGallery';
import LogoUploader from './LogoUploader';
import AIPortfolioAssistant from './AIPortfolioAssistant';

export default function CollectionForm({ onSubmit, onCancel }) {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    tags: [],
    images: [],
    moodBoard: null,
    sketch: null,
    logo: null,
    aiGenerated: false
  });
  const [showAIAssistant, setShowAIAssistant] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectTag = (tag) => {
    if (!formData.tags.find(t => t.id === tag.id)) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, tag]
      }));
    }
  };

  const handleRemoveTag = (tagId) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag.id !== tagId)
    }));
  };

  const handleAddImage = (image) => {
    setFormData(prev => ({
      ...prev,
      images: [...prev.images, image]
    }));
  };

  const handleDeleteImage = (imageId) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter(img => img.id !== imageId),
      moodBoard: prev.moodBoard?.id === imageId ? null : prev.moodBoard,
      sketch: prev.sketch?.id === imageId ? null : prev.sketch,
      logo: prev.logo?.id === imageId ? null : prev.logo
    }));
  };

  const handleSelectMoodBoard = (image) => {
    setFormData(prev => ({
      ...prev,
      moodBoard: image
    }));
  };

  const handleSelectSketch = (image) => {
    setFormData(prev => ({
      ...prev,
      sketch: image
    }));
  };
  
  const handleSelectLogo = (image) => {
    setFormData(prev => ({
      ...prev,
      logo: image
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.title.trim() && formData.description.trim()) {
      onSubmit({
        ...formData,
        tags: formData.tags.map(tag => tag.name)
      });
    }
  };
  
  const handleApplyAIContent = (aiContent) => {
    // Extract tags from AI content and convert to tag objects
    const aiTags = aiContent.tags.map((tag, index) => ({
      id: `ai-tag-${index}`,
      name: tag,
      color: 'bg-amber-100 text-amber-800'
    }));
    
    setFormData(prev => ({
      ...prev,
      title: aiContent.title,
      description: aiContent.description,
      tags: [...prev.tags, ...aiTags.filter(tag => !prev.tags.some(t => t.name.toLowerCase() === tag.name.toLowerCase()))],
      aiGenerated: true
    }));
    
    // Hide AI assistant after applying
    setShowAIAssistant(false);
  };

  return (
    <div className="space-y-6">
      <Card className="bg-white border-neutral-200">
        <CardHeader>
          <CardTitle className="text-lg font-medium text-neutral-900">{t('Create New Collection')}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
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
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                {t('Tags')}
              </label>
              <TagLibrary onSelectTag={handleSelectTag} />
              
              {formData.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-3">
                  {formData.tags.map((tag) => (
                    <Badge 
                      key={tag.id} 
                      className={`${tag.color} flex items-center gap-1`}
                    >
                      {tag.name}
                      <button 
                        type="button" 
                        onClick={() => handleRemoveTag(tag.id)}
                        className="text-neutral-500 hover:text-neutral-700"
                      >
                        <X size={14} />
                      </button>
                    </Badge>
                  ))}
                </div>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                {t('Collection Images')}
              </label>
              <ImageGridGallery
                images={formData.images}
                onAddImage={handleAddImage}
                onDeleteImage={handleDeleteImage}
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  {t('Mood Board')}
                </label>
                <ImageGridGallery
                  images={formData.images}
                  onSelectImage={handleSelectMoodBoard}
                  selectable={true}
                  selectedImage={formData.moodBoard?.id}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  {t('Design Sketch')}
                </label>
                <ImageGridGallery
                  images={formData.images}
                  onSelectImage={handleSelectSketch}
                  selectable={true}
                  selectedImage={formData.sketch?.id}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  {t('Collection Logo')}
                </label>
                {formData.logo ? (
                  <div className="relative border rounded-md p-4 text-center">
                    <img 
                      src={formData.logo.url} 
                      alt="Collection logo" 
                      className="max-h-32 mx-auto"
                    />
                    <button
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, logo: null }))}
                      className="absolute top-2 right-2 bg-neutral-800 text-white rounded-full p-1"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ) : (
                  <LogoUploader 
                    onUpload={(logoData) => {
                      setFormData(prev => ({
                        ...prev,
                        logo: logoData
                      }));
                    }} 
                  />
                )}
              </div>
            </div>
            
            <div className="flex justify-between items-center pt-4">
              <Button
                type="button"
                onClick={() => setShowAIAssistant(!showAIAssistant)}
                className="bg-amber-500 hover:bg-amber-600 text-white flex items-center"
              >
                <Sparkles size={16} className="mr-2" />
                {showAIAssistant ? t('Hide AI Assistant') : t('Use AI Assistant')}
              </Button>
              
              <div className="flex space-x-2">
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
            </div>
            
            {showAIAssistant && (
              <div className="mt-6">
                <AIPortfolioAssistant 
                  onApplyToCollection={handleApplyAIContent}
                  collectionId="new-collection"
                />
              </div>
            )}
          </form>
        </CardContent>
      </Card>
    </div>
  );
}