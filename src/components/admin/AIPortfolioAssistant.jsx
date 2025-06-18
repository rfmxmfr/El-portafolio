import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card.jsx';
import { Button } from '../ui/button.jsx';
import { Textarea } from '../ui/textarea.jsx';
import { Label } from '../ui/label.jsx';
import { Loader2, Sparkles, Save, Grid2X2, Grid3X3 } from 'lucide-react';
import { mlApiService } from '../../services/mlApi';

export default function AIPortfolioAssistant({ onApplyToCollection, collectionId }) {
  const { t } = useTranslation();
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [generatedContent, setGeneratedContent] = useState(null);
  const [gridLayout, setGridLayout] = useState('2x2');
  const [savedItems, setSavedItems] = useState([]);

  // Generate portfolio content based on prompt
  const handleGenerateContent = async () => {
    if (!prompt) return;
    
    setLoading(true);
    try {
      const result = await mlApiService.generateIdeas(prompt);
      
      // Format the response into portfolio content
      const content = {
        title: `AI Generated: ${prompt.substring(0, 30)}...`,
        description: result.ideas.join('\\n\\n'),
        tags: extractKeywords(prompt),
        timestamp: new Date().toISOString()
      };
      
      setGeneratedContent(content);
    } catch (error) {
      console.error('Error generating portfolio content:', error);
    } finally {
      setLoading(false);
    }
  };

  // Extract keywords from prompt for tags
  const extractKeywords = (text) => {
    const commonWords = ['the', 'and', 'a', 'an', 'in', 'on', 'with', 'for', 'to', 'of'];
    return text
      .toLowerCase()
      .split(' ')
      .filter(word => word.length > 3 && !commonWords.includes(word))
      .slice(0, 5);
  };

  // Save generated content to collection
  const handleSaveToCollection = () => {
    if (!generatedContent) return;
    
    const newItem = {
      ...generatedContent,
      id: `ai-gen-${Date.now()}`,
      collectionId
    };
    
    setSavedItems([...savedItems, newItem]);
    
    // Call parent function to add to collection
    if (onApplyToCollection) {
      onApplyToCollection(newItem);
    }
    
    // Reset for next generation
    setGeneratedContent(null);
    setPrompt('');
  };

  // Toggle grid layout
  const toggleGridLayout = () => {
    setGridLayout(gridLayout === '2x2' ? '3x3' : '2x2');
  };

  return (
    <Card className="bg-white border-neutral-200">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Sparkles size={18} className="mr-2 text-amber-500" />
          {t('AI Portfolio Assistant')}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="portfolioPrompt">{t('Describe what you want in your portfolio')}</Label>
          <Textarea
            id="portfolioPrompt"
            placeholder={t('E.g., Create a sustainable fashion collection with minimalist aesthetics focused on evening wear...')}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="min-h-[100px]"
          />
        </div>
        
        <div className="flex justify-between">
          <Button 
            onClick={handleGenerateContent} 
            disabled={loading || !prompt}
            className="bg-neutral-900 hover:bg-neutral-800 text-white"
          >
            {loading ? (
              <>
                <Loader2 size={16} className="mr-2 animate-spin" />
                {t('Generating...')}
              </>
            ) : (
              <>
                <Sparkles size={16} className="mr-2" />
                {t('Generate Portfolio Content')}
              </>
            )}
          </Button>
          
          <Button
            onClick={toggleGridLayout}
            variant="outline"
            className="border-neutral-300"
          >
            {gridLayout === '2x2' ? (
              <>
                <Grid2X2 size={16} className="mr-2" />
                {t('2x2 Grid')}
              </>
            ) : (
              <>
                <Grid3X3 size={16} className="mr-2" />
                {t('3x3 Grid')}
              </>
            )}
          </Button>
        </div>
        
        {generatedContent && (
          <div className="mt-4 border rounded-md p-4 bg-neutral-50">
            <h3 className="font-medium text-lg mb-2">{generatedContent.title}</h3>
            <p className="whitespace-pre-line mb-4">{generatedContent.description}</p>
            
            <div className="flex flex-wrap gap-2 mb-4">
              {generatedContent.tags.map((tag, index) => (
                <span key={index} className="px-2 py-1 bg-neutral-200 rounded-md text-sm">
                  #{tag}
                </span>
              ))}
            </div>
            
            <Button 
              onClick={handleSaveToCollection}
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              <Save size={16} className="mr-2" />
              {t('Save to Collection')}
            </Button>
          </div>
        )}
        
        {savedItems.length > 0 && (
          <div className="mt-4">
            <h3 className="font-medium mb-2">{t('Saved Items')}</h3>
            <div className={`grid ${gridLayout === '2x2' ? 'grid-cols-2' : 'grid-cols-3'} gap-4`}>
              {savedItems.map((item) => (
                <div key={item.id} className="border rounded-md p-3 bg-white">
                  <h4 className="font-medium text-sm truncate">{item.title}</h4>
                  <p className="text-xs text-neutral-500 mt-1">
                    {new Date(item.timestamp).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}