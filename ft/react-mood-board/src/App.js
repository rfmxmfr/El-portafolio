import React from 'react';
import './style.css';
import { AdminProvider, useAdmin } from './context/AdminContext';
import AdminDashboard from './components/AdminDashboard';
import AdminLogin from './components/AdminLogin';
import MoodBoard from './components/MoodBoard';
import HomePage from './components/HomePage';

function App() {
  const [isLoginOpen, setIsLoginOpen] = React.useState(false);
  const [isAdminDashboardOpen, setIsAdminDashboardOpen] = React.useState(false);
  const { isAdmin } = useAdmin();

  const handleAdminClick = () => {
    if (!isAdmin) {
      setIsLoginOpen(true);
    } else {
      setIsAdminDashboardOpen(true);
    }
  };

  return (
    <AdminProvider>
      <div className="app">
        <HomePage />
        {isAdminDashboardOpen && (
          <AdminDashboard onClose={() => setIsAdminDashboardOpen(false)} />
        )}
        {isLoginOpen && (
          <AdminLogin onClose={() => setIsLoginOpen(false)} />
        )}
        <MoodBoard onAdminClick={handleAdminClick} />
      </div>
    </AdminProvider>
  );
}

export default App;
