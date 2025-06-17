import React from 'react';
import { useTranslation } from 'react-i18next';
import { Badge } from '../../ui/badge';
import { ImageIcon } from 'lucide-react';

const SimilarItems = ({ items }) => {
  const { t } = useTranslation();
  
  if (!items || items.length === 0) return null;
  
  return (
    <div className="p-4 border-t border-neutral-200">
      <h5 className="font-medium text-neutral-900 mb-2">{t('Similar Items')}</h5>
      <div className="space-y-2">
        {items.map((rec) => (
          <div key={rec.id} className="flex items-center">
            <div className="w-8 h-8 bg-neutral-200 rounded-full flex items-center justify-center mr-2">
              <ImageIcon size={16} />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium">{rec.recommended_item_details.title}</p>
              <p className="text-xs text-neutral-500">{rec.recommendation_reason}</p>
            </div>
            <Badge className="bg-neutral-100 text-neutral-800">
              {Math.round(rec.similarity_score * 100)}%
            </Badge>
          </div>
        ))}
      </div>
    </div>
  );
};

// Use React.memo to prevent unnecessary re-renders
export default React.memo(SimilarItems, (prevProps, nextProps) => {
  if (!prevProps.items && !nextProps.items) return true;
  if (!prevProps.items || !nextProps.items) return false;
  if (prevProps.items.length !== nextProps.items.length) return false;
  
  // Compare item IDs to determine if they're the same
  return prevProps.items.every((item, index) => 
    item.id === nextProps.items[index].id &&
    item.similarity_score === nextProps.items[index].similarity_score
  );
});