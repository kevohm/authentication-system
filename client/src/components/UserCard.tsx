import { AxiosError } from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import useAuth from "../hooks/useAuth";
import { CustomErrorResponse } from "../types/axios.types";
import { User } from "../types/user.types";
import { Link } from "@tanstack/react-router";


interface Props {
  userId: string;
}

const UserCard: React.FC<Props> = ({ userId }) => {
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
        setError("Error")
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

  return <Link to="/"><h2>{`${user.first_name} ${user.last_name}`}</h2></Link>
};

export default UserCard;
