import { useContext,useDebugValue   } from "react";
import authContext from "../context/authProvider.jsx";

function useAuth(){
    const {auth} = useContext(authContext);
    useDebugValue(auth,auth => auth?.user ? "Logged In" : "Logged Out"); //giving labels
    return useContext(authContext);
}

export {useAuth};