import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useTranslation } from 'react-i18next';
import { springConfig, useCardAnimation } from '@/services/springConfig';
import AnimatedCard from '@/components/ui/animated-card';

const FlipCards = ({ items }) => {
  const { t } = useTranslation();
  const [flippedItems, setFlippedItems] = useState(new Set());

  const handleFlip = (index) => {
    const newSet = new Set(flippedItems);
    if (newSet.has(index)) {
      newSet.delete(index);
    } else {
      newSet.add(index);
    }
    setFlippedItems(newSet);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.map((item, index) => (
        <AnimatedCard
          key={index}
          style={useCardAnimation(true)}
          className={`transform transition-transform duration-500 ${
            flippedItems.has(index) ? 'rotate-y-180' : ''
          }`}
        >
          <Card
            onClick={() => handleFlip(index)}
            className="cursor-pointer"
          >
            <CardHeader className="text-center">
              <CardTitle>{item.title}</CardTitle>
            </CardHeader>
            <CardContent>
              {flippedItems.has(index) ? (
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">
                    {item.backContent}
                  </p>
                </div>
              ) : (
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">
                    {item.frontContent}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </AnimatedCard>
      ))}
    </div>
  );
};

export default FlipCards;
