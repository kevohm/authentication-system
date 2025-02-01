import { AxiosInstance } from "axios";
import { User } from "./user.types";


export interface AppContextType {
  user: User | null;
  logout: () => void;
  axiosClient: AxiosInstance;
}
