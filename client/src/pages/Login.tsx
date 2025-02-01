import { Link, useNavigate } from "@tanstack/react-router";
import { AxiosError } from "axios";
import React, { FormEvent, useState } from "react";
import useAuth from "../hooks/useAuth";
import { CustomErrorResponse } from "../types/axios.types";
import { toast } from "react-toastify";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { axiosClient } = useAuth();
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await axiosClient.post(
        `/auth/login`,
        { email: username, password },
        {
          withCredentials: true,
        }
      );
      toast.success("Successfully Logged In"); 
      setTimeout(() => navigate({ to: "/posts", reloadDocument:true }), 3000);
    } catch (error) {
      const e = error as AxiosError<CustomErrorResponse>;
      let message = "Login Failed";
      if (e?.response?.data) {
        message = e.response?.data?.message;
      }
       toast.error(message); 
    }
  };

  return (
    <div className="w-96 my-10 p-6 bg-white rounded-lg shadow">
      <h2 className="mb-6 text-2xl font-bold text-center text-gray-800">
        Login
      </h2>
      <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <label
            htmlFor="username"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring focus:ring-indigo-500"
          />
        </div>
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring focus:ring-indigo-500"
          />
        </div>
        <button
          type="submit"
          className="w-full px-4 py-2 text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-indigo-500"
        >
          Login
        </button>
      </form>
      <p className="mt-4 text-center text-sm text-gray-600">
        Don't have an account?{" "}
        <Link to="/register" className="text-indigo-600 hover:underline">
          Register
        </Link>
      </p>
    </div>
  );
};

export default Login;
