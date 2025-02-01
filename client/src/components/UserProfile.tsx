import { AxiosError } from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import useAuth from "../hooks/useAuth";
import { CustomErrorResponse } from "../types/axios.types";
import { User } from "../types/user.types";
import { formatTime, formatTimeDuration } from "../utils/time.utile";

interface Props {
  userId: string | undefined;
}

const UserProfile: React.FC<Props> = ({ userId }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { axiosClient } = useAuth();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axiosClient.get(`/users/${userId}`);

        setUser(response.data.user);
      } catch (error) {
        const err = error as AxiosError<CustomErrorResponse>;
        setError("Error");
        toast.error(err.response?.data?.message || "An error occurred"); // Show error toast
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [userId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <></>;
  }

  if (!user) {
    return <div>User not found</div>;
  }

  return (
    <div className="flex flex-col space-y-5">
      <header className="flex justify-between">
        <h1 className="text-3xl font-bold text-center">{`${user.first_name} ${user.last_name}`}</h1>

        <button
          onClick={() => alert("Edit profile clicked")}
          className="bg-[rgba(0,0,0,1)] text-white px-4 py-2 rounded-md hover:bg-[rgba(0,0,0,.95)] transition duration-300"
        >
          Edit
        </button>
      </header>
      <div className="flex space-x-5">
        <div className="flex flex-col space-y-2 w-40">
          <p>Email:</p>
          <p>Joined:</p>
          <p>Last Updated:</p>
        </div>
        <div className="flex flex-col space-y-2">
          <p>{user.email}</p>
          <p>{formatTime(user.createdAt)}</p>
          <p>{formatTimeDuration(user.createdAt)}</p>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
