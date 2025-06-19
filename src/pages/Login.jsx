import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useTranslation } from 'react-i18next';
import { springConfig, useCardAnimation } from '@/services/animationHooks';
import { AnimatedCard } from '@/components/ui/animated-card';

const Login = ({ onClose }) => {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Replace with actual authentication logic
      if (email === 'admin@example.com' && password === 'admin123') {
        onClose();
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50">
      <div className="fixed inset-0 flex items-center justify-center">
        <AnimatedCard style={useCardAnimation(true)}>
          <Card className="w-full max-w-md">
            <CardHeader className="text-center">
              <CardTitle>{t('login.title')}</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin} className="space-y-4">
                <Input
                  type="email"
                  placeholder={t('login.email')}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loading}
                />
                <Input
                  type="password"
                  placeholder={t('login.password')}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={loading}
                />
                {error && (
                  <p className="text-red-500 text-sm">{error}</p>
                )}
                <Button type="submit" disabled={loading}>
                  {loading ? t('common.loading') : t('login.signIn')}
                </Button>
              </form>
            </CardContent>
          </Card>
        </AnimatedCard>
      </div>
    </div>
  );
};

export default Login;
