import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Draggable } from 'react-beautiful-dnd';
import { Card, CardContent } from '../ui/card.jsx';
import { Button } from '../ui/button.jsx';
import { Paperclip, Calendar, Trash2, Image, FileText } from 'lucide-react';

export default function DesignCard({ card, index, listId, onDelete }) {
  const { t } = useTranslation();
  const [showDetails, setShowDetails] = useState(false);

  const handleDelete = () => {
    if (window.confirm(t('Are you sure you want to delete this card?'))) {
      onDelete(listId, card.id);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  return (
    <Draggable draggableId={card.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="mb-2"
        >
          <Card 
            className={`bg-white border-neutral-200 hover:shadow-md transition-shadow ${
              snapshot.isDragging ? 'shadow-md' : ''
            }`}
          >
            <CardContent className="p-3">
              <div className="flex justify-between items-start">
                <h4 className="font-medium text-neutral-900 mb-2">{card.title}</h4>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={handleDelete}
                  className="h-6 w-6 p-0 text-neutral-400 hover:text-red-600 hover:bg-red-50"
                >
                  <Trash2 size={14} />
                </Button>
              </div>
              
              {card.description && (
                <p className="text-sm text-neutral-600 mb-2 line-clamp-2">
                  {card.description}
                </p>
              )}
              
              <div className="flex items-center justify-between mt-2">
                <div className="flex items-center space-x-2">
                  {card.dueDate && (
                    <div className="flex items-center text-xs text-neutral-500">
                      <Calendar size={12} className="mr-1" />
                      {formatDate(card.dueDate)}
                    </div>
                  )}
                  
                  {card.attachments && card.attachments.length > 0 && (
                    <div className="flex items-center text-xs text-neutral-500">
                      <Paperclip size={12} className="mr-1" />
                      {card.attachments.length}
                    </div>
                  )}
                </div>
                
                {(card.attachments && card.attachments.length > 0) && (
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => setShowDetails(!showDetails)}
                    className="h-6 p-1 text-xs text-neutral-500"
                  >
                    {showDetails ? t('Hide') : t('Show')}
                  </Button>
                )}
              </div>
              
              {showDetails && card.attachments && card.attachments.length > 0 && (
                <div className="mt-3 pt-3 border-t border-neutral-200">
                  <h5 className="text-xs font-medium text-neutral-700 mb-2">
                    {t('Attachments')}
                  </h5>
                  <div className="space-y-2">
                    {card.attachments.map((attachment) => (
                      <div 
                        key={attachment.id} 
                        className="flex items-center text-xs p-1 bg-neutral-50 rounded"
                      >
                        {attachment.type === 'image' ? (
                          <Image size={12} className="mr-2 text-neutral-500" />
                        ) : (
                          <FileText size={12} className="mr-2 text-neutral-500" />
                        )}
                        <span className="truncate flex-1">{attachment.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </Draggable>
  );
}