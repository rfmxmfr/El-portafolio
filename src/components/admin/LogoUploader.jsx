import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Upload, X } from 'lucide-react';
import { Button } from '../ui/button.jsx';

export default function LogoUploader({ onUpload }) {
  const { t } = useTranslation();
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [error, setError] = useState('');
  
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    // Validate file type
    const validTypes = ['image/png', 'image/jpeg', 'image/svg+xml'];
    if (!validTypes.includes(file.type)) {
      setError(t('Please select a PNG, JPEG, or SVG file'));
      return;
    }
    
    // Validate file size (max 2MB)
    if (file.size > 2 * 1024 * 1024) {
      setError(t('Logo must be less than 2MB'));
      return;
    }
    
    setSelectedFile(file);
    setPreviewUrl(URL.createObjectURL(file));
    setError('');
  };
  
  const handleUpload = () => {
    if (!selectedFile) return;
    
    // Generate a unique ID for the logo
    const logoId = `logo-${Date.now()}`;
    
    onUpload({
      id: logoId,
      file: selectedFile,
      url: previewUrl,
      type: 'logo'
    });
    
    // Reset the uploader
    setSelectedFile(null);
    setPreviewUrl('');
  };
  
  const handleClear = () => {
    setSelectedFile(null);
    setPreviewUrl('');
    setError('');
  };
  
  return (
    <div className="space-y-4">
      <div className={`border-2 border-dashed rounded-md p-4 text-center ${error ? 'border-red-300' : 'border-neutral-300'}`}>
        {previewUrl ? (
          <div className="relative">
            <img 
              src={previewUrl} 
              alt="Logo preview" 
              className="max-h-32 mx-auto"
            />
            <button
              type="button"
              onClick={handleClear}
              className="absolute top-0 right-0 bg-neutral-800 text-white rounded-full p-1"
            >
              <X size={16} />
            </button>
          </div>
        ) : (
          <>
            <input
              type="file"
              id="logo-upload"
              className="hidden"
              accept="image/png,image/jpeg,image/svg+xml"
              onChange={handleFileChange}
            />
            <label htmlFor="logo-upload" className="cursor-pointer block">
              <Upload className="mx-auto text-neutral-400 mb-2" size={32} />
              <p className="text-sm text-neutral-600">{t('Click to upload logo')}</p>
              <p className="text-xs text-neutral-500 mt-1">{t('PNG, JPEG, or SVG (max 2MB)')}</p>
            </label>
          </>
        )}
      </div>
      
      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}
      
      {previewUrl && (
        <Button
          type="button"
          onClick={handleUpload}
          className="w-full bg-neutral-900 hover:bg-neutral-800 text-white"
        >
          {t('Add Logo to Collection')}
        </Button>
      )}
    </div>
  );
}