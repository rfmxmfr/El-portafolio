import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from './ui/button';
import './FullPageFlip.css';

export default function FullPageFlip({ onExplore }) {
  const { t } = useTranslation();
  const [isFlipped, setIsFlipped] = useState(false);
  
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
                {t('Discover')}
              </button>
            </div>
          </div>
          <div className="flip-card-back">
            <div className="content">
              <h1 className="title">{t('Fashion Design')}</h1>
              <h2 className="subtitle">{t('Portfolio')}</h2>
              <p className="description">
                {t('Crafting contemporary fashion with a focus on sustainable materials, innovative silhouettes, and timeless elegance. Each piece tells a story of modern sophistication and conscious design.')}
              </p>
              <div className="actions">
                <Button 
                  onClick={onExplore}
                  className="explore-button"
                >
                  {t('Explore Collections')}
                </Button>
                <button 
                  className="back-button"
                  onClick={() => setIsFlipped(false)}
                >
                  {t('Back')}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}