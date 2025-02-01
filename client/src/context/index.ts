import { createContext } from "react";
import { AppContextType } from "../types/context.types";

export const AppContext = createContext<AppContextType | undefined>(undefined);
