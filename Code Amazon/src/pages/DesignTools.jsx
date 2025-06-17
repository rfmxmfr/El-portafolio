import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

// Import components with correct paths
const CanvaFeaturesPage = React.lazy(() => import('../../CanvaFeaturesPage'));
const MoodBoardComponent = React.lazy(() => import('../../MoodBoardComponent'));

function DesignTools() {
  const [activeTab, setActiveTab] = useState('features');
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-neutral-200">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-neutral-900">Design Tools</h1>
            <div className="flex space-x-4">
              <Button 
                onClick={() => setActiveTab('features')}
                variant={activeTab === 'features' ? 'default' : 'outline'}
                className={activeTab === 'features' ? 'bg-neutral-900 text-white' : ''}
              >
                Features
              </Button>
              <Button 
                onClick={() => setActiveTab('moodboard')}
                variant={activeTab === 'moodboard' ? 'default' : 'outline'}
                className={activeTab === 'moodboard' ? 'bg-neutral-900 text-white' : ''}
              >
                Mood Board
              </Button>
              <Button 
                onClick={() => navigate('/')}
                variant="outline"
              >
                Back to Portfolio
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-20">
        <React.Suspense fallback={<div className="flex justify-center items-center h-[60vh]">Loading...</div>}>
          {activeTab === 'features' && <CanvaFeaturesPage />}
          {activeTab === 'moodboard' && <MoodBoardComponent />}
        </React.Suspense>
      </main>
    </div>
  );
}

export default DesignTools;