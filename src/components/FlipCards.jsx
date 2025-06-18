import { useTranslation } from 'react-i18next';
import './FlipCards.css';

export default function FlipCards() {
  const { t } = useTranslation();
  
  return (
    <div className="flip-wrapper">
      <div className="flip-container">
        <div className="flip flip-left">
          <div className="front front-left">
            <div className="circle"></div>
          </div>
          <div className="back back-left">
            <img src="https://drive.google.com/uc?id=1tpr7twQMFTss3kriJWfmwQhdZPM-F_8w" alt="Fashion design" />
          </div>
        </div>
      </div>
      <div className="flip-container">
        <div className="flip flip-right">
          <div className="front front-right">
            <div className="circle"></div>
          </div>
          <div className="back back-right">
            <img src="https://drive.google.com/uc?id=1tpr7twQMFTss3kriJWfmwQhdZPM-F_8w" alt="Fashion design" />
          </div>
        </div>
      </div>
      <div className="flip-text">
        <h3>{t('Fashion Design, Business, and Marketing')}</h3>
        <p>{t('Barcelona-based portfolio showcasing innovative designs and creative vision')}</p>
      </div>
    </div>
  );
}