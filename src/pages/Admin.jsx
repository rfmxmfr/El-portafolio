import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import AdminLayout from '../components/admin/AdminLayout';
import CollectionDetail from '../components/admin/CollectionDetail';
import api from '../services/api';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card.jsx';
import { Button } from '../components/ui/button.jsx';
import { Badge } from '../components/ui/badge.jsx';
import { Separator } from '../components/ui/separator.jsx';
import { Plus } from 'lucide-react';
import CollectionForm from '../components/admin/CollectionForm';

export default function Admin() {
  const { t } = useTranslation();
  const [activeSection, setActiveSection] = useState('collections');
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showCollectionForm, setShowCollectionForm] = useState(false);
  const [selectedCollectionId, setSelectedCollectionId] = useState(null);

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        setLoading(true);
        const data = await api.getCollections();
        setCollections(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (activeSection === 'collections' && !selectedCollectionId) {
      fetchCollections();
    }
  }, [activeSection, selectedCollectionId]);

  const handleAddCollection = async (collectionData) => {
    try {
      const newCollection = await api.createCollection(collectionData);
      setCollections([...collections, newCollection]);
      setShowCollectionForm(false);
    } catch (err) {
      setError(err.message);
    }
  };

  const handlePublishToggle = async (id, currentStatus) => {
    try {
      let updatedCollection;
      if (currentStatus === 'published') {
        updatedCollection = await api.unpublishCollection(id);
      } else {
        updatedCollection = await api.publishCollection(id);
      }
      
      setCollections(collections.map(c => 
        c.id === id ? updatedCollection : c
      ));
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDeleteCollection = async (id) => {
    if (window.confirm(t('Are you sure you want to delete this collection?'))) {
      try {
        await api.deleteCollection(id);
        setCollections(collections.filter(c => c.id !== id));
      } catch (err) {
        setError(err.message);
      }
    }
  };

  const renderCollectionsContent = () => {
    if (selectedCollectionId) {
      return (
        <CollectionDetail 
          collectionId={selectedCollectionId} 
          onBack={() => setSelectedCollectionId(null)} 
        />
      );
    }

    return (
      <>
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-medium text-neutral-900">{t('All Collections')}</h3>
          <Button 
            onClick={() => setShowCollectionForm(true)}
            className="bg-neutral-900 hover:bg-neutral-800 text-white"
          >
            <Plus size={16} className="mr-2" />
            {t('New Collection')}
          </Button>
        </div>

        {showCollectionForm ? (
          <CollectionForm onSubmit={handleAddCollection} onCancel={() => setShowCollectionForm(false)} />
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {loading ? (
              <p className="text-neutral-600">{t('Loading collections...')}</p>
            ) : error ? (
              <p className="text-red-500">{error}</p>
            ) : collections.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-40 bg-neutral-50 rounded-md border border-dashed border-neutral-300">
                <p className="text-neutral-500 mb-2">{t('No collections found')}</p>
                <Button 
                  onClick={() => setShowCollectionForm(true)}
                  variant="outline"
                  className="text-neutral-700 border-neutral-300 hover:bg-neutral-100"
                >
                  <Plus size={16} className="mr-2" />
                  {t('Create Your First Collection')}
                </Button>
              </div>
            ) : (
              collections.map((collection) => (
                <Card key={collection.id} className="bg-white border-neutral-200">
                  <CardHeader className="flex flex-row items-start justify-between pb-2">
                    <div>
                      <CardTitle 
                        className="text-lg font-medium text-neutral-900 cursor-pointer hover:text-neutral-600"
                        onClick={() => setSelectedCollectionId(collection.id)}
                      >
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
                    <div className="flex items-center justify-between">
                      <div className="flex flex-wrap gap-2">
                        {collection.tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="bg-neutral-100 text-neutral-700">
                            {t(tag)}
                          </Badge>
                        ))}
                      </div>
                      <p className="text-sm text-neutral-500">
                        {collection.items} {t('items')}
                      </p>
                    </div>
                    <Separator className="my-4" />
                    <div className="flex justify-end space-x-2">
                      <Button 
                        variant="outline" 
                        className="text-neutral-700 border-neutral-300 hover:bg-neutral-100"
                        onClick={() => setSelectedCollectionId(collection.id)}
                      >
                        {t('View & Edit')}
                      </Button>
                      {collection.status === 'draft' ? (
                        <Button 
                          className="bg-neutral-900 hover:bg-neutral-800 text-white"
                          onClick={() => handlePublishToggle(collection.id, collection.status)}
                        >
                          {t('Publish')}
                        </Button>
                      ) : (
                        <Button 
                          variant="outline" 
                          className="text-neutral-700 border-neutral-300 hover:bg-neutral-100"
                          onClick={() => handlePublishToggle(collection.id, collection.status)}
                        >
                          {t('Unpublish')}
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        )}
      </>
    );
  };

  const renderDashboardContent = () => {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-white border-neutral-200">
          <CardHeader>
            <CardTitle className="text-lg font-medium text-neutral-900">{t('Total Collections')}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{collections.length}</p>
            <p className="text-sm text-neutral-500 mt-2">
              {collections.filter(c => c.status === 'published').length} {t('published')}
            </p>
          </CardContent>
        </Card>
        
        <Card className="bg-white border-neutral-200">
          <CardHeader>
            <CardTitle className="text-lg font-medium text-neutral-900">{t('Total Designs')}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">
              {collections.reduce((total, collection) => total + (collection.designs?.length || 0), 0)}
            </p>
            <p className="text-sm text-neutral-500 mt-2">
              {t('Across all collections')}
            </p>
          </CardContent>
        </Card>
        
        <Card className="bg-white border-neutral-200">
          <CardHeader>
            <CardTitle className="text-lg font-medium text-neutral-900">{t('Website Visits')}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">1,248</p>
            <p className="text-sm text-neutral-500 mt-2">
              +12% {t('from last month')}
            </p>
          </CardContent>
        </Card>
      </div>
    );
  };

  return (
    <AdminLayout activeSection={activeSection} setActiveSection={setActiveSection}>
      {activeSection === 'collections' && renderCollectionsContent()}
      {activeSection === 'dashboard' && renderDashboardContent()}
      {activeSection === 'designs' && <p className="text-neutral-600">{t('Design management coming soon')}</p>}
      {activeSection === 'users' && <p className="text-neutral-600">{t('User management coming soon')}</p>}
      {activeSection === 'settings' && <p className="text-neutral-600">{t('Settings coming soon')}</p>}
    </AdminLayout>
  );
}