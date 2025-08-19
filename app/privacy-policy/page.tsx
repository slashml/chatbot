import React from 'react';

export default function PrivacyPolicy() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
      
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">1. Information We Collect</h2>
        <p className="mb-4">We collect information that you provide directly to us when using our chatbot service:</p>
        <ul className="list-disc ml-6 mb-4">
          <li>Account information (email address, name)</li>
          <li>Chat conversations and interactions</li>
          <li>Usage data and analytics</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">2. How We Use Your Information</h2>
        <p className="mb-4">We use the collected information to:</p>
        <ul className="list-disc ml-6 mb-4">
          <li>Provide and improve our chatbot services</li>
          <li>Personalize your experience</li>
          <li>Analyze usage patterns and optimize performance</li>
          <li>Communicate with you about service updates</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">3. Data Security</h2>
        <p className="mb-4">We implement appropriate security measures to protect your personal information from unauthorized access, alteration, or disclosure.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">4. Data Sharing</h2>
        <p className="mb-4">We do not sell or share your personal information with third parties except as necessary to:</p>
        <ul className="list-disc ml-6 mb-4">
          <li>Comply with legal obligations</li>
          <li>Protect our rights and property</li>
          <li>Prevent fraud or enforce our policies</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">5. Your Rights</h2>
        <p className="mb-4">You have the right to:</p>
        <ul className="list-disc ml-6 mb-4">
          <li>Access your personal information</li>
          <li>Request correction of inaccurate information</li>
          <li>Request deletion of your information</li>
          <li>Opt-out of certain data collection</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">6. Contact Us</h2>
        <p className="mb-4">If you have any questions about this Privacy Policy, please contact us at:</p>
        <p className="mb-4">[Your Contact Information]</p>
      </section>

      <footer className="text-sm text-gray-600">
        <p>Last updated: August 19, 2025</p>
      </footer>
    </div>
  );
}
