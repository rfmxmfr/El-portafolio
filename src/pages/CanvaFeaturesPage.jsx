import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Move, Resize, Type, Image, PenTool, Sliders, LayoutTemplate } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { springConfig, useCardAnimation } from '@/services/springConfig';
import AnimatedCard from '@/components/ui/animated-card';

const features = [
  {
    icon: Move,
    title: 'Drag and Drop Functionality',
    description: 'Easily move elements around the canvas to arrange your designs precisely.',
  },
  {
    icon: Resize,
    title: 'Resize Handles',
    description: 'Adjust the dimensions of any item with intuitive resize handles for perfect scaling.',
  },
  {
    icon: Type,
    title: 'Text Editor',
    description: 'Add and customize text with various fonts, colors, and styles.',
  },
  {
    icon: Image,
    title: 'Image Editor',
    description: 'Upload, crop, and enhance images with our powerful image editing tools.',
  },
  {
    icon: PenTool,
    title: 'Drawing Tools',
    description: 'Create custom shapes and illustrations with our drawing tools.',
  },
  {
    icon: Sliders,
    title: 'Color Picker',
    description: 'Choose from millions of colors or use our AI color suggestions.',
  },
  {
    icon: LayoutTemplate,
    title: 'Layout Templates',
    description: 'Use our pre-designed templates or create your own custom layouts.',
  },
];

const CanvaFeaturesPage = () => {
  const { t } = useTranslation();
  const featureAnimations = features.map((_, index) => useCardAnimation(true));

  return (
    <div className="container mx-auto py-12">
      <h1 className="text-4xl font-bold mb-8 text-center">{t('features.title')}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature, index) => (
          <AnimatedCard key={feature.title} style={featureAnimations[index]}>
            <Card>
              <CardHeader className="flex flex-col items-center">
                <feature.icon className="w-8 h-8 text-primary mb-2" />
                <CardTitle>{t(`features.${feature.title}`)}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  {t(`features.${feature.description}`)}
                </p>
              </CardContent>
            </Card>
          </AnimatedCard>
        ))}
      </div>
    </div>
  );
};

export default CanvaFeaturesPage;
