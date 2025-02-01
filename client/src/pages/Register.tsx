import { useNavigate } from "@tanstack/react-router";
import { AxiosError } from "axios";
import React, { FormEvent, useState } from "react";
import useAuth from "../hooks/useAuth";
import { CustomErrorResponse } from "../types/axios.types";

const Register: React.FC = () => {
  const navigate = useNavigate();
  const { axiosClient } = useAuth();
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    confirm_password: "",
    role: "user", // Default role
  });
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleSignup = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSuccess("");
    setError("");
    if (formData.password !== formData.confirm_password) {
      setError("Passwords do not match");
      return;
    }
    try {
      await axiosClient.post(
        `/auth/signup`,
        { ...formData }
      );
      setSuccess("Account successfully created");
      setTimeout(() => navigate({ to: "/login", replace: true }), 3000);
    } catch (error) {
      const e = error as AxiosError<CustomErrorResponse>
      let message = "Signup Failed";
      if (e?.response?.data) {
        message = e.response?.data?.message;
      }
      setError(message);
    }
  };

  return (
    <div className="w-full my-10 max-w-[600px] p-6 bg-white rounded-lg shadow">
      <h2 className="mb-6 text-2xl font-bold text-center text-gray-800">
        Sign Up
      </h2>
      <form
        onSubmit={handleSignup}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            First Name
          </label>
          <input
            name="first_name"
            type="text"
            value={formData.first_name}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring focus:ring-indigo-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Last Name
          </label>
          <input
            name="last_name"
            type="text"
            value={formData.last_name}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring focus:ring-indigo-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring focus:ring-indigo-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Role
          </label>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring focus:ring-indigo-500"
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <div className="relative">
            <input
              name="password"
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring focus:ring-indigo-500"
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-3 top-3 text-gray-600"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Confirm Password
          </label>
          <div className="relative">
            <input
              name="confirm_password"
              type={showConfirmPassword ? "text" : "password"}
              value={formData.confirm_password}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring focus:ring-indigo-500"
            />
            <button
              type="button"
              onClick={toggleConfirmPasswordVisibility}
              className="absolute right-3 top-3 text-gray-600"
            >
              {showConfirmPassword ? "Hide" : "Show"}
            </button>
          </div>
        </div>
        
        </div>
        <button
          type="submit"
          className="w-full px-4 py-2 my-5 text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-indigo-500"
        >
          Sign Up
        </button>
      </form>
      {error && <p className="mt-4 text-sm text-red-500">{error}</p>}
      {success && <p className="mt-4 text-sm text-green-500">{success}</p>}
      <p className="mt-4 text-center text-sm text-gray-600">
        Already have an account?{" "}
        <a href="/login" className="text-indigo-600 hover:underline">
          Log in
        </a>
      </p>
    </div>
  );
};

export default Register;
