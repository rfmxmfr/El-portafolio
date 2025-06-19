import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { LogIn } from 'lucide-react';
import { Button } from '../components/ui/button';
import apiClient from '../services/apiClient';
import '../components/FullPageFlip.css';
import './FlipLogin.css';

export default function FlipLogin() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [isFlipped, setIsFlipped] = useState(false);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      await apiClient.login(formData);
      navigate('/admin');
    } catch (err) {
      setError(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`full-page-flip ${isFlipped ? 'flipped' : ''}`}>
      <div className="flip-card">
        <div className="flip-card-inner">
          <div className="flip-card-front">
            <div className="content">
              <h1 className="title">{t('TANIA ATELIER')}</h1>
              <div className="circles">
                <div className="circle circle-1"></div>
                <div className="circle circle-2"></div>
              </div>
              <button 
                className="flip-button"
                onClick={() => setIsFlipped(true)}
              >
                {t('Admin Access')}
              </button>
            </div>
          </div>
          <div className="flip-card-back">
            <div className="content">
              <h1 className="login-title">{t('Admin Login')}</h1>
              
              <div className="login-form-container">
                {error && (
                  <div className="login-error">
                    {error}
                  </div>
                )}
                
                <form onSubmit={handleSubmit} className="login-form">
                  <div className="form-group">
                    <label htmlFor="email">{t('Email')}</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="admin@example.com"
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="password">{t('Password')}</label>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                      placeholder="••••••••"
                    />
                  </div>
                  
                  <div className="login-actions">
                    <Button 
                      type="submit" 
                      className="login-button"
                      disabled={loading}
                    >
                      <LogIn size={16} className="login-icon" />
                      {loading ? t('Logging in...') : t('Login')}
                    </Button>
                    
                    <button 
                      type="button"
                      className="back-button"
                      onClick={() => setIsFlipped(false)}
                    >
                      {t('Back')}
                    </button>
                  </div>
                </form>
                
                <div className="login-help">
                  <p>{t('Contact administrator for login credentials')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}