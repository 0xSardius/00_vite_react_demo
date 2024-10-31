import React, { useState, useEffect } from "react";

const BASE_URL = "https://jsonplaceholder.typicode.com";

type Post = {
  id: number;
  title: string;
  body: string;
};

function App() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`${BASE_URL}/posts`);
      const posts = (await response.json()) as Post[];
      setPosts(posts);
    };
    fetchPosts();
  }, []);

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {posts.map((post) => (
          <div
            key={post.id}
            className="bg-white shadow-lg rounded-lg p-6 mb-6 hover:shadow-xl transition duration-300"
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              {post.title}
            </h2>
            <p className="text-gray-600 leading-relaxed">{post.body}</p>
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
