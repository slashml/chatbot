import React from 'react';

export default function BlogPage() {
  const blogPost = {
    title: 'The Future of Chatbots in Customer Support',
    author: 'Jane Doe',
    date: 'August 19, 2025',
    content: (
      <>
        <p>
          Chatbots are rapidly transforming customer support. Their ability to
          provide instant answers, handle multiple inquiries simultaneously, and
          operate 24/7 makes them an invaluable asset for businesses of all
          sizes. This blog post explores the exciting developments in chatbot
          technology and their impact on customer service.
        </p>
        <p>
          One of the key trends is the integration of AI and machine learning
          into chatbots. This allows them to understand natural language more
          effectively and provide more personalized and accurate responses.
        </p>
        <h2>Benefits of AI-Powered Chatbots</h2>
        <ul>
          <li>Improved customer satisfaction</li>
          <li>Reduced operational costs</li>
          <li>Increased efficiency</li>
          <li>Personalized customer experiences</li>
        </ul>
        <p>
          However, there are also challenges to consider, such as ensuring data
          privacy and security, and addressing the limitations of current AI
          technology.
        </p>
        <p>
          In conclusion, the future of chatbots in customer support is bright.
          As AI and machine learning continue to advance, chatbots will become
          even more sophisticated and capable of providing exceptional customer
          experiences.
        </p>
      </>
    ),
  };

  return (
    <div className="min-h-screen p-8 max-w-4xl mx-auto">
      <header className="mb-8">
        <h1 className="text-3xl font-bold mb-2">{blogPost.title}</h1>
        <div className="text-gray-600">
          By {blogPost.author} | Published {blogPost.date}
        </div>
      </header>

      <section className="mb-8">
        <div className="prose max-w-none">{blogPost.content}</div>
      </section>

      <footer className="text-gray-600 mt-8">
        <p>&copy; 2025 Chatbot Insights</p>
      </footer>
    </div>
  );
}