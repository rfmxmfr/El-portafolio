import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx';
import { CheckCircle, Move, Resize, Type, Image, PenTool, Sliders, LayoutTemplate } from 'lucide-react';
import './App.css'; // Ensure App.css styles are applied

function CanvaFeaturesPage() {
  // Define the features data as an array of objects
  const features = [
    {
      icon: Move,
      title: 'Drag and Drop Functionality',
      description: 'Easily move elements around the canvas to arrange your designs precisely.'
    },
    {
      icon: Resize,
      title: 'Resize Handles',
      description: 'Adjust the dimensions of any item with intuitive resize handles for perfect scaling.'
    },
    {
      icon: Type,
      title: 'Text Editing Tools',
      description: 'Customize your text with a wide variety of fonts, colors, and styles to match your brand.'
    },
    {
      icon: Image,
      title: 'Photo Upload Capabilities',
      description: 'Seamlessly upload photos from your device to integrate into your portfolio designs.'
    },
    {
      icon: PenTool,
      title: 'Drawing and Painting Tools',
      description: 'Unleash your creativity with versatile drawing and painting tools for unique artistic expression.'
    },
    {
      icon: Sliders,
      title: 'Filter and Effect Options',
      description: 'Enhance your images with a range of filters and effects to achieve the desired visual impact.'
    },
    {
      icon: LayoutTemplate,
      title: 'Template Libraries',
      description: 'Start your designs quickly with a rich library of professional templates, maintaining consistent style.'
    }
  ];

  return (
    <section className="min-h-screen py-20 px-6 bg-gradient-to-br from-neutral-50 to-neutral-100">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-light text-neutral-900 mb-12 text-center">
          Key Features of Design Platforms
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="bg-white/60 backdrop-blur-sm border-neutral-200">
              <CardHeader className="flex flex-row items-center space-x-4 p-6">
                <div className="p-3 rounded-full bg-neutral-100 text-neutral-700">
                  {/* Lucide icon component */}
                  <feature.icon size={24} />
                </div>
                <CardTitle className="text-xl font-light text-neutral-900">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 pt-0">
                <p className="text-neutral-600 leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

export default CanvaFeaturesPage;


