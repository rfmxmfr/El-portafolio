import { useState } from 'react';
import { generateAI, conversationAI } from 'aws-amplify/ai';

export default function AIFashionAssistant() {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [chatHistory, setChatHistory] = useState([]);

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

  return (
    <div className="p-4 border rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">AI Fashion Assistant</h2>
      
      <div className="mb-4">
        <textarea
          className="w-full p-2 border rounded"
          rows="3"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Ask about fashion design or request ideas..."
        />
      </div>
      
      <div className="flex space-x-2 mb-4">
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded"
          onClick={handleChat}
          disabled={loading || !prompt}
        >
          {loading ? 'Processing...' : 'Chat'}
        </button>
        
        <button
          className="px-4 py-2 bg-green-500 text-white rounded"
          onClick={handleGenerateIdeas}
          disabled={loading || !prompt}
        >
          {loading ? 'Generating...' : 'Generate Ideas'}
        </button>
      </div>
      
      {response && (
        <div className="p-3 bg-gray-100 rounded mb-4">
          <h3 className="font-bold">Generated Ideas:</h3>
          <p className="whitespace-pre-line">{response}</p>
        </div>
      )}
      
      {chatHistory.length > 0 && (
        <div className="border rounded p-3">
          <h3 className="font-bold mb-2">Chat History:</h3>
          {chatHistory.map((message, index) => (
            <div key={index} className="mb-3">
              <p className="font-semibold">You: {message.user}</p>
              <p className="pl-4">Assistant: {message.assistant}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}