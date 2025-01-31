import {useContext} from "react"
import {AppContext, AppContextType } from "../context/AppProvider";

const useAuth = () => useContext(AppContext) as AppContextType;

export default useAuth;
