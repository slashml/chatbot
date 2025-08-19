import React from 'react';

export default function HelpPage() {
  return (
    <div className="min-h-screen p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Help & Support</h1>
      
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Contact Support</h2>
        <p className="mb-4">Our support team is here to help you. You can reach us at:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>General Support: <a href="mailto:support@chatbot-help.com" className="text-blue-600 hover:underline">support@chatbot-help.com</a></li>
          <li>Technical Issues: <a href="mailto:tech@chatbot-help.com" className="text-blue-600 hover:underline">tech@chatbot-help.com</a></li>
          <li>Business Inquiries: <a href="mailto:business@chatbot-help.com" className="text-blue-600 hover:underline">business@chatbot-help.com</a></li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Quick Start Guide</h2>
        <div className="space-y-4">
          <div>
            <h3 className="text-xl font-medium mb-2">1. Starting a Conversation</h3>
            <p>Simply type your message in the chat input field and press enter or click the send button. Our chatbot will respond to your queries instantly.</p>
          </div>
          
          <div>
            <h3 className="text-xl font-medium mb-2">2. Using Commands</h3>
            <p>You can use special commands to get specific information:</p>
            <ul className="list-disc pl-6 mt-2">
              <li>Type &quot;/help&quot; for a list of available commands</li>
              <li>Type &quot;/clear&quot; to start a new conversation</li>
              <li>Type &quot;/settings&quot; to customize your experience</li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-medium mb-2">3. Best Practices</h3>
            <ul className="list-disc pl-6">
              <li>Be clear and specific with your questions</li>
              <li>One question at a time yields better results</li>
              <li>Review your conversation history in the settings page</li>
              <li>Report any issues immediately to our support team</li>
            </ul>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Frequently Asked Questions</h2>
        <div className="space-y-4">
          <div>
            <h3 className="text-xl font-medium mb-2">How do I reset my conversation?</h3>
            <p>You can either use the &quot;/clear&quot; command or click the &quot;New Chat&quot; button at the top of the interface.</p>
          </div>
          
          <div>
            <h3 className="text-xl font-medium mb-2">Is my conversation history saved?</h3>
            <p>Yes, your conversations are saved securely and can be accessed from your settings page.</p>
          </div>

          <div>
            <h3 className="text-xl font-medium mb-2">How can I provide feedback?</h3>
            <p>You can send your feedback to <a href="mailto:feedback@chatbot-help.com" className="text-blue-600 hover:underline">feedback@chatbot-help.com</a> or use the feedback form in the settings page.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
