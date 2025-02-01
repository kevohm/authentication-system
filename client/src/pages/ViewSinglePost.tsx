import { Link, useNavigate, useParams } from "@tanstack/react-router";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import UserCard from "../components/UserCard";
import useAuth from "../hooks/useAuth";
import { CustomErrorResponse } from "../types/axios.types";
import { Post } from "../types/post.types";
import { formatTimeDuration } from "../utils/time.utile";

interface ApiResponse {
  post: Post;
}

function ViewSinglePost() {
  const { axiosClient } = useAuth();
  const { postId } = useParams({ strict: false });
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  // const { axiosClient } = useAuth();
  const [deleteLoading, setDeleteLoading] = useState(false);
  const navigate = useNavigate();

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;
    setDeleteLoading(true);

    try {
      await axiosClient.delete(`/posts/${postId}`);
      toast.success("Post deleted successfully!");
      navigate({ to: "/posts" });
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      toast.error(err.response?.data?.message || "An error occurred");
    } finally {
      setDeleteLoading(false);
    }
  };

  useEffect(() => {
    axiosClient
      .get<ApiResponse>(`/posts/${postId}`)
      .then((response) => {
        console.log(response);
        setPost(response.data.post);
        setLoading(false);
      })
      .catch((error) => {
        const err = error as AxiosError<CustomErrorResponse>;
        setError(err.response?.data?.message || "An error occurred");
        setLoading(false);
      });
  }, [postId]);

  if (loading) return <div className="text-center mt-8">Loading...</div>;
  if (error || !post)
    return (
      <div className="text-center mt-8 text-red-500">
        Oops! Network Error or Post was deleted
      </div>
    );

  return (
    <div className="h-full w-full p-10 bg-gray-100">
      <div className="h-full bg-white flex flex-col justify-between p-5 rounded-lg shadow-md">
        <div className="h-full w-full flex flex-col ">
          <header className="flex items-center justify-between text-black">
            <div className="flex flex-col space-y-2">
              <h1 className="text-2xl font-bold">{post.title}</h1>
              <p className="text-sm flex space-x-2 items-center text-gray-500">
                <UserCard userId={post.authorId} />
                <span>
                  <svg height="4" width="4" xmlns="http://www.w3.org/2000/svg">
                    <circle r="2" cx="2" cy="2" fill="gray" />
                  </svg>
                </span>
                <span title="Last Edited">{formatTimeDuration(post.updatedAt)}</span>
                <span>
                  <svg height="4" width="4" xmlns="http://www.w3.org/2000/svg">
                    <circle r="2" cx="2" cy="2" fill="gray" />
                  </svg>
                </span>
                <span>{post.published?"Published":"Not published"}</span>
              </p>
            </div>
            {
              post.published ||   <button
              onClick={handleDelete}
              disabled={deleteLoading}
              className="px-4 py-2 text-white bg-green-600 rounded-lg hover:bg-green-700 focus:outline-none focus:ring focus:ring-green-500 disabled:opacity-50"
            >
              {deleteLoading ? "Publishing..." : "Publish"}
            </button>
            }
          
          </header>
          <hr className="my-5" />

          <p className="text-gray-700 ">{post.content}</p>
        </div>
        <div className="flex flex-col space-y-5">
          <hr />
          <div className="flex items-center justify-between">
            <Link
              to="/posts/edit/$postId"
              params={{ postId: post.id }}
              className="px-4 py-2 text-white bg-[rgba(0,0,0,1)] rounded-lg hover:bg-[rgba(0,0,0,.9)] focus:outline-none focus:ring focus:ring-[rgba(0,0,0,.3)]"
            >
              Edit
            </Link>
            <button
              onClick={handleDelete}
              disabled={deleteLoading}
              className="px-3 py-2  text-white bg-red-600 rounded-lg hover:bg-red-700 focus:outline-none focus:ring focus:ring-red-500 disabled:opacity-50"
            >
              {deleteLoading ? "Deleting..." : "Delete"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewSinglePost;
