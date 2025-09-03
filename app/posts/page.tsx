import React from 'react';

interface Post {
  id: string;
  title: string;
  content: string | null;
  author: {
    name: string | null;
  };
}

export default async function PostsPage() {
  let posts: Post[] = [];
  let error: string | null = null;

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/blog`, {
      cache: 'no-store', // Ensure data is always fresh
    });
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    posts = await res.json();
  } catch (e: any) {
    error = e.message;
    console.error('Failed to fetch posts:', e);
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Blog Posts</h1>
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Error:</strong>
          <span className="block sm:inline"> {error}</span>
        </div>
      )}
      {posts.length === 0 && !error && (
        <p>No posts found.</p>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <div key={post.id} className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
            <p className="text-gray-700 mb-4">{post.content}</p>
            {post.author && (
              <p className="text-gray-600 text-sm">Author: {post.author.name}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}