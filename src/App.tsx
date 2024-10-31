import React, { useState, useEffect, useRef } from "react";

const BASE_URL = "https://jsonplaceholder.typicode.com";

type Post = {
  id: number;
  title: string;
  body: string;
};

function App() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [page, setPage] = useState(0);

  const abortControllerRef = useRef<AbortController | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      // Abort request if it exists
      abortControllerRef.current?.abort();
      abortControllerRef.current = new AbortController();

      setIsLoading(true);

      try {
        const response = await fetch(`${BASE_URL}/posts?page=${page}`, {
          signal: abortControllerRef.current?.signal,
        });
        const posts = (await response.json()) as Post[];
        setPosts(posts);
      } catch (error: any) {
        if (error.name === "AbortError") {
          console.log("Request aborted");
          return;
        }
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPosts();
  }, [posts]);

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <button onClick={() => setPage(page + 1)}>Increase Page {page}</button>
        {isLoading && <div>Loading...</div>}
        {!isLoading &&
          posts.map((post) => (
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
