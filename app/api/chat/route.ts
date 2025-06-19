import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextRequest, NextResponse } from 'next/server';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

interface Message {
  role: 'user' | 'bot';
  content: string;
  timestamp: number;
}

export async function POST(request: NextRequest) {
  try {
    const { messages }: { messages: Message[] } = await request.json();
    
    if (!messages || messages.length === 0) {
      return NextResponse.json(
        { error: 'No messages provided' }, 
        { status: 400 }
      );
    }

    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    
    // Convert our message format to Gemini's expected format
    // Build conversation history for context
    let conversationHistory = '';
    
    // Include recent conversation history (last 10 exchanges to avoid token limits)
    const recentMessages = messages.slice(-20); // Last 20 messages
    
    for (const msg of recentMessages) {
      if (msg.role === 'user') {
        conversationHistory += `Human: ${msg.content}\n\n`;
      } else if (msg.role === 'bot') {
        conversationHistory += `Assistant: ${msg.content}\n\n`;
      }
    }
    
    // Get the latest user message
    const latestMessage = messages[messages.length - 1];
    
    // Create the prompt with context
    const promptWithContext = conversationHistory.trim() 
      ? `Previous conversation context:\n${conversationHistory}\nCurrent question: ${latestMessage.content}\n\nPlease respond naturally, taking into account our conversation history.`
      : latestMessage.content;
    
    const result = await model.generateContent(promptWithContext);
    const response = await result.response;
    const text = response.text();
    
    return NextResponse.json({ response: text });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: 'Failed to generate response' }, 
      { status: 500 }
    );
  }
}