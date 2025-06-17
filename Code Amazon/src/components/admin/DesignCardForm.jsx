import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '../ui/button.jsx';
import { Calendar, Paperclip, X, Check } from 'lucide-react';

export default function DesignCardForm({ onSubmit, onCancel }) {
  const { t } = useTranslation();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [attachments, setAttachments] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    
    onSubmit({
      title,
      description,
      dueDate: dueDate || null,
      attachments,
      createdAt: new Date().toISOString()
    });
    
    // Reset form
    setTitle('');
    setDescription('');
    setDueDate('');
    setAttachments([]);
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;
    
    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const newAttachment = {
          id: `attachment-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          name: file.name,
          type: file.type.startsWith('image/') ? 'image' : 'file',
          url: event.target.result,
          size: file.size
        };
        
        setAttachments(prev => [...prev, newAttachment]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeAttachment = (id) => {
    setAttachments(attachments.filter(a => a.id !== id));
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-2 rounded-md border border-neutral-300">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder={t('Enter card title...')}
        className="w-full p-2 mb-2 border border-neutral-300 rounded text-sm"
        autoFocus
      />
      
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder={t('Add a description...')}
        className="w-full p-2 mb-2 border border-neutral-300 rounded text-sm min-h-[60px]"
      />
      
      <div className="flex items-center mb-2">
        <div className="flex items-center mr-3">
          <Calendar size={14} className="mr-1 text-neutral-500" />
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="p-1 border border-neutral-300 rounded text-xs"
          />
        </div>
        
        <div className="relative">
          <input
            type="file"
            id="file-upload"
            multiple
            onChange={handleFileChange}
            className="hidden"
          />
          <label
            htmlFor="file-upload"
            className="flex items-center cursor-pointer text-xs bg-neutral-100 hover:bg-neutral-200 text-neutral-700 px-2 py-1 rounded"
          >
            <Paperclip size={14} className="mr-1" />
            {t('Attach')}
          </label>
        </div>
      </div>
      
      {attachments.length > 0 && (
        <div className="mb-3">
          <h5 className="text-xs font-medium text-neutral-700 mb-1">
            {t('Attachments')}
          </h5>
          <div className="space-y-1">
            {attachments.map((attachment) => (
              <div 
                key={attachment.id} 
                className="flex items-center justify-between text-xs p-1 bg-neutral-50 rounded"
              >
                <span className="truncate max-w-[180px]">{attachment.name}</span>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => removeAttachment(attachment.id)}
                  className="h-5 w-5 p-0 text-neutral-400 hover:text-red-600"
                >
                  <X size={12} />
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}
      
      <div className="flex justify-end space-x-2">
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={onCancel}
          className="text-neutral-600"
        >
          {t('Cancel')}
        </Button>
        <Button
          type="submit"
          size="sm"
          disabled={!title.trim()}
          className="bg-neutral-900 hover:bg-neutral-800 text-white"
        >
          <Check size={14} className="mr-1" />
          {t('Add')}
        </Button>
      </div>
    </form>
  );
}