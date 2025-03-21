import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import { Post } from "../types/post.types";
import SinglePost from "../components/SinglePost";
import { ApiDataResponse } from "../types/axios.types";



function Posts() {
  const { axiosClient } = useAuth();
  const [posts, setPosts] = useState<Post[]>([]); // Specify the type for posts
  const [loading, setLoading] = useState<boolean>(true); // Specify the type for loading
  const [error, setError] = useState<string | null>(null); // Specify the type for error

  useEffect(() => {
    // Fetch posts from the backend
    axiosClient
      .get<ApiDataResponse<"posts",Post[]>>(`/posts`) // Specify the response type for axios
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
    <div className="h-full w-full px-10 bg-gray-100">
      <header className="flex justify-between text-black py-6">
        <h1 className="text-3xl font-bold text-center">Posts</h1>

        <Link
          to="/posts/add"
          className="px-4 py-2 my-5 text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-indigo-500"
        >
          Add Post
        </Link>
      </header>
      <div className="container mx-auto">
        <div className="grid grid-col-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {posts.map((post) => <SinglePost {...post}/>)}
        </div>
      </div>
    </div>
  );
}

export default Posts;
