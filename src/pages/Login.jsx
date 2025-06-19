import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card.jsx';
import { Button } from '../components/ui/button.jsx';
import { LogIn, AlertCircle } from 'lucide-react';

export default function Login() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Auto-login function
  const autoLogin = () => {
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
    
    // Navigate to admin dashboard
    navigate('/admin');
  };

  // Add button to bypass login
  const handleBypass = (e) => {
    e.preventDefault();
    autoLogin();
  };

  // Regular form submission - now also just bypasses
  const handleSubmit = (e) => {
    e.preventDefault();
    autoLogin();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-neutral-50 to-neutral-100 px-4">
      <Card className="w-full max-w-md bg-white/80 backdrop-blur-sm border-neutral-200">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-medium text-neutral-900">{t('Admin Login')}</CardTitle>
        </CardHeader>
        <CardContent>
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-md text-sm">
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-1">
                {t('Email')}
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-neutral-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-neutral-500"
                placeholder="email@example.com"
              />
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-neutral-700 mb-1">
                {t('Password')}
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-neutral-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-neutral-500"
                placeholder="••••••••"
              />
            </div>
            
            <Button 
              type="submit" 
              className="w-full bg-neutral-900 hover:bg-neutral-800 text-white"
            >
              <LogIn size={16} className="mr-2" />
              {t('Login')}
            </Button>
            
            <Button 
              onClick={handleBypass}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white mt-2"
            >
              {t('Enter Dashboard')}
            </Button>
            
            <div className="text-center text-sm text-neutral-500 mt-4">
              <p>{t('Click "Enter Dashboard" to bypass login')}</p>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}