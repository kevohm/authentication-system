// src/context/AppContext.tsx
import { AxiosInstance } from 'axios';
import axios from 'axios';
import React, { createContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
}


export interface AppContextType {
  user: User | null;
  axiosClient: AxiosInstance;
}

const AppContext = createContext<AppContextType | undefined>(undefined);


const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const base_url = import.meta.env.VITE_BASE_URL;
  const axiosClient = axios.create({baseURL:base_url, withCredentials: true});
  const [user, setUser] = useState<User | null>(null);

  const fetchUser = async () => {
    try {
      const {data} = await axiosClient.get('/auth/me')
      setUser(data)
    } catch (error) {
      setUser(null)
      if(!["/","/login","/register"].includes(location.pathname)){
        location.href = "/login"
      }
      console.log(error)
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <AppContext.Provider value={{ user, axiosClient}}>
      {children}
    </AppContext.Provider>
  );
};


export { AppProvider, AppContext};
