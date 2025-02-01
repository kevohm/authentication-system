import { useNavigate } from "@tanstack/react-router";
import { AxiosError } from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";
import UserProfile from "../components/UserProfile"; // Adjust the import path as needed
import useAuth from "../hooks/useAuth";
import SingleUserPosts from "./SingleUserPosts";

const Profile: React.FC = () => {
  const { user, logout, axiosClient } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;
    setLoading(true);

    try {
      await axiosClient.delete(`/user/${user?.id}`);
      toast.success("Account deleted successfully!");
      navigate({ to: "/" });
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      toast.error(err.response?.data?.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full flex flex-col space-y-5 my-10 px-4 sm:px-6 lg:px-8">
      <div className="bg-white flex flex-col space-y-5 w-full shadow-md rounded-lg p-6 ">
        {/* Display the UserCard component */}
        <UserProfile userId={user?.id} />
        <hr />
        {/* Additional profile details or actions */}
        <div className="mt-6 flex justify-between space-x-4">
          <button
            onClick={logout}
            className="bg-[rgba(0,0,0,1)] text-white px-4 py-2 rounded-md hover:bg-[rgba(0,0,0,.95)] transition duration-300"
          >
            Logout
          </button>
          <button
            onClick={handleDelete}
            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-300"
          >
            {loading ? "Deleting Account..." : "Delete Account"}
          </button>
        </div>
      </div>
      <SingleUserPosts userId={user?.id}/>
    </div>
  );
};

export default Profile;
