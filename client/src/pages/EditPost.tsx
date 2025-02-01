import { useNavigate, useParams } from "@tanstack/react-router";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import { ApiDataResponse, CustomErrorResponse } from "../types/axios.types";
import { Post } from "../types/post.types";
import { toast } from "react-toastify"; // Import Toastify

function EditPost() {
  const { axiosClient } = useAuth();
  const navigate = useNavigate();
  const { postId } = useParams({ strict: false });
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [published, setPublished] = useState(false); // State for publish status
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    axiosClient
      .get<ApiDataResponse<"post", Post>>(`/posts/${postId}`)
      .then((response) => {
        setTitle(response.data.post.title);
        setContent(response.data.post.content);
        setPublished(response.data.post.published); // Set initial publish status
      })
      .catch((err: AxiosError<CustomErrorResponse>) => {
        toast.error(err.response?.data?.message || "An error occurred"); // Show error toast
      });
  }, [postId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axiosClient.put(`/posts/${postId}`, {
        title,
        content,
        published, // Include publish status in the update
      });
      toast.success("Post updated successfully!"); // Success toast
      navigate({ to: "/posts" });
    } catch (error) {
      const err = error as AxiosError<CustomErrorResponse>;
      toast.error(err.response?.data?.message || "An error occurred"); // Show error toast
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-full w-full px-10 bg-gray-100">
      <header className="flex justify-between text-black py-6">
        <h1 className="text-3xl font-bold text-center">Edit Post</h1>
      </header>
      <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Title</label>
            <input
              type="text"
              className="w-full p-2 border rounded-lg"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Content</label>
            <textarea
              className="w-full p-2 border rounded-lg"
              rows={5}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            ></textarea>
          </div>
          <div className="mb-4">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={published}
                onChange={(e) => setPublished(e.target.checked)}
                className="h-4 w-4 text-indigo-600"
              />
              <span className="text-gray-700">Publish Post</span>
            </label>
          </div>
          <button
            type="submit"
            className="px-4 py-2 text-white bg-indigo-600 rounded-lg hover:bg-indigo-700"
            disabled={loading}
          >
            {loading ? "Updating..." : "Update"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditPost;