import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import AdminLayout from '../components/admin/AdminLayout';
import CollectionDetail from '../components/admin/CollectionDetail';
import ChangeHistory from '../components/admin/ChangeHistory';
import EditableText from '../components/admin/EditableText';
import AboutEditor from '../components/admin/AboutEditor';
import DesignBoard from '../components/admin/DesignBoard';
import { lazy, Suspense } from 'react';
// Lazy load the ML Dashboard for better performance
const MLDashboard = lazy(() => import('../components/admin/MLDashboard'));
import apiClient from '../services/apiClient';
import { editableContentStorage, changeTracker } from '../lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card.jsx';
import { Button } from '../components/ui/button.jsx';
import { Badge } from '../components/ui/badge.jsx';
import { Separator } from '../components/ui/separator.jsx';
import { Plus } from 'lucide-react';
import CollectionForm from '../components/admin/CollectionForm';

export default function Admin() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const initialized = useRef(false);
  
  // Auto-login if not already logged in
  useEffect(() => {
    const user = localStorage.getItem('user');
    if (!user) {
      // Create mock admin user
      const mockUser = {
        _id: 'admin-bypass',
        username: 'admin',
        email: 'admin@example.com',
        role: 'admin',
        exp: Math.floor(Date.now() / 1000) + 86400 // 24 hour expiration
      };
      
      // Store in localStorage
      localStorage.setItem('user', JSON.stringify(mockUser));
      localStorage.setItem('token', `admin-bypass-token-${Date.now()}`);
      localStorage.setItem('lastActive', Date.now().toString());
    }
  }, [navigate]);
  
  // State for editable content - moved to the top to fix initialization error
  const [editableContent, setEditableContent] = useState(() => {
    const defaultContent = {
      designs: t('Design management coming soon'),
      users: t('User management coming soon'),
      settings: t('Settings coming soon')
    };
    return editableContentStorage.load('adminSections', defaultContent);
  });
  
  const [activeSection, setActiveSection] = useState('collections');
  const [collections, setCollections] = useState([
    {
      id: 'minimalist',
      title: 'Minimalist Essentials',
      description: 'Clean lines, neutral tones, and timeless silhouettes for the modern professional.',
      status: 'published',
      lastUpdated: '2025-06-15',
      items: 12,
      tags: ['Minimalist', 'Professional', 'Sustainable']
    },
    {
      id: 'maximalist',
      title: 'Vibrant Expression',
      description: 'Bold colors, dramatic textures, and statement pieces for the confident individual.',
      status: 'published',
      lastUpdated: '2025-06-10',
      items: 8,
      tags: ['Bold', 'Luxury', 'Statement']
    },
    {
      id: 'summer-draft',
      title: 'Summer Breeze',
      description: 'Light fabrics and airy silhouettes for the warm season.',
      status: 'draft',
      lastUpdated: '2025-06-01',
      items: 5,
      tags: ['Summer', 'Casual', 'Light']
    }
  ]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showCollectionForm, setShowCollectionForm] = useState(false);
  const [selectedCollectionId, setSelectedCollectionId] = useState(null);

  // Initialize editable content in localStorage if needed
  useEffect(() => {
    if (!initialized.current) {
      // Make sure the editable content is saved to localStorage on first load
      editableContentStorage.save('adminSections', editableContent);
      initialized.current = true;
    }
  }, [editableContent]);

  const handleAddCollection = async (collectionData) => {
    try {
      // For demo, just add to local state
      const newCollection = {
        ...collectionData,
        id: `collection-${Date.now()}`,
        status: 'draft',
        lastUpdated: new Date().toISOString().split('T')[0],
        items: 0
      };
      setCollections([...collections, newCollection]);
      setShowCollectionForm(false);
    } catch (err) {
      console.error('Error creating collection:', err);
      setError(t('Failed to create collection. Please try again.'));
    }
  };

  const handlePublishToggle = async (id, currentStatus) => {
    try {
      // For demo, just update local state
      const updatedCollections = collections.map(c => 
        c.id === id ? {...c, status: currentStatus === 'published' ? 'draft' : 'published'} : c
      );
      setCollections(updatedCollections);
    } catch (err) {
      console.error('Error toggling collection status:', err);
      const action = currentStatus === 'published' ? 'unpublish' : 'publish';
      setError(t(`Failed to ${action} collection. Please try again.`));
    }
  };

  const handleDeleteCollection = async (id) => {
    if (window.confirm(t('Are you sure you want to delete this collection?'))) {
      try {
        // For demo, just update local state
        setCollections(collections.filter(c => c.id !== id));
      } catch (err) {
        console.error('Error deleting collection:', err);
        setError(t('Failed to delete collection. Please try again.'));
      }
    }
  };

  const renderCollectionsContent = () => {
    if (selectedCollectionId) {
      const collection = collections.find(c => c.id === selectedCollectionId);
      return (
        <div className="space-y-4">
          <Button 
            onClick={() => setSelectedCollectionId(null)}
            variant="outline"
            className="mb-4"
          >
            ← {t('Back to Collections')}
          </Button>
          
          <Card className="bg-white border-neutral-200">
            <CardHeader>
              <CardTitle>{collection?.title || 'Collection Detail'}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{collection?.description}</p>
              <div className="flex flex-wrap gap-2 mt-4">
                {collection?.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="bg-neutral-100 text-neutral-700">
                    {t(tag)}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
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
                      <div className="flex items-center">
                        <EditableText
                          initialText={collection.title}
                          onSave={(text) => {
                            const updatedCollections = collections.map(c => 
                              c.id === collection.id ? {...c, title: text} : c
                            );
                            setCollections(updatedCollections);
                          }}
                          className="text-lg font-medium text-neutral-900 cursor-pointer hover:text-neutral-600"
                        />
                        <span className="ml-2 cursor-pointer" onClick={() => setSelectedCollectionId(collection.id)}>
                          →
                        </span>
                      </div>
                      <p className="text-sm text-neutral-500 mt-1">
                        {t('Last updated')}: {collection.lastUpdated}
                      </p>
                    </div>
                    <Badge className={collection.status === 'published' ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'}>
                      {collection.status === 'published' ? t('Published') : t('Draft')}
                    </Badge>
                  </CardHeader>
                  <CardContent>
                    <EditableText
                      initialText={collection.description}
                      onSave={(text) => {
                        const updatedCollections = collections.map(c => 
                          c.id === collection.id ? {...c, description: text} : c
                        );
                        setCollections(updatedCollections);
                      }}
                      className="text-neutral-600 mb-4"
                      multiline={true}
                    />
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
      <div className="space-y-8">
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
              <CardTitle className="text-lg font-medium text-neutral-900">{t('React Admin')}</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center">
              <p className="text-neutral-600 mb-4">{t('Try the alternative dashboard')}</p>
              <Button 
                onClick={() => window.location.href = '/admin-react'}
                className="bg-blue-500 hover:bg-blue-600 text-white"
              >
                {t('Open React Admin')}
              </Button>
            </CardContent>
          </Card>
          
          <Card className="bg-white border-neutral-200">
            <CardHeader>
              <CardTitle className="text-lg font-medium text-neutral-900">{t('Total Designs')}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">24</p>
              <p className="text-sm text-neutral-500 mt-2">
                +3 {t('this month')}
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
          
          <Card className="bg-white border-neutral-200">
            <CardHeader>
              <CardTitle className="text-lg font-medium text-neutral-900">{t('AI Generated Designs')}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">8</p>
              <p className="text-sm text-neutral-500 mt-2">
                +2 {t('this week')}
              </p>
            </CardContent>
          </Card>
        </div>
        
        <div>
          <h3 className="text-xl font-medium text-neutral-900 mb-4">{t('Activity')}</h3>
          <ChangeHistory />
        </div>
      </div>
    );
  };

  const handleContentUpdate = (section, newText) => {
    const updatedContent = {
      ...editableContent,
      [section]: newText
    };
    setEditableContent(updatedContent);
    editableContentStorage.save('adminSections', updatedContent);
    
    // Track this change
    changeTracker.trackChange('UPDATE_ADMIN_SECTION', {
      section,
      content: newText.substring(0, 50) + (newText.length > 50 ? '...' : '')
    });
  };

  return (
    <AdminLayout activeSection={activeSection} setActiveSection={setActiveSection}>
      {activeSection === 'collections' && renderCollectionsContent()}
      {activeSection === 'dashboard' && renderDashboardContent()}
      {activeSection === 'about' && (
        <div className="p-4">
          <AboutEditor />
        </div>
      )}
      {activeSection === 'designs' && (
        <div className="p-4">
          <DesignBoard />
        </div>
      )}
      {activeSection === 'ai' && (
        <div className="p-4">
          <Suspense fallback={
            <div className="animate-pulse space-y-4">
              <div className="h-8 bg-neutral-200 rounded w-1/4"></div>
              <div className="h-64 bg-neutral-100 rounded"></div>
            </div>
          }>
            <MLDashboard />
          </Suspense>
        </div>
      )}
      {activeSection === 'users' && (
        <div className="p-4">
          <EditableText
            initialText={editableContent.users}
            onSave={(text) => handleContentUpdate('users', text)}
            className="text-neutral-600"
            multiline={true}
          />
        </div>
      )}
      {activeSection === 'settings' && (
        <div className="p-4">
          <EditableText
            initialText={editableContent.settings}
            onSave={(text) => handleContentUpdate('settings', text)}
            className="text-neutral-600"
            multiline={true}
          />
        </div>
      )}
    </AdminLayout>
  );
}