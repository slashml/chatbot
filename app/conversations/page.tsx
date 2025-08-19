'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { 
  ArrowLeft, 
  MessageCircle, 
  Trash2, 
  Calendar,
  Search,
  Bot,
  User
} from 'lucide-react';

interface Message {
  role: 'user' | 'bot';
  content: string;
  timestamp: number;
}

interface Conversation {
  id: string;
  messages: Message[];
  lastMessageTime: number;
}

export default function ConversationsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  // Load conversations from localStorage
  useEffect(() => {
    if (session?.user?.email) {
      const storageKey = `gemini-chat-history-${session.user.email}`;
      const savedMessages = localStorage.getItem(storageKey);
      
      if (savedMessages) {
        try {
          const messages: Message[] = JSON.parse(savedMessages);
          
          // Group messages into conversations (using timestamp gaps > 30 minutes)
          const conversationGroups: Conversation[] = [];
          let currentGroup: Message[] = [];
          let lastMessageTime = 0;
          
          messages.forEach((message) => {
            if (currentGroup.length === 0 || message.timestamp - lastMessageTime < 30 * 60 * 1000) {
              currentGroup.push(message);
            } else {
              if (currentGroup.length > 0) {
                conversationGroups.push({
                  id: currentGroup[0].timestamp.toString(),
                  messages: [...currentGroup],
                  lastMessageTime: currentGroup[currentGroup.length - 1].timestamp,
                });
              }
              currentGroup = [message];
            }
            lastMessageTime = message.timestamp;
          });
          
          // Add the last group
          if (currentGroup.length > 0) {
            conversationGroups.push({
              id: currentGroup[0].timestamp.toString(),
              messages: [...currentGroup],
              lastMessageTime: currentGroup[currentGroup.length - 1].timestamp,
            });
          }
          
          setConversations(conversationGroups.reverse()); // Most recent first
        } catch (error) {
          console.error('Error loading conversations:', error);
        }
      }
    }
  }, [session]);

  const deleteConversation = (conversationId: string) => {
    if (!session?.user?.email || !window.confirm('Are you sure you want to delete this conversation?')) {
      return;
    }

    const updatedConversations = conversations.filter(conv => conv.id !== conversationId);
    setConversations(updatedConversations);

    // Update localStorage with the remaining messages
    const allMessages = updatedConversations.flatMap(conv => conv.messages);
    const storageKey = `gemini-chat-history-${session.user.email}`;
    localStorage.setItem(storageKey, JSON.stringify(allMessages));
  };

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    const now = new Date();
    const yesterday = new Date(now);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === now.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString();
    }
  };

  const formatTime = (timestamp: number) => {
    return new Date(timestamp).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  // Filter conversations based on search term
  const filteredConversations = conversations.filter(conversation => {
    const searchLower = searchTerm.toLowerCase();
    return conversation.messages.some(message => 
      message.content.toLowerCase().includes(searchLower)
    );
  });

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!session) {
    router.push('/api/auth/signin');
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      <div className="container mx-auto max-w-4xl px-4 py-6">
        {/* Header */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200 mb-6">
          <div className="p-6">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => router.push('/')}
                className="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                  <MessageCircle className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                    Recent Conversations
                  </h1>
                  <p className="text-sm text-gray-500">
                    View and manage your chat history
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-md border border-gray-200 p-3 mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search conversations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white"
            />
          </div>
        </div>

        {/* Conversations List */}
        <div className="space-y-4">
          {filteredConversations.length === 0 ? (
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200 p-8 text-center">
              <MessageCircle className="w-12 h-12 mx-auto mb-4 text-gray-400" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No conversations found</h3>
              <p className="text-gray-500">
                {searchTerm 
                  ? 'Try different search terms or clear the search'
                  : 'Start a new conversation to see it here'}
              </p>
            </div>
          ) : (
            filteredConversations.map((conversation) => (
              <div
                key={conversation.id}
                className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-md border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="p-4">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600">
                        {formatDate(conversation.lastMessageTime)} at {formatTime(conversation.lastMessageTime)}
                      </span>
                    </div>
                    <button
                      onClick={() => deleteConversation(conversation.id)}
                      className="p-2 text-gray-400 hover:text-red-500 rounded-full hover:bg-red-50 transition-colors"
                      title="Delete conversation"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="space-y-3">
                    {conversation.messages.slice(0, 2).map((message, idx) => (
                      <div
                        key={idx}
                        className={`flex items-start space-x-3 ${
                          message.role === 'user' ? 'justify-end' : ''
                        }`}
                      >
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                            message.role === 'user'
                              ? 'bg-gradient-to-r from-blue-500 to-indigo-500'
                              : 'bg-gradient-to-r from-purple-500 to-pink-500'
                          }`}
                        >
                          {message.role === 'user' ? (
                            session.user?.image ? (
                              <img
                                src={session.user.image}
                                alt="User"
                                className="w-8 h-8 rounded-full"
                              />
                            ) : (
                              <User className="w-4 h-4 text-white" />
                            )
                          ) : (
                            <Bot className="w-4 h-4 text-white" />
                          )}
                        </div>
                        <div
                          className={`px-4 py-2 rounded-xl max-w-[80%] ${
                            message.role === 'user'
                              ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white'
                              : 'bg-gray-100 text-gray-800'
                          }`}
                        >
                          <p className="text-sm line-clamp-2">{message.content}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {conversation.messages.length > 2 && (
                    <div className="mt-3 text-center">
                      <button
                        onClick={() => router.push('/')}
                        className="text-sm text-purple-600 hover:text-purple-700"
                      >
                        View full conversation...
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
