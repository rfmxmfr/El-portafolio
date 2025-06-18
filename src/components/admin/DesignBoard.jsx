import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card.jsx';
import { Button } from '../ui/button.jsx';
import { Badge } from '../ui/badge.jsx';
import { Grid2X2, Grid3X3, Save, Trash2, Download, Sparkles } from 'lucide-react';
import { mlApiService } from '../../services/mlApi';

export default function DesignBoard({ collectionId }) {
  const { t } = useTranslation();
  const [designs, setDesigns] = useState([]);
  const [gridLayout, setGridLayout] = useState('2x2');
  const [selectedDesigns, setSelectedDesigns] = useState([]);
  const [loading, setLoading] = useState(false);
  const [generatingImage, setGeneratingImage] = useState(false);

  // Load saved designs on component mount
  useEffect(() => {
    // In a real app, this would fetch designs from the backend
    const savedDesigns = localStorage.getItem(`designs-${collectionId}`);
    if (savedDesigns) {
      setDesigns(JSON.parse(savedDesigns));
    }
  }, [collectionId]);

  // Save designs when they change
  useEffect(() => {
    if (designs.length > 0) {
      localStorage.setItem(`designs-${collectionId}`, JSON.stringify(designs));
    }
  }, [designs, collectionId]);

  // Handle drag and drop reordering
  const handleDragEnd = (result) => {
    if (!result.destination) return;
    
    const items = Array.from(designs);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    
    setDesigns(items);
  };

  // Toggle grid layout
  const toggleGridLayout = () => {
    setGridLayout(gridLayout === '2x2' ? '3x3' : '2x2');
  };

  // Toggle design selection
  const toggleSelectDesign = (designId) => {
    if (selectedDesigns.includes(designId)) {
      setSelectedDesigns(selectedDesigns.filter(id => id !== designId));
    } else {
      setSelectedDesigns([...selectedDesigns, designId]);
    }
  };

  // Delete selected designs
  const deleteSelectedDesigns = () => {
    setDesigns(designs.filter(design => !selectedDesigns.includes(design.id)));
    setSelectedDesigns([]);
  };

  // Generate AI design image
  const generateDesignImage = async (designId) => {
    const design = designs.find(d => d.id === designId);
    if (!design) return;
    
    setGeneratingImage(true);
    try {
      // In a real app, this would call the ML API
      const result = await new Promise(resolve => {
        setTimeout(() => {
          resolve({ image_url: 'https://placehold.co/600x800/png?text=AI+Generated+Fashion+Design' });
        }, 2000);
      });
      
      // Update the design with the generated image
      setDesigns(designs.map(d => 
        d.id === designId 
          ? { ...d, imageUrl: result.image_url, hasGeneratedImage: true } 
          : d
      ));
    } catch (error) {
      console.error('Error generating design image:', error);
    } finally {
      setGeneratingImage(false);
    }
  };

  // Save all designs to collection
  const saveDesignsToCollection = async () => {
    setLoading(true);
    try {
      // In a real app, this would call the backend API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Show success message
      alert(t('Designs saved successfully to collection!'));
    } catch (error) {
      console.error('Error saving designs:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="bg-white border-neutral-200">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-medium text-neutral-900">
          {t('Design Board')}
        </CardTitle>
        <div className="flex space-x-2">
          <Button
            onClick={toggleGridLayout}
            variant="outline"
            className="border-neutral-300"
            size="sm"
          >
            {gridLayout === '2x2' ? (
              <>
                <Grid2X2 size={16} className="mr-2" />
                {t('2x2')}
              </>
            ) : (
              <>
                <Grid3X3 size={16} className="mr-2" />
                {t('3x3')}
              </>
            )}
          </Button>
          
          {selectedDesigns.length > 0 && (
            <Button
              onClick={deleteSelectedDesigns}
              variant="outline"
              className="border-red-300 text-red-600 hover:bg-red-50"
              size="sm"
            >
              <Trash2 size={16} className="mr-2" />
              {t('Delete Selected')}
            </Button>
          )}
          
          <Button
            onClick={saveDesignsToCollection}
            className="bg-green-600 hover:bg-green-700 text-white"
            size="sm"
            disabled={loading || designs.length === 0}
          >
            {loading ? (
              <span className="animate-pulse">{t('Saving...')}</span>
            ) : (
              <>
                <Save size={16} className="mr-2" />
                {t('Save All')}
              </>
            )}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {designs.length === 0 ? (
          <div className="text-center py-12 border-2 border-dashed border-neutral-300 rounded-md">
            <p className="text-neutral-500 mb-4">{t('No designs added yet')}</p>
            <p className="text-sm text-neutral-400">{t('Use the AI tools to generate designs')}</p>
          </div>
        ) : (
          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="designs" direction="horizontal">
              {(provided) => (
                <div 
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className={`grid ${gridLayout === '2x2' ? 'grid-cols-2' : 'grid-cols-3'} gap-4`}
                >
                  {designs.map((design, index) => (
                    <Draggable key={design.id} draggableId={design.id} index={index}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className={`border rounded-md overflow-hidden ${
                            selectedDesigns.includes(design.id) ? 'ring-2 ring-blue-500' : ''
                          }`}
                          onClick={() => toggleSelectDesign(design.id)}
                        >
                          <div className="p-3 bg-neutral-50 border-b">
                            <h3 className="font-medium text-sm truncate">{design.title}</h3>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {design.tags.slice(0, 3).map((tag, i) => (
                                <Badge key={i} variant="secondary" className="text-xs bg-neutral-100">
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          
                          <div className="aspect-square bg-white relative">
                            {design.imageUrl ? (
                              <img 
                                src={design.imageUrl} 
                                alt={design.title}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="flex items-center justify-center h-full">
                                <Button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    generateDesignImage(design.id);
                                  }}
                                  className="bg-amber-500 hover:bg-amber-600 text-white"
                                  disabled={generatingImage}
                                >
                                  <Sparkles size={16} className="mr-2" />
                                  {generatingImage ? t('Generating...') : t('Generate Image')}
                                </Button>
                              </div>
                            )}
                          </div>
                          
                          <div className="p-2 flex justify-between items-center bg-white">
                            <span className="text-xs text-neutral-500">
                              {new Date(design.timestamp).toLocaleDateString()}
                            </span>
                            {design.hasGeneratedImage && (
                              <Button
                                size="sm"
                                variant="ghost"
                                className="h-8 w-8 p-0"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  // Download functionality would go here
                                }}
                              >
                                <Download size={14} />
                              </Button>
                            )}
                          </div>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        )}
      </CardContent>
    </Card>
  );
}