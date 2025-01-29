import React, { useState, FormEvent } from "react";
import axios from "axios";

const Login: React.FC = () => {
    // const base_url = import.meta.env.VITE_BASE_URL;
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      // Step 1: Fetch CSRF Token
      const csrfResponse = await axios.get<{ csrfToken: string }>(
        "http://localhost:3000/auth/csrf",
        {
          withCredentials: true, // Ensures cookies are sent
        }
      );
      const csrfToken = csrfResponse.data.csrfToken;

      // Step 2: Sign In
      const response = await axios.post(
        "http://localhost:3000/auth/signin/credentials",
        {
          username,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "X-CSRF-Token": csrfToken,
          },
          withCredentials: true, // Include cookies for the session
        }
      );

      if (response.status === 200) {
        setSuccess("Logged in successfully!");
        setError("");
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || "Invalid credentials or server error.");
      } else {
        setError("An unexpected error occurred.");
      }
      setSuccess("");
    }
  };

  return (<div className="w-full max-w-md p-6 bg-white rounded shadow">
    <h2 className="mb-6 text-2xl font-bold text-center text-gray-800">Login</h2>
    <form onSubmit={handleLogin} className="space-y-4">
      <div>
        <label htmlFor="username" className="block text-sm font-medium text-gray-700">
          Username
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
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
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
    {error && <p className="mt-4 text-sm text-red-500">{error}</p>}
    {success && <p className="mt-4 text-sm text-green-500">{success}</p>}
  </div>
  );
};

export default Login;
