import { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { X, Upload, Image as ImageIcon } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card.jsx';
import { Button } from '../ui/button.jsx';
import FeatureLibrary from './FeatureLibrary';

export default function DesignForm({ onSubmit, onCancel, collectionId }) {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    details: []
  });
  const [detailInput, setDetailInput] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAddDetail = (e) => {
    e.preventDefault();
    if (detailInput.trim() && !formData.details.includes(detailInput.trim())) {
      setFormData(prev => ({
        ...prev,
        details: [...prev.details, detailInput.trim()]
      }));
      setDetailInput('');
    }
  };

  const handleSelectFeature = (feature) => {
    if (!formData.details.includes(feature)) {
      setFormData(prev => ({
        ...prev,
        details: [...prev.details, feature]
      }));
    }
  };

  const handleRemoveDetail = (detailToRemove) => {
    setFormData(prev => ({
      ...prev,
      details: prev.details.filter(detail => detail !== detailToRemove)
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      processFile(file);
    }
  };

  const processFile = (file) => {
    setImageFile(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isDragging) {
      setIsDragging(true);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      if (file.type.startsWith('image/')) {
        processFile(file);
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.title.trim() && formData.description.trim()) {
      // In a real app, we would upload the image to a server
      // For this demo, we'll just use the preview URL
      onSubmit({
        ...formData,
        collectionId,
        imageUrl: imagePreview || '/placeholder-image.jpg'
      });
    }
  };

  return (
    <Card className="bg-white border-neutral-200">
      <CardHeader>
        <CardTitle className="text-lg font-medium text-neutral-900">{t('Add New Design')}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-neutral-700 mb-1">
              {t('Design Title')}*
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-neutral-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-neutral-500"
              placeholder={t('Enter design title')}
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
              rows={3}
              className="w-full px-3 py-2 border border-neutral-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-neutral-500"
              placeholder={t('Enter design description')}
            />
          </div>
          
          <div>
            <label htmlFor="image" className="block text-sm font-medium text-neutral-700 mb-1">
              {t('Design Image')}*
            </label>
            <input
              type="file"
              id="image"
              ref={fileInputRef}
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
            <div
              className={`border-2 border-dashed rounded-md p-6 text-center cursor-pointer transition-colors ${
                isDragging 
                  ? 'border-neutral-500 bg-neutral-50' 
                  : imagePreview 
                    ? 'border-green-300 bg-green-50' 
                    : 'border-neutral-300 hover:border-neutral-400'
              }`}
              onClick={() => fileInputRef.current.click()}
              onDragEnter={handleDragEnter}
              onDragLeave={handleDragLeave}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
            >
              {imagePreview ? (
                <div className="space-y-2">
                  <img 
                    src={imagePreview} 
                    alt="Design preview" 
                    className="max-h-40 mx-auto rounded-md"
                  />
                  <p className="text-sm text-green-600">{t('Image uploaded')}</p>
                  <p className="text-xs text-neutral-500">{t('Click or drag to replace')}</p>
                </div>
              ) : (
                <div className="space-y-2">
                  <ImageIcon className="h-12 w-12 mx-auto text-neutral-400" />
                  <p className="text-neutral-600">{t('Drag and drop an image here, or click to select')}</p>
                  <p className="text-xs text-neutral-500">{t('Supports: JPG, PNG, GIF')}</p>
                </div>
              )}
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-3">
              {t('Key Features')}
            </label>
            <FeatureLibrary onSelectFeature={handleSelectFeature} />
            
            <div className="mt-4">
              <div className="flex">
                <input
                  type="text"
                  id="details"
                  value={detailInput}
                  onChange={(e) => setDetailInput(e.target.value)}
                  className="flex-1 px-3 py-2 border border-neutral-300 rounded-l-md text-sm focus:outline-none focus:ring-2 focus:ring-neutral-500"
                  placeholder={t('Add a custom feature')}
                />
                <button
                  type="button"
                  onClick={handleAddDetail}
                  className="px-4 py-2 bg-neutral-200 text-neutral-700 rounded-r-md hover:bg-neutral-300 transition-colors"
                >
                  {t('Add')}
                </button>
              </div>
              
              {formData.details.length > 0 && (
                <div className="mt-3">
                  <h4 className="text-sm font-medium text-neutral-700 mb-2">{t('Selected Features:')}</h4>
                  <ul className="space-y-1">
                    {formData.details.map((detail, index) => (
                      <li 
                        key={index}
                        className="flex items-center justify-between px-3 py-2 bg-neutral-50 rounded-md"
                      >
                        <span className="text-neutral-700">{detail}</span>
                        <button 
                          type="button" 
                          onClick={() => handleRemoveDetail(detail)}
                          className="text-neutral-500 hover:text-neutral-700"
                        >
                          <X size={16} />
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
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
              disabled={!imagePreview}
              className="bg-neutral-900 hover:bg-neutral-800 text-white"
            >
              {t('Add Design')}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}