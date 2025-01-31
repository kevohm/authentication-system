import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";

// Define the type for a single post
interface Post {
  id: number;
  title: string;
  content: string;
  author: {
    email: string;
  };
  published: boolean;
}

interface ApiResponse {
  posts: Post[];
}

function Posts() {
  const { axiosClient } = useAuth();
  const [posts, setPosts] = useState<Post[]>([]); // Specify the type for posts
  const [loading, setLoading] = useState<boolean>(true); // Specify the type for loading
  const [error, setError] = useState<string | null>(null); // Specify the type for error

  useEffect(() => {
    // Fetch posts from the backend
    axiosClient
      .get<ApiResponse>(`/posts`) // Specify the response type for axios
      .then((response) => {
        setPosts(response.data.posts);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []); // Add base_url as a dependency

  if (loading) return <div className="text-center mt-8">Loading...</div>;
  if (error)
    return <div className="text-center mt-8 text-red-500">Error: {error}</div>;

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-violet-600 text-white py-6">
        <h1 className="text-3xl font-bold text-center">Posts Page</h1>
      </header>
      <div className="container mx-auto p-4">
        <div className="grid gap-6">
          {posts.map((post) => (
            <div key={post.id} className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-semibold text-violet-600">
                {post.title}
              </h2>
              <p className="mt-2 text-gray-700">{post.content}</p>
              <p className="mt-4 text-sm text-gray-500">
                <strong>Author:</strong> {post.author.email}
              </p>
              <p className="text-sm text-gray-500">
                <strong>Published:</strong> {post.published ? "Yes" : "No"}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Posts;
