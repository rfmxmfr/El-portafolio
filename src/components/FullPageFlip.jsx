import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { springConfig, useCardAnimation } from '@/services/springConfig';
import AnimatedCard from '@/components/ui/animated-card';

const FullPageFlip = ({ frontContent, backContent, onFlip }) => {
  const { t } = useTranslation();
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
    onFlip?.(!isFlipped);
  };

  return (
    <AnimatedCard
      style={useCardAnimation(true)}
      className={`transform transition-transform duration-500 ${isFlipped ? 'rotate-y-180' : ''}`}
    >
      <div
        className="w-full h-full absolute inset-0 bg-white rounded-lg shadow-lg cursor-pointer"
        onClick={handleFlip}
      >
        <div
          className={`transform transition-transform duration-500 ${
            isFlipped ? 'rotate-y-180' : ''
          }`}
        >
          <div className="w-full h-full p-6 flex items-center justify-center">
            {isFlipped ? backContent : frontContent}
          </div>
        </div>
      </div>
    </AnimatedCard>
  );
};

export default FullPageFlip;
