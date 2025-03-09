'use client';

import { useState } from 'react';
import ChatWindow from '../components/ChatWindow';
import ChatInput from '../components/ChatInput';
import ModelSelector from '../components/ModelSelector';

// Define message type
type Message = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
};

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [selectedModel, setSelectedModel] = useState('gpt-3.5-turbo');
  const [isLoading, setIsLoading] = useState(false);
  const [apiKeyConfigured, setApiKeyConfigured] = useState<boolean | null>(null);

  // Function to handle sending a new message
  const handleSendMessage = async (content: string) => {
    if (!content.trim()) return;

    // Create a new user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content,
    };

    // Add user message to the chat
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      // Make API request to OpenAI
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: content,
          model: selectedModel,
        }),
      });

      const data = await response.json();

      // Note if we're using a simulated response
      if (apiKeyConfigured === null && data.response.includes('simulated response')) {
        setApiKeyConfigured(false);
      } else if (apiKeyConfigured === null) {
        setApiKeyConfigured(true);
      }

      // Create assistant message from response
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.response,
      };

      // Add assistant message to the chat
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      // Add error message
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'Sorry, there was an error processing your request. Please try again.',
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen p-4">
      <header className="mb-4">
        <h1 className="text-2xl font-bold text-center">Chat with OpenAI</h1>
        <p className="text-center text-gray-600 mb-2">All responses will be in Japanese, regardless of your input language.</p>
        <ModelSelector 
          selectedModel={selectedModel} 
          onSelect={setSelectedModel} 
        />
        {apiKeyConfigured === false && (
          <div className="mt-2 p-2 bg-yellow-100 text-yellow-800 text-sm rounded-md">
            ⚠️ OpenAI API key not configured. Using simulated responses. Add your API key to .env.local file.
          </div>
        )}
      </header>
      
      <ChatWindow messages={messages} isLoading={isLoading} />
      
      <ChatInput 
        onSendMessage={handleSendMessage} 
        disabled={isLoading} 
      />
    </div>
  );
}