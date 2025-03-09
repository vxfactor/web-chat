import React from 'react';

// Define the types for our props
type Message = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
};

type ChatWindowProps = {
  messages: Message[];
  isLoading: boolean;
};

// Component to render a single message
const MessageItem = ({ message }: { message: Message }) => {
  const isUser = message.role === 'user';
  
  return (
    <div className={`flex w-full mb-4 ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-[80%] rounded-lg p-4 ${
          isUser 
            ? 'bg-primary-600 text-white rounded-tr-none' 
            : 'bg-gray-100 rounded-tl-none'
        }`}
      >
        <p className="whitespace-pre-wrap">{message.content}</p>
        {!isUser && (
          <div className="mt-2 text-xs text-gray-500 italic">
            Response is in Japanese. Need translation? Try copying to a translator.
          </div>
        )}
      </div>
    </div>
  );
};

// Main ChatWindow component
const ChatWindow: React.FC<ChatWindowProps> = ({ messages, isLoading }) => {
  // Reference for auto-scrolling
  const messagesEndRef = React.useRef<HTMLDivElement>(null);

  // Scroll to bottom whenever messages change
  React.useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto p-4 bg-gray-50 rounded-lg mb-4">
      {messages.length === 0 ? (
        <div className="h-full flex flex-col items-center justify-center text-gray-400">
          <p>Start a conversation by typing a message below</p>
          <p className="mt-2 text-sm">All responses will be in Japanese</p>
        </div>
      ) : (
        <>
          {messages.map((message) => (
            <MessageItem key={message.id} message={message} />
          ))}
          {isLoading && (
            <div className="flex w-full mb-4 justify-start">
              <div className="max-w-[80%] rounded-lg p-4 bg-gray-100 rounded-tl-none">
                <p className="animate-pulse">考え中です... (Thinking...)</p>
                <p className="text-xs text-gray-500 mt-1">日本語の返事を準備しています。</p>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </>
      )}
    </div>
  );
};

export default ChatWindow;