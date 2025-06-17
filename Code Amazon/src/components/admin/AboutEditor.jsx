import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card.jsx';
import { Button } from '../ui/button.jsx';
import { Separator } from '../ui/separator.jsx';
import { Image, Film, Save, Plus, Trash2, ArrowUp, ArrowDown, Check } from 'lucide-react';
import { editableContentStorage } from '../../lib/utils';
import { changeTracker } from '../../lib/utils';

export default function AboutEditor() {
  const { t } = useTranslation();
  const [aboutContent, setAboutContent] = useState(() => {
    return editableContentStorage.load('aboutDesigner', {
      paragraphs: [
        'With a passion for sustainable fashion and innovative design, I create collections that bridge the gap between contemporary aesthetics and timeless appeal. My work focuses on clean silhouettes, quality materials, and versatile pieces that empower the modern individual.',
        'Drawing inspiration from minimalist architecture, natural textures, and cultural diversity, each design reflects a commitment to both style and substance. I believe fashion should be both beautiful and responsible, creating pieces that last beyond seasonal trends.'
      ],
      media: []
    });
  });
  
  const [hasChanges, setHasChanges] = useState(false);
  const [selectedParagraphIndex, setSelectedParagraphIndex] = useState(null);

  const handleParagraphChange = (index, value) => {
    const newParagraphs = [...aboutContent.paragraphs];
    newParagraphs[index] = value;
    updateContent({ ...aboutContent, paragraphs: newParagraphs }, false);
    setHasChanges(true);
  };

  const addParagraph = () => {
    updateContent({
      ...aboutContent,
      paragraphs: [...aboutContent.paragraphs, '']
    }, false);
    setHasChanges(true);
  };

  const removeParagraph = (index) => {
    const newParagraphs = aboutContent.paragraphs.filter((_, i) => i !== index);
    updateContent({ ...aboutContent, paragraphs: newParagraphs }, false);
    setHasChanges(true);
  };

  const addMedia = (type) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = type === 'image' ? 'image/*' : 'video/*';
    
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (!file) return;
      
      const reader = new FileReader();
      reader.onload = (event) => {
        const newMedia = {
          id: `media-${Date.now()}`,
          type,
          url: event.target.result,
          title: file.name,
          position: selectedParagraphIndex !== null ? selectedParagraphIndex : aboutContent.paragraphs.length - 1
        };
        
        updateContent({
          ...aboutContent,
          media: [...aboutContent.media, newMedia]
        }, false);
        setHasChanges(true);
      };
      reader.readAsDataURL(file);
    };
    
    input.click();
  };

  const removeMedia = (id) => {
    const newMedia = aboutContent.media.filter(item => item.id !== id);
    updateContent({ ...aboutContent, media: newMedia }, false);
    setHasChanges(true);
  };
  
  const moveMediaUp = (id) => {
    const mediaIndex = aboutContent.media.findIndex(item => item.id === id);
    if (mediaIndex <= 0) return;
    
    const newMedia = [...aboutContent.media];
    const item = newMedia[mediaIndex];
    newMedia.splice(mediaIndex, 1);
    newMedia.splice(mediaIndex - 1, 0, item);
    
    updateContent({ ...aboutContent, media: newMedia }, false);
    setHasChanges(true);
  };
  
  const moveMediaDown = (id) => {
    const mediaIndex = aboutContent.media.findIndex(item => item.id === id);
    if (mediaIndex >= aboutContent.media.length - 1) return;
    
    const newMedia = [...aboutContent.media];
    const item = newMedia[mediaIndex];
    newMedia.splice(mediaIndex, 1);
    newMedia.splice(mediaIndex + 1, 0, item);
    
    updateContent({ ...aboutContent, media: newMedia }, false);
    setHasChanges(true);
  };
  
  const updateMediaPosition = (id, position) => {
    const newMedia = aboutContent.media.map(item => 
      item.id === id ? { ...item, position } : item
    );
    
    updateContent({ ...aboutContent, media: newMedia }, false);
    setHasChanges(true);
  };

  const updateContent = (newContent, saveToStorage = true) => {
    setAboutContent(newContent);
    if (saveToStorage) {
      editableContentStorage.save('aboutDesigner', newContent);
      changeTracker.trackChange('UPDATE_ABOUT_PAGE', {
        section: 'about',
        content: 'About page content updated'
      });
      setHasChanges(false);
    }
  };
  
  const saveChanges = () => {
    updateContent(aboutContent, true);
  };

  return (
    <div className="space-y-6">
      <Card className="bg-white border-neutral-200">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-xl font-medium text-neutral-900">
            {t('About the Designer')}
          </CardTitle>
          {hasChanges && (
            <Button
              onClick={saveChanges}
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              <Save size={16} className="mr-2" />
              {t('Save Changes')}
            </Button>
          )}
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-neutral-700">{t('Content')}</h3>
            
            {aboutContent.paragraphs.map((paragraph, index) => (
              <div key={index} className="relative group">
                <div className="flex items-center mb-2">
                  <h4 className="text-sm font-medium text-neutral-700">
                    {t('Paragraph')} {index + 1}
                  </h4>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => setSelectedParagraphIndex(index === selectedParagraphIndex ? null : index)}
                    className={`ml-2 h-6 px-2 ${
                      selectedParagraphIndex === index 
                        ? 'bg-neutral-200 text-neutral-800' 
                        : 'text-neutral-600'
                    }`}
                  >
                    {selectedParagraphIndex === index ? (
                      <><Check size={14} className="mr-1" />{t('Selected')}</>
                    ) : (
                      t('Select for Media')
                    )}
                  </Button>
                </div>
                <textarea
                  value={paragraph}
                  onChange={(e) => handleParagraphChange(index, e.target.value)}
                  className="w-full p-3 border border-neutral-300 rounded-md min-h-[100px] text-neutral-700"
                  placeholder={t('Enter paragraph text...')}
                />
                {aboutContent.paragraphs.length > 1 && (
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => removeParagraph(index)}
                    className="absolute top-8 right-2 h-8 w-8 p-0 bg-white/80 hover:bg-red-100"
                  >
                    <Trash2 className="h-4 w-4 text-red-600" />
                  </Button>
                )}
                
                {/* Media items positioned at this paragraph */}
                {aboutContent.media.filter(item => item.position === index).length > 0 && (
                  <div className="mt-2 p-2 bg-neutral-50 rounded-md border border-neutral-200">
                    <h5 className="text-xs font-medium text-neutral-500 mb-2">{t('Media attached to this paragraph:')}</h5>
                    <div className="flex flex-wrap gap-2">
                      {aboutContent.media
                        .filter(item => item.position === index)
                        .map(item => (
                          <div key={item.id} className="relative group">
                            {item.type === 'image' ? (
                              <img 
                                src={item.url} 
                                alt={item.title}
                                className="w-20 h-20 object-cover rounded-md border border-neutral-300"
                              />
                            ) : (
                              <video 
                                src={item.url}
                                className="w-20 h-20 object-cover rounded-md border border-neutral-300"
                                controls
                              />
                            )}
                            <div className="absolute top-1 right-1 flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => removeMedia(item.id)}
                                className="h-6 w-6 p-0 bg-white/80 hover:bg-red-100"
                              >
                                <Trash2 className="h-3 w-3 text-red-600" />
                              </Button>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
            
            <Button
              variant="outline"
              onClick={addParagraph}
              className="mt-2 text-neutral-700 border-neutral-300 hover:bg-neutral-100"
            >
              <Plus size={16} className="mr-2" />
              {t('Add Paragraph')}
            </Button>
          </div>
          
          <Separator className="my-6" />
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium text-neutral-700">{t('Media')}</h3>
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  onClick={() => addMedia('image')}
                  className="text-neutral-700 border-neutral-300 hover:bg-neutral-100"
                >
                  <Image size={16} className="mr-2" />
                  {t('Add Image')}
                </Button>
                <Button
                  variant="outline"
                  onClick={() => addMedia('video')}
                  className="text-neutral-700 border-neutral-300 hover:bg-neutral-100"
                >
                  <Film size={16} className="mr-2" />
                  {t('Add Video')}
                </Button>
              </div>
            </div>
            
            {aboutContent.media.length === 0 ? (
              <div className="text-center py-8 text-neutral-500">
                {t('No media added yet')}
              </div>
            ) : (
              <div className="space-y-4">
                <h4 className="text-sm font-medium text-neutral-700">{t('All Media')}</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {aboutContent.media.map((item) => (
                    <div key={item.id} className="relative group bg-white p-2 border border-neutral-200 rounded-md">
                      {item.type === 'image' ? (
                        <img 
                          src={item.url} 
                          alt={item.title}
                          className="w-full h-32 object-cover rounded-md mb-2"
                        />
                      ) : (
                        <video 
                          src={item.url}
                          className="w-full h-32 object-cover rounded-md mb-2"
                          controls
                        />
                      )}
                      <div className="flex items-center justify-between">
                        <select
                          value={item.position}
                          onChange={(e) => updateMediaPosition(item.id, parseInt(e.target.value))}
                          className="text-xs p-1 border border-neutral-300 rounded"
                        >
                          {aboutContent.paragraphs.map((_, idx) => (
                            <option key={idx} value={idx}>
                              {t('Paragraph')} {idx + 1}
                            </option>
                          ))}
                        </select>
                        <div className="flex space-x-1">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => moveMediaUp(item.id)}
                            className="h-6 w-6 p-0 text-neutral-500 hover:bg-neutral-100"
                            disabled={aboutContent.media.indexOf(item) === 0}
                          >
                            <ArrowUp className="h-3 w-3" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => moveMediaDown(item.id)}
                            className="h-6 w-6 p-0 text-neutral-500 hover:bg-neutral-100"
                            disabled={aboutContent.media.indexOf(item) === aboutContent.media.length - 1}
                          >
                            <ArrowDown className="h-3 w-3" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => removeMedia(item.id)}
                            className="h-6 w-6 p-0 text-neutral-500 hover:text-red-600 hover:bg-red-50"
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}