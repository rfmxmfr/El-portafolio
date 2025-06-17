import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  ArrowLeft, 
  Plus, 
  Pencil, 
  Trash2, 
  Upload, 
  Download,
  Image
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card.jsx';
import { Button } from '../ui/button.jsx';
import { Badge } from '../ui/badge.jsx';
import { Separator } from '../ui/separator.jsx';
import DesignForm from './DesignForm';
import api from '../../services/api';

export default function CollectionDetail({ collectionId, onBack }) {
  const { t } = useTranslation();
  const [collection, setCollection] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showDesignForm, setShowDesignForm] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    tags: []
  });

  useEffect(() => {
    const fetchCollection = async () => {
      try {
        setLoading(true);
        const data = await api.getCollectionById(collectionId);
        setCollection(data);
        setFormData({
          title: data.title,
          description: data.description,
          tags: [...data.tags]
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCollection();
  }, [collectionId]);

  const handleAddDesign = async (designData) => {
    try {
      const updatedCollection = await api.addDesignToCollection(collectionId, designData);
      setCollection(updatedCollection);
      setShowDesignForm(false);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleRemoveDesign = async (designId) => {
    if (window.confirm(t('Are you sure you want to remove this design?'))) {
      try {
        const updatedCollection = await api.removeDesignFromCollection(collectionId, designId);
        setCollection(updatedCollection);
      } catch (err) {
        setError(err.message);
      }
    }
  };

  const handleUpdateCollection = async (e) => {
    e.preventDefault();
    try {
      const updatedCollection = await api.updateCollection(collectionId, formData);
      setCollection(updatedCollection);
      setEditMode(false);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleTagChange = (e) => {
    const tags = e.target.value.split(',').map(tag => tag.trim()).filter(Boolean);
    setFormData(prev => ({ ...prev, tags }));
  };

  const handlePublishToggle = async () => {
    try {
      let updatedCollection;
      if (collection.status === 'published') {
        updatedCollection = await api.unpublishCollection(collectionId);
      } else {
        updatedCollection = await api.publishCollection(collectionId);
      }
      setCollection(updatedCollection);
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-neutral-600">{t('Loading collection...')}</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <p className="text-red-500 mb-4">{error}</p>
        <Button onClick={onBack} variant="outline">
          <ArrowLeft size={16} className="mr-2" />
          {t('Back to Collections')}
        </Button>
      </div>
    );
  }

  if (!collection) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <p className="text-neutral-600 mb-4">{t('Collection not found')}</p>
        <Button onClick={onBack} variant="outline">
          <ArrowLeft size={16} className="mr-2" />
          {t('Back to Collections')}
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Button onClick={onBack} variant="outline" className="text-neutral-700 border-neutral-300 hover:bg-neutral-100">
          <ArrowLeft size={16} className="mr-2" />
          {t('Back to Collections')}
        </Button>
        <div className="flex space-x-2">
          <Button 
            onClick={() => setEditMode(!editMode)} 
            variant="outline"
            className="text-neutral-700 border-neutral-300 hover:bg-neutral-100"
          >
            <Pencil size={16} className="mr-2" />
            {editMode ? t('Cancel Edit') : t('Edit Collection')}
          </Button>
          <Button 
            onClick={handlePublishToggle}
            className={collection.status === 'published' 
              ? "bg-amber-500 hover:bg-amber-600 text-white" 
              : "bg-green-600 hover:bg-green-700 text-white"}
          >
            {collection.status === 'published' 
              ? <><Download size={16} className="mr-2" />{t('Unpublish')}</>
              : <><Upload size={16} className="mr-2" />{t('Publish')}</>}
          </Button>
        </div>
      </div>

      {editMode ? (
        <Card className="bg-white border-neutral-200">
          <CardHeader>
            <CardTitle className="text-lg font-medium text-neutral-900">{t('Edit Collection')}</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleUpdateCollection} className="space-y-4">
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
                />
              </div>
              
              <div>
                <label htmlFor="tags" className="block text-sm font-medium text-neutral-700 mb-1">
                  {t('Tags')} ({t('comma separated')})
                </label>
                <input
                  type="text"
                  id="tags"
                  value={formData.tags.join(', ')}
                  onChange={handleTagChange}
                  className="w-full px-3 py-2 border border-neutral-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-neutral-500"
                />
              </div>
              
              <div className="flex justify-end space-x-2 pt-4">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setEditMode(false)}
                  className="text-neutral-700 border-neutral-300 hover:bg-neutral-100"
                >
                  {t('Cancel')}
                </Button>
                <Button 
                  type="submit" 
                  className="bg-neutral-900 hover:bg-neutral-800 text-white"
                >
                  {t('Save Changes')}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      ) : (
        <Card className="bg-white border-neutral-200">
          <CardHeader className="flex flex-row items-start justify-between pb-2">
            <div>
              <CardTitle className="text-2xl font-medium text-neutral-900">
                {collection.title}
              </CardTitle>
              <p className="text-sm text-neutral-500 mt-1">
                {t('Last updated')}: {collection.lastUpdated}
              </p>
            </div>
            <Badge className={collection.status === 'published' ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'}>
              {collection.status === 'published' ? t('Published') : t('Draft')}
            </Badge>
          </CardHeader>
          <CardContent>
            <p className="text-neutral-600 mb-4">{collection.description}</p>
            <div className="flex flex-wrap gap-2 mb-4">
              {collection.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="bg-neutral-100 text-neutral-700">
                  {t(tag)}
                </Badge>
              ))}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div>
                <h3 className="text-lg font-medium text-neutral-900 mb-3">{t('Mood Board')}</h3>
                <div className="border border-neutral-200 rounded-md p-2 bg-neutral-50">
                  {collection.moodBoardUrl ? (
                    <img 
                      src={collection.moodBoardUrl} 
                      alt="Mood board" 
                      className="w-full rounded-md"
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center h-40 bg-neutral-100 rounded-md">
                      <Image size={32} className="text-neutral-400 mb-2" />
                      <p className="text-neutral-500 text-sm">{t('No mood board uploaded')}</p>
                    </div>
                  )}
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-neutral-900 mb-3">{t('Design Sketch')}</h3>
                <div className="border border-neutral-200 rounded-md p-2 bg-neutral-50">
                  {collection.sketchUrl ? (
                    <img 
                      src={collection.sketchUrl} 
                      alt="Design sketch" 
                      className="w-full rounded-md"
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center h-40 bg-neutral-100 rounded-md">
                      <Image size={32} className="text-neutral-400 mb-2" />
                      <p className="text-neutral-500 text-sm">{t('No sketch uploaded')}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="mt-8">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-medium text-neutral-900">{t('Designs')}</h3>
          <Button 
            onClick={() => setShowDesignForm(true)}
            className="bg-neutral-900 hover:bg-neutral-800 text-white"
          >
            <Plus size={16} className="mr-2" />
            {t('Add Design')}
          </Button>
        </div>

        {showDesignForm ? (
          <DesignForm 
            onSubmit={handleAddDesign} 
            onCancel={() => setShowDesignForm(false)} 
            collectionId={collectionId}
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {collection.designs && collection.designs.length > 0 ? (
              collection.designs.map((design) => (
                <Card key={design.id} className="bg-white border-neutral-200">
                  <CardHeader>
                    <CardTitle className="text-lg font-medium text-neutral-900">
                      {design.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-4">
                      <img 
                        src={design.imageUrl} 
                        alt={design.title}
                        className="w-full h-48 object-contain bg-neutral-50 rounded-md border border-neutral-200"
                      />
                    </div>
                    <p className="text-neutral-600 mb-4">{design.description}</p>
                    
                    {design.details && design.details.length > 0 && (
                      <div className="mb-4">
                        <h4 className="font-medium text-neutral-800 mb-2">{t('Key Features')}</h4>
                        <ul className="space-y-1">
                          {design.details.map((detail, index) => (
                            <li key={index} className="flex items-center text-neutral-600">
                              <div className="w-1.5 h-1.5 bg-neutral-400 rounded-full mr-2"></div>
                              {detail}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    
                    <div className="flex justify-end">
                      <Button 
                        variant="outline" 
                        className="text-red-600 border-red-200 hover:bg-red-50"
                        onClick={() => handleRemoveDesign(design.id)}
                      >
                        <Trash2 size={16} className="mr-2" />
                        {t('Remove')}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="col-span-2 flex flex-col items-center justify-center h-40 bg-neutral-50 rounded-md border border-dashed border-neutral-300">
                <p className="text-neutral-500 mb-2">{t('No designs added yet')}</p>
                <Button 
                  onClick={() => setShowDesignForm(true)}
                  variant="outline"
                  className="text-neutral-700 border-neutral-300 hover:bg-neutral-100"
                >
                  <Plus size={16} className="mr-2" />
                  {t('Add Your First Design')}
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}