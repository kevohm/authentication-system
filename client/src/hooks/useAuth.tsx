import {useContext} from "react"
import { AppContext } from "../context";
import { AppContextType } from "../types/context.types";


const useAuth = () => useContext(AppContext) as AppContextType;

export default useAuth;
