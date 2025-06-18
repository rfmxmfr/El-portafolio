import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Masonry from 'react-masonry-css';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card.jsx';
import { Button } from '../ui/button.jsx';
import { Image, Plus, Trash2, Check } from 'lucide-react';

export default function ImageGridGallery({ 
  images = [], 
  onAddImage, 
  onDeleteImage, 
  onSelectImage,
  selectable = false,
  selectedImage = null
}) {
  const { t } = useTranslation();
  const [hoveredImage, setHoveredImage] = useState(null);
  
  const breakpointColumns = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1
  };
  
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;
    
    files.forEach(file => {
      if (!file.type.startsWith('image/')) return;
      
      const reader = new FileReader();
      reader.onload = (event) => {
        const newImage = {
          id: `img-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          url: event.target.result,
          name: file.name,
          type: file.type,
          size: file.size,
          date: new Date().toISOString()
        };
        
        onAddImage(newImage);
      };
      reader.readAsDataURL(file);
    });
    
    // Reset the input
    e.target.value = '';
  };
  
  return (
    <Card className="bg-white border-neutral-200">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-medium text-neutral-900">
          {t('Image Gallery')}
        </CardTitle>
        <div>
          <input
            type="file"
            id="gallery-upload"
            multiple
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
          <label htmlFor="gallery-upload">
            <Button
              as="span"
              className="bg-neutral-900 hover:bg-neutral-800 text-white cursor-pointer"
            >
              <Plus size={16} className="mr-2" />
              {t('Add Images')}
            </Button>
          </label>
        </div>
      </CardHeader>
      <CardContent>
        {images.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-40 bg-neutral-50 rounded-md border border-dashed border-neutral-300">
            <Image size={32} className="text-neutral-400 mb-2" />
            <p className="text-neutral-500">{t('No images uploaded yet')}</p>
            <p className="text-sm text-neutral-400 mt-1">{t('Upload images to get started')}</p>
          </div>
        ) : (
          <Masonry
            breakpointCols={breakpointColumns}
            className="flex -ml-4 w-auto"
            columnClassName="pl-4 bg-clip-padding"
          >
            {images.map((image) => (
              <div 
                key={image.id} 
                className={`mb-4 relative group ${
                  selectable && selectedImage === image.id ? 'ring-2 ring-neutral-900' : ''
                }`}
                onMouseEnter={() => setHoveredImage(image.id)}
                onMouseLeave={() => setHoveredImage(null)}
              >
                <img
                  src={image.url}
                  alt={image.name || 'Gallery image'}
                  className="w-full h-auto rounded-md"
                  onClick={() => selectable && onSelectImage && onSelectImage(image)}
                />
                
                {(hoveredImage === image.id || (selectable && selectedImage === image.id)) && (
                  <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center rounded-md">
                    {selectable ? (
                      <Button
                        onClick={() => onSelectImage && onSelectImage(image)}
                        className={`${
                          selectedImage === image.id 
                            ? 'bg-white text-neutral-900' 
                            : 'bg-neutral-900 text-white'
                        } hover:bg-neutral-800 hover:text-white`}
                        size="sm"
                      >
                        {selectedImage === image.id ? (
                          <>
                            <Check size={14} className="mr-1" />
                            {t('Selected')}
                          </>
                        ) : (
                          t('Select')
                        )}
                      </Button>
                    ) : (
                      <Button
                        onClick={() => onDeleteImage && onDeleteImage(image.id)}
                        className="bg-red-600 hover:bg-red-700 text-white"
                        size="sm"
                      >
                        <Trash2 size={14} className="mr-1" />
                        {t('Delete')}
                      </Button>
                    )}
                  </div>
                )}
              </div>
            ))}
          </Masonry>
        )}
      </CardContent>
    </Card>
  );
}