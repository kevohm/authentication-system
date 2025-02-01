import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import SinglePost from "../components/SinglePost";
import useAuth from "../hooks/useAuth";
import { ApiDataResponse } from "../types/axios.types";
import { Post } from "../types/post.types";

interface props {
  userId: string | undefined;
}

const SingleUserPosts = ({ userId }: props) => {
  const { axiosClient } = useAuth();
  const [posts, setPosts] = useState<Post[]>([]); // Specify the type for posts
  const [loading, setLoading] = useState<boolean>(true); // Specify the type for loading
  const [error, setError] = useState<string | null>(null); // Specify the type for error

  useEffect(() => {
    // Fetch posts from the backend
    axiosClient
      .get<ApiDataResponse<"posts", Post[]>>(`/posts/by/${userId}`) // Specify the response type for axios
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
    <div className="flex flex-col space-y-5 w-full ">
      <header className="flex items-center justify-between text-black">
        <h1 className="text-2xl font-bold text-center">Your Posts</h1>
        <Link
          to="/posts/add"
          className="px-4 py-2 my-5 text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-indigo-500"
        >
          Add Post
        </Link>
      </header>
      <div className="grid grid-col-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {posts.map((post) => (
          <SinglePost {...post} />
        ))}
      </div>
    </div>
  );
};

export default SingleUserPosts;
