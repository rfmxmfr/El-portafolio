import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent } from 'react-admin';
import { Card as UICard, CardContent as UICardContent, CardHeader, CardTitle } from '../../../ui/card';
import api from '../../../../services/api';
import ChangeHistory from '../../ChangeHistory';

export const Dashboard = () => {
  const { t } = useTranslation();
  const [collections, setCollections] = useState([]);
  const [designs, setDesigns] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const collectionsData = await api.getCollections();
        const designsData = await api.getDesigns();
        
        setCollections(collectionsData);
        setDesigns(designsData);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);
  
  if (loading) {
    return <div>{t('Loading...')}</div>;
  }
  
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <UICard className="bg-white border-neutral-200">
          <CardHeader>
            <CardTitle className="text-lg font-medium text-neutral-900">{t('Total Collections')}</CardTitle>
          </CardHeader>
          <UICardContent>
            <p className="text-3xl font-bold">{collections.length}</p>
            <p className="text-sm text-neutral-500 mt-2">
              {collections.filter(c => c.status === 'published').length} {t('published')}
            </p>
          </UICardContent>
        </UICard>
        
        <UICard className="bg-white border-neutral-200">
          <CardHeader>
            <CardTitle className="text-lg font-medium text-neutral-900">{t('Total Designs')}</CardTitle>
          </CardHeader>
          <UICardContent>
            <p className="text-3xl font-bold">{designs.length}</p>
            <p className="text-sm text-neutral-500 mt-2">
              {t('Across all collections')}
            </p>
          </UICardContent>
        </UICard>
        
        <UICard className="bg-white border-neutral-200">
          <CardHeader>
            <CardTitle className="text-lg font-medium text-neutral-900">{t('Website Visits')}</CardTitle>
          </CardHeader>
          <UICardContent>
            <p className="text-3xl font-bold">1,248</p>
            <p className="text-sm text-neutral-500 mt-2">
              +12% {t('from last month')}
            </p>
          </UICardContent>
        </UICard>
      </div>
      
      <div>
        <h3 className="text-xl font-medium text-neutral-900 mb-4">{t('Activity')}</h3>
        <ChangeHistory />
      </div>
    </div>
  );
};