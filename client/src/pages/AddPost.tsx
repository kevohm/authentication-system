import { useState } from "react";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "@tanstack/react-router";
import { AxiosError } from "axios";
import { CustomErrorResponse } from "../types/axios.types";
import { toast } from "react-toastify";

function AddPost() {
  const { axiosClient } = useAuth();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e:React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await axiosClient.post("/posts", {
        title,
        content,
        published: true, // Assuming posts are published by default
      });
      toast.success("Post successfully created")
      navigate({to:"/posts"});
    } catch (error) {
        const err = error as AxiosError<CustomErrorResponse>

      toast.error(err.response?.data?.message || "An error occurred")
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-full w-full px-10 bg-gray-100">
      <header className="flex justify-between text-black py-6">
        <h1 className="text-3xl font-bold text-center">Add Post</h1>
      </header>
      <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md">
        {error && <p className="text-red-500 mb-4">{error}</p>}
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
          <button
            type="submit"
            className="px-4 py-2 text-white bg-indigo-600 rounded-lg hover:bg-indigo-700"
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddPost;
