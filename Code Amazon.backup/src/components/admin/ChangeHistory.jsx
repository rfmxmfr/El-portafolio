import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card.jsx';
import { Badge } from '../ui/badge.jsx';
import { Button } from '../ui/button.jsx';
import { Separator } from '../ui/separator.jsx';
import { History, Trash2 } from 'lucide-react';
import { changeTracker } from '../../lib/utils';

export default function ChangeHistory() {
  const { t } = useTranslation();
  const [changes, setChanges] = useState([]);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    // Get changes from the tracker
    setChanges(changeTracker.getChanges());
  }, [refreshKey]);

  const handleRefresh = () => {
    setRefreshKey(prev => prev + 1);
  };

  const handleClearHistory = () => {
    if (window.confirm(t('Are you sure you want to clear the change history?'))) {
      changeTracker.clearChanges();
      setChanges([]);
    }
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    }).format(date);
  };

  const getChangeTypeLabel = (type) => {
    switch (type) {
      case 'CREATE_COLLECTION':
        return { label: t('Collection Created'), color: 'bg-green-100 text-green-800' };
      case 'UPDATE_COLLECTION':
        return { label: t('Collection Updated'), color: 'bg-blue-100 text-blue-800' };
      case 'DELETE_COLLECTION':
        return { label: t('Collection Deleted'), color: 'bg-red-100 text-red-800' };
      case 'ADD_DESIGN':
        return { label: t('Design Added'), color: 'bg-purple-100 text-purple-800' };
      case 'REMOVE_DESIGN':
        return { label: t('Design Removed'), color: 'bg-amber-100 text-amber-800' };
      case 'UPDATE_ADMIN_SECTION':
        return { label: t('Content Updated'), color: 'bg-indigo-100 text-indigo-800' };
      case 'UPDATE_ABOUT_PAGE':
        return { label: t('About Page Updated'), color: 'bg-teal-100 text-teal-800' };
      default:
        return { label: t('Change'), color: 'bg-neutral-100 text-neutral-800' };
    }
  };

  const getChangeDescription = (change) => {
    const { type, details } = change;
    
    switch (type) {
      case 'CREATE_COLLECTION':
        return t('Created collection "{{title}}"', { title: details.title });
      case 'UPDATE_COLLECTION':
        return t('Updated collection "{{title}}" (changed: {{fields}})', { 
          title: details.title,
          fields: details.changes.join(', ')
        });
      case 'DELETE_COLLECTION':
        return t('Deleted collection "{{title}}"', { title: details.title });
      case 'ADD_DESIGN':
        return t('Added design "{{designTitle}}" to collection "{{collectionTitle}}"', { 
          designTitle: details.designTitle,
          collectionTitle: details.collectionTitle
        });
      case 'REMOVE_DESIGN':
        return t('Removed design "{{designTitle}}" from collection "{{collectionTitle}}"', { 
          designTitle: details.designTitle,
          collectionTitle: details.collectionTitle
        });
      case 'UPDATE_ADMIN_SECTION':
        return t('Updated content in {{section}} section: "{{content}}"', { 
          section: details.section,
          content: details.content
        });
      case 'UPDATE_ABOUT_PAGE':
        return t('Updated content in About page: {{content}}', { 
          content: details.content
        });
      default:
        return t('Unknown change');
    }
  };

  return (
    <Card className="bg-white border-neutral-200">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="flex items-center">
          <History size={18} className="mr-2 text-neutral-600" />
          <CardTitle className="text-lg font-medium text-neutral-900">
            {t('Change History')}
          </CardTitle>
        </div>
        <div className="flex space-x-2">
          <Button 
            variant="outline" 
            size="sm"
            className="text-neutral-700 border-neutral-300 hover:bg-neutral-100"
            onClick={handleRefresh}
          >
            {t('Refresh')}
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            className="text-red-700 border-red-300 hover:bg-red-50"
            onClick={handleClearHistory}
          >
            <Trash2 size={16} className="mr-1" />
            {t('Clear')}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {changes.length === 0 ? (
          <div className="text-center py-8 text-neutral-500">
            {t('No changes recorded yet')}
          </div>
        ) : (
          <div className="space-y-4">
            {changes.map((change, index) => {
              const typeInfo = getChangeTypeLabel(change.type);
              return (
                <div key={index} className="bg-neutral-50 p-3 rounded-md">
                  <div className="flex items-center justify-between mb-2">
                    <Badge className={typeInfo.color}>
                      {typeInfo.label}
                    </Badge>
                    <span className="text-xs text-neutral-500">
                      {formatTimestamp(change.timestamp)}
                    </span>
                  </div>
                  <p className="text-sm text-neutral-700">
                    {getChangeDescription(change)}
                  </p>
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
}