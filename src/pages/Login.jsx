import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card.jsx';
import { Button } from '../components/ui/button.jsx';
import { LogIn, AlertCircle } from 'lucide-react';
import apiClient, { loadingStates } from '../services/apiClient';

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

  // Use the global loading state
  useEffect(() => {
    setLoading(loadingStates.login);
  }, [loadingStates.login]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    try {
      // Check for demo credentials - only allow in development
      if (formData.email === 'rmonteiro' && formData.password === 'Junkie88' && 
          import.meta.env.MODE !== 'production') {
        // Store mock user data for demo purposes with expiration
        const mockUser = {
          _id: 'demo-admin-id',
          username: 'rmonteiro',
          email: 'rmonteiro',
          role: 'admin',
          exp: Math.floor(Date.now() / 1000) + 3600 // 1 hour expiration
        };
        
        localStorage.setItem('user', JSON.stringify(mockUser));
        localStorage.setItem('token', `demo-token-${Date.now()}`);
        localStorage.setItem('lastActive', Date.now().toString());
        
        // Navigate to admin dashboard
        navigate('/admin');
        return;
      }
      
      // Try regular API login if not using demo credentials
      await apiClient.login(formData);
      navigate('/admin');
    } catch (err) {
      console.error('Login error:', err);
      setError(err.message || 'Login failed');
      
      // Show more specific error messages based on status code
      if (err.statusCode === 429) {
        setError('Too many login attempts. Please try again later.');
      } else if (err.statusCode === 403) {
        setError('Account locked. Please contact support.');
      }
    }
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
                required
                className="w-full px-3 py-2 border border-neutral-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-neutral-500"
                placeholder="rmonteiro"
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
                required
                className="w-full px-3 py-2 border border-neutral-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-neutral-500"
                placeholder="••••••••"
              />
            </div>
            
            <Button 
              type="submit" 
              className="w-full bg-neutral-900 hover:bg-neutral-800 text-white"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {t('Logging in...')}
                </>
              ) : (
                <>
                  <LogIn size={16} className="mr-2" />
                  {t('Login')}
                </>
              )}
            </Button>
            
            <div className="text-center text-sm text-neutral-500 mt-4">
              <p>{t('Use rmonteiro / Junkie88')}</p>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}