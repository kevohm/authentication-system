// src/context/AppContext.tsx
import axios from "axios";
import React, { ReactNode, useEffect, useState } from "react";
import { User } from "../types/user.types";
import { AppContext } from ".";
import { ApiDataResponse } from "../types/axios.types";

export const AppProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const base_url = import.meta.env.VITE_BASE_URL;
  const axiosClient = axios.create({
    baseURL: base_url,
    withCredentials: true,
  });
  const [user, setUser] = useState<User | null>(null);

  const fetchUser = async () => {
    try {
      const { data } = await axiosClient.get<ApiDataResponse<"user", User>>("/auth/me");
      setUser(data.user);
    } catch (error) {
      setUser(null);
      if (!["/", "/login", "/register"].includes(location.pathname)) {
        location.href = "/login";
      }
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const logoutUser = async () => {
    try {
      await axiosClient.post("/auth/logout");
      setUser(null);
    } catch (error) {
      console.log(error);
    } finally {
      setUser(null);
      if (!["/", "/login", "/register"].includes(location.pathname)) {
        location.href = "/login";
      }
    }
  };

  return (
    <AppContext.Provider value={{ user, logout: logoutUser, axiosClient }}>
      {children}
    </AppContext.Provider>
  );
};

