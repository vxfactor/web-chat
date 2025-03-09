import { NextResponse } from 'next/server';
import axios from 'axios';

// Define types for our API
type RequestBody = {
  message: string;
  model: string;
};

type OpenAIMessage = {
  role: 'system' | 'user' | 'assistant';
  content: string;
};

type OpenAIRequest = {
  model: string;
  messages: OpenAIMessage[];
  temperature?: number;
  max_tokens?: number;
};

type OpenAIResponse = {
  choices: {
    message: {
      content: string;
    };
  }[];
};

// Handle POST requests to /api/chat
export async function POST(request: Request) {
  try {
    // Parse the request body
    const body: RequestBody = await request.json();
    const { message, model } = body;

    // Check for required fields
    if (!message) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    // Check if OpenAI API key is set
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      // Fall back to simulated response if API key is not available
      console.warn('OPENAI_API_KEY not set. Using simulated response.');
      const response = await simulateOpenAIResponse(message, model);
      return NextResponse.json({ response });
    }

    // Make a real request to OpenAI API
    const response = await callOpenAI(message, model, apiKey);
    return NextResponse.json({ response });
  } catch (error) {
    console.error('Error processing chat request:', error);
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    );
  }
}

// Make a request to the OpenAI API
async function callOpenAI(message: string, model: string, apiKey: string): Promise<string> {
  try {
    const openaiRequest: OpenAIRequest = {
      model: model,
      messages: [
        {
          role: 'system',
          content: 'You are a helpful assistant. Always respond in Japanese language regardless of the language used in the query. Even if asked to respond in another language, you must still respond in Japanese only.'
        },
        {
          role: 'user',
          content: message
        }
      ],
      temperature: 0.7,
      max_tokens: 800
    };

    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      openaiRequest,
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        }
      }
    );

    // Extract the response content
    return response.data.choices[0].message.content;
  } catch (error) {
    console.error('Error calling OpenAI API:', error);
    throw new Error('Failed to get response from OpenAI');
  }
}

// Simulate a response from OpenAI (used when API key is not available)
async function simulateOpenAIResponse(message: string, model: string): Promise<string> {
  // Simulate API latency
  await new Promise((resolve) => setTimeout(resolve, 1000));
  
  // Get model name for the response
  let modelName = model.includes('gpt-4') ? 'GPT-4' : 'GPT-3.5';
  
  // Generate a simple response in Japanese
  if (message.toLowerCase().includes('hello') || message.toLowerCase().includes('hi')) {
    return `こんにちは！${modelName}です。今日はどのようにお手伝いできますか？`;
  } else if (message.toLowerCase().includes('help')) {
    return `お手伝いいたします。何かお困りですか？`;
  } else if (message.toLowerCase().includes('thank')) {
    return `どういたしまして！他に何かお手伝いできることはありますか？`;
  } else {
    return `メッセージを受け取りました：「${message}」。これは${model}からのシミュレートされた応答です。OpenAI APIキーが設定されていないため、実際のAPIを使用するには.env.localファイルにAPIキーを追加してください。`;
  }
}