import { useContext,useDebugValue   } from "react";
import AuthContext from "../context/authProvider.jsx";

function useAuth(){
    const {auth} = useContext(AuthContext);
    useDebugValue(auth,auth => auth?.user ? "Logged In" : "Logged Out"); //giving labels
    return useContext(AuthContext);
}

export {useAuth};