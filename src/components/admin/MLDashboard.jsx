import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card.jsx';
import { Button } from '../ui/button.jsx';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs.jsx';
import { Textarea } from '../ui/textarea.jsx';
import { Input } from '../ui/input.jsx';
import { Label } from '../ui/label.jsx';
import { Loader2, Sparkles, MessageSquare, Image, RefreshCw, Grid } from 'lucide-react';
import { generateAI, conversationAI } from 'aws-amplify/ai';
import DesignBoard from './DesignBoard';

export default function MLDashboard() {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('generate');
  const [prompt, setPrompt] = useState('');
  const [imagePrompt, setImagePrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState('');
  const [generatedImage, setGeneratedImage] = useState(null);
  const [chatHistory, setChatHistory] = useState([]);
  const [savedDesigns, setSavedDesigns] = useState([]);
  const [mlModels, setMlModels] = useState([
    { id: 'fashion-gen', name: 'Fashion Generator', status: 'active', type: 'text' },
    { id: 'style-analyzer', name: 'Style Analyzer', status: 'active', type: 'text' },
    { id: 'image-gen', name: 'Image Generator', status: 'active', type: 'image' }
  ]);

  // Function to handle idea generation
  const handleGenerateIdeas = async () => {
    if (!prompt) return;
    
    setLoading(true);
    try {
      const result = await generateAI({
        model: 'AIAssistant',
        route: '/generate',
        input: prompt
      });
      
      setResponse(result.response);
    } catch (error) {
      console.error('Error generating ideas:', error);
      setResponse('Error generating ideas. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Function to handle chat conversation
  const handleChat = async () => {
    if (!prompt) return;
    
    setLoading(true);
    try {
      const result = await conversationAI({
        model: 'AIAssistant',
        route: '/chat',
        input: prompt
      });
      
      const newMessage = {
        user: prompt,
        assistant: result.response
      };
      
      setChatHistory([...chatHistory, newMessage]);
      setPrompt('');
    } catch (error) {
      console.error('Error in chat:', error);
      setChatHistory([
        ...chatHistory, 
        { 
          user: prompt, 
          assistant: 'Sorry, I encountered an error. Please try again.' 
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  // Function to handle image generation
  const handleGenerateImage = async () => {
    if (!imagePrompt) return;
    
    setLoading(true);
    try {
      // Simulate image generation (in a real app, this would call the ML API)
      setTimeout(() => {
        // This is a placeholder - in a real app, you'd get the image URL from the API
        const imageUrl = 'https://placehold.co/600x400/png?text=AI+Generated+Fashion+Design';
        setGeneratedImage(imageUrl);
        setLoading(false);
      }, 2000);
    } catch (error) {
      console.error('Error generating image:', error);
      setLoading(false);
    }
  };
  
  // Function to save generated design to collection
  const saveDesignToCollection = () => {
    if (!generatedImage || !imagePrompt) return;
    
    const newDesign = {
      id: `design-${Date.now()}`,
      title: imagePrompt.substring(0, 30) + (imagePrompt.length > 30 ? '...' : ''),
      description: imagePrompt,
      imageUrl: generatedImage,
      tags: imagePrompt.split(' ')
        .filter(word => word.length > 3)
        .slice(0, 5),
      timestamp: new Date().toISOString(),
      hasGeneratedImage: true
    };
    
    setSavedDesigns([...savedDesigns, newDesign]);
    
    // Reset for next generation
    setGeneratedImage(null);
    setImagePrompt('');
    
    // Switch to designs tab
    setActiveTab('designs');
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-medium text-neutral-900">{t('AI & ML Tools')}</h3>
      </div>

      <Tabs defaultValue="generate" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-4 mb-6">
          <TabsTrigger value="generate" className="flex items-center">
            <Sparkles size={16} className="mr-2" />
            {t('Generate Ideas')}
          </TabsTrigger>
          <TabsTrigger value="chat" className="flex items-center">
            <MessageSquare size={16} className="mr-2" />
            {t('Fashion Assistant')}
          </TabsTrigger>
          <TabsTrigger value="image" className="flex items-center">
            <Image size={16} className="mr-2" />
            {t('Generate Images')}
          </TabsTrigger>
          <TabsTrigger value="designs" className="flex items-center">
            <Grid size={16} className="mr-2" />
            {t('Saved Designs')}
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="generate" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>{t('Fashion Design Idea Generator')}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="prompt">{t('Describe your design concept')}</Label>
                <Textarea
                  id="prompt"
                  placeholder={t('E.g., A sustainable summer collection inspired by Mediterranean architecture...')}
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  className="min-h-[100px]"
                />
              </div>
              <Button 
                onClick={handleGenerateIdeas} 
                disabled={loading || !prompt}
                className="w-full bg-neutral-900 hover:bg-neutral-800 text-white"
              >
                {loading ? (
                  <>
                    <Loader2 size={16} className="mr-2 animate-spin" />
                    {t('Generating...')}
                  </>
                ) : (
                  <>
                    <Sparkles size={16} className="mr-2" />
                    {t('Generate Ideas')}
                  </>
                )}
              </Button>
              
              {response && (
                <div className="p-4 bg-neutral-50 rounded-md border border-neutral-200 mt-4">
                  <h4 className="font-medium mb-2">{t('Generated Ideas:')}</h4>
                  <p className="whitespace-pre-line text-neutral-700">{response}</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="chat" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>{t('Fashion Design Assistant')}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border rounded-md p-4 bg-neutral-50 min-h-[300px] max-h-[400px] overflow-y-auto">
                {chatHistory.length === 0 ? (
                  <p className="text-neutral-500 text-center py-8">
                    {t('Start a conversation with the fashion assistant')}
                  </p>
                ) : (
                  <div className="space-y-4">
                    {chatHistory.map((message, index) => (
                      <div key={index}>
                        <div className="bg-neutral-200 p-3 rounded-lg rounded-br-none mb-2">
                          <p className="text-neutral-800">{message.user}</p>
                        </div>
                        <div className="bg-neutral-900 p-3 rounded-lg rounded-bl-none text-white">
                          <p>{message.assistant}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              <div className="flex space-x-2">
                <Textarea
                  placeholder={t('Ask about fashion design, trends, or techniques...')}
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  className="min-h-[80px]"
                />
                <Button 
                  onClick={handleChat} 
                  disabled={loading || !prompt}
                  className="bg-neutral-900 hover:bg-neutral-800 text-white self-end"
                >
                  {loading ? (
                    <Loader2 size={16} className="animate-spin" />
                  ) : (
                    <MessageSquare size={16} />
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="image" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>{t('Fashion Design Image Generator')}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="imagePrompt">{t('Describe the design you want to visualize')}</Label>
                <Textarea
                  id="imagePrompt"
                  placeholder={t('E.g., A minimalist evening gown with asymmetrical neckline in emerald green silk...')}
                  value={imagePrompt}
                  onChange={(e) => setImagePrompt(e.target.value)}
                  className="min-h-[100px]"
                />
              </div>
              <Button 
                onClick={handleGenerateImage} 
                disabled={loading || !imagePrompt}
                className="w-full bg-neutral-900 hover:bg-neutral-800 text-white"
              >
                {loading ? (
                  <>
                    <Loader2 size={16} className="mr-2 animate-spin" />
                    {t('Generating Image...')}
                  </>
                ) : (
                  <>
                    <Image size={16} className="mr-2" />
                    {t('Generate Image')}
                  </>
                )}
              </Button>
              
              {generatedImage && (
                <div className="mt-4">
                  <h4 className="font-medium mb-2">{t('Generated Design:')}</h4>
                  <div className="border rounded-md overflow-hidden">
                    <img 
                      src={generatedImage} 
                      alt="AI Generated Fashion Design" 
                      className="w-full h-auto"
                    />
                  </div>
                  <div className="flex justify-end mt-2">
                    <Button 
                      onClick={saveDesignToCollection}
                      className="bg-green-600 hover:bg-green-700 text-white"
                    >
                      {t('Save to Collection')}
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="designs" className="space-y-4">
          <DesignBoard collectionId="ml-designs" />
        </TabsContent>
      </Tabs>

      <Card>
        <CardHeader>
          <CardTitle>{t('ML Models Status')}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mlModels.map((model) => (
              <div key={model.id} className="flex items-center justify-between p-3 border rounded-md">
                <div>
                  <h4 className="font-medium">{model.name}</h4>
                  <p className="text-sm text-neutral-500">{t('Type')}: {model.type === 'text' ? t('Text Generation') : t('Image Generation')}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`inline-block w-2 h-2 rounded-full ${model.status === 'active' ? 'bg-green-500' : 'bg-red-500'}`}></span>
                  <span className={`text-sm ${model.status === 'active' ? 'text-green-600' : 'text-red-600'}`}>
                    {model.status === 'active' ? t('Active') : t('Offline')}
                  </span>
                  <Button size="sm" variant="ghost" className="text-neutral-500">
                    <RefreshCw size={14} />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}