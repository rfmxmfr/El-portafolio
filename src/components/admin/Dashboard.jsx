import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  LayoutDashboard, 
  Shirt, 
  PenTool, 
  Settings, 
  Users, 
  LogOut,
  Plus,
  Search
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card.jsx';
import { Button } from '../ui/button.jsx';
import { Badge } from '../ui/badge.jsx';
import { Separator } from '../ui/separator.jsx';
import CollectionForm from './CollectionForm';

export default function AdminDashboard() {
  const { t } = useTranslation();
  const [activeSection, setActiveSection] = useState('collections');
  const [showCollectionForm, setShowCollectionForm] = useState(false);
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

  const sidebarItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'collections', label: 'Collections', icon: Shirt },
    { id: 'designs', label: 'Designs', icon: PenTool },
    { id: 'users', label: 'Users', icon: Users },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const handleAddCollection = (newCollection) => {
    setCollections([...collections, {
      ...newCollection,
      id: newCollection.title.toLowerCase().replace(/\\s+/g, '-'),
      status: 'draft',
      lastUpdated: new Date().toISOString().split('T')[0],
      items: 0
    }]);
    setShowCollectionForm(false);
  };

  return (
    <div className="flex h-screen bg-neutral-50">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-neutral-200 flex flex-col">
        <div className="p-4 border-b border-neutral-200">
          <h1 className="text-xl font-bold text-neutral-900">{t('ATELIER ADMIN')}</h1>
        </div>
        <div className="flex-1 overflow-auto py-4">
          <nav className="space-y-1 px-2">
            {sidebarItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className={`flex items-center w-full px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    activeSection === item.id
                      ? 'bg-neutral-900 text-white'
                      : 'text-neutral-600 hover:bg-neutral-100'
                  }`}
                >
                  <Icon size={18} className="mr-3" />
                  {t(item.label)}
                </button>
              );
            })}
          </nav>
        </div>
        <div className="p-4 border-t border-neutral-200">
          <button className="flex items-center w-full px-3 py-2 rounded-md text-sm font-medium text-neutral-600 hover:bg-neutral-100 transition-colors">
            <LogOut size={18} className="mr-3" />
            {t('Logout')}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white border-b border-neutral-200 p-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-medium text-neutral-900">
              {activeSection === 'collections' && t('Collections Management')}
              {activeSection === 'dashboard' && t('Dashboard Overview')}
              {activeSection === 'designs' && t('Design Library')}
              {activeSection === 'users' && t('User Management')}
              {activeSection === 'settings' && t('System Settings')}
            </h2>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400" size={16} />
                <input
                  type="text"
                  placeholder={t('Search...')}
                  className="pl-10 pr-4 py-2 border border-neutral-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-neutral-500"
                />
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-full bg-neutral-300 flex items-center justify-center text-neutral-700 font-medium">
                  A
                </div>
                <span className="text-sm font-medium text-neutral-700">Admin</span>
              </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-auto p-6 bg-neutral-50">
          {activeSection === 'collections' && (
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
                  {collections.map((collection) => (
                    <Card key={collection.id} className="bg-white border-neutral-200">
                      <CardHeader className="flex flex-row items-start justify-between pb-2">
                        <div>
                          <CardTitle className="text-lg font-medium text-neutral-900">
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
                          <Button variant="outline" className="text-neutral-700 border-neutral-300 hover:bg-neutral-100">
                            {t('Edit')}
                          </Button>
                          {collection.status === 'draft' ? (
                            <Button className="bg-neutral-900 hover:bg-neutral-800 text-white">
                              {t('Publish')}
                            </Button>
                          ) : (
                            <Button variant="outline" className="text-neutral-700 border-neutral-300 hover:bg-neutral-100">
                              {t('Unpublish')}
                            </Button>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </>
          )}

          {activeSection === 'dashboard' && (
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
            </div>
          )}
        </main>
      </div>
    </div>
  );
}