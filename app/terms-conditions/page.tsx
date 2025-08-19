import React from 'react';

const TermsAndConditions = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Terms and Conditions</h1>
      
      <div className="space-y-6">
        <section>
          <h2 className="text-2xl font-semibold mb-3">1. Acceptance of Terms</h2>
          <p className="text-gray-700">
            By accessing and using this chatbot service, you accept and agree to be bound by the terms and conditions outlined here.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">2. Use of Service</h2>
          <p className="text-gray-700">
            The chatbot service is provided for informational purposes only. You agree to use the service responsibly and in accordance with all applicable laws and regulations.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">3. User Conduct</h2>
          <p className="text-gray-700">
            Users must not:
          </p>
          <ul className="list-disc ml-6 mt-2 text-gray-700">
            <li>Use the service for any illegal purposes</li>
            <li>Attempt to breach or circumvent any security measures</li>
            <li>Submit any harmful or malicious content</li>
            <li>Interfere with the proper functioning of the service</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">4. Intellectual Property</h2>
          <p className="text-gray-700">
            All content, features, and functionality of the chatbot service are owned by us and are protected by international copyright, trademark, and other intellectual property laws.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">5. Limitation of Liability</h2>
          <p className="text-gray-700">
            We shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of or inability to use the service.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">6. Changes to Terms</h2>
          <p className="text-gray-700">
            We reserve the right to modify these terms at any time. Continued use of the service after any changes constitutes acceptance of the new terms.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">7. Contact Information</h2>
          <p className="text-gray-700">
            If you have any questions about these Terms and Conditions, please contact us through our contact page.
          </p>
        </section>
      </div>
    </div>
  );
};

export default TermsAndConditions;
