'use client';

import React from 'react';

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">About Us</h1>
          <p className="text-xl text-gray-600 mb-12">
            Welcome to our innovative chatbot platform, where technology meets conversation.
          </p>
        </div>

        <div className="bg-white shadow-lg rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Our Mission</h2>
          <p className="text-gray-600 mb-6">
            We strive to create intelligent conversational experiences that help businesses
            connect with their customers in meaningful ways. Our AI-powered chatbot solutions
            are designed to enhance customer service and streamline communication.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">What We Do</h3>
            <p className="text-gray-600">
              We develop cutting-edge chatbot solutions using the latest AI technology
              to help businesses automate customer interactions while maintaining a
              personal touch.
            </p>
          </div>

          <div className="bg-white shadow-lg rounded-lg p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Our Values</h3>
            <p className="text-gray-600">
              Innovation, reliability, and user satisfaction are at the core of everything
              we do. We believe in creating solutions that make a real difference in how
              businesses operate.
            </p>
          </div>
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-600">
            Want to learn more about how we can help your business?{' '}
            <a href="/contact" className="text-blue-600 hover:text-blue-800 font-medium">
              Contact us today
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
