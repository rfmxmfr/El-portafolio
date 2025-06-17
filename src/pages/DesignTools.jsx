import React, { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useTranslation } from 'react-i18next';
import { springConfig, useCardAnimation } from '@/services/springConfig';
import AnimatedCard from '@/components/ui/animated-card';

const DesignTools = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('colors');
  const [colorInput, setColorInput] = useState('');
  const [palette, setPalette] = useState([]);

  const generatePalette = async () => {
    try {
      // Replace with actual AI color palette generation
      const mockPalette = [
        '#FF6B6B',
        '#4ECDC4',
        '#45B7D1',
        '#96CEB4',
        '#FFEEAD',
      ];
      setPalette(mockPalette);
    } catch (error) {
      console.error('Error generating palette:', error);
    }
  };

  return (
    <div className="container mx-auto py-12">
      <h1 className="text-4xl font-bold mb-8 text-center">{t('designTools.title')}</h1>
      
      <Tabs defaultValue="colors" onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="colors">{t('designTools.tabs.colors')}</TabsTrigger>
          <TabsTrigger value="typography">{t('designTools.tabs.typography')}</TabsTrigger>
          <TabsTrigger value="layout">{t('designTools.tabs.layout')}</TabsTrigger>
        </TabsList>

        <TabsContent value="colors">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatedCard>
              <Card>
                <CardHeader>
                  <CardTitle>{t('designTools.colorPalette.title')}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col gap-4">
                    <Input
                      placeholder={t('designTools.colorPalette.prompt')}
                      value={colorInput}
                      onChange={(e) => setColorInput(e.target.value)}
                    />
                    <Button onClick={generatePalette}>
                      {t('designTools.colorPalette.generate')}
                    </Button>
                    {palette.length > 0 && (
                      <div className="grid grid-cols-5 gap-2 mt-4">
                        {palette.map((color, index) => (
                          <div
                            key={index}
                            style={{ backgroundColor: color }}
                            className="aspect-square rounded-lg border"
                          />
                        ))}
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </AnimatedCard>
          </div>
        </TabsContent>

        <TabsContent value="typography">
          <AnimatedCard>
            <Card>
              <CardHeader>
                <CardTitle>{t('designTools.typography.title')}</CardTitle>
              </CardHeader>
              <CardContent>
                {/* Typography tools content */}
              </CardContent>
            </Card>
          </AnimatedCard>
        </TabsContent>

        <TabsContent value="layout">
          <AnimatedCard>
            <Card>
              <CardHeader>
                <CardTitle>{t('designTools.layout.title')}</CardTitle>
              </CardHeader>
              <CardContent>
                {/* Layout tools content */}
              </CardContent>
            </Card>
          </AnimatedCard>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DesignTools;
