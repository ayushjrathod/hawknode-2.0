import { useLocation, Navigate,Outlet } from "react-router-dom";
import {useAuth} from "../hooks/useAuth.jsx";
import Cookies from "universal-cookie";

const RequireAuth = () => {
  const { auth } = useAuth();
  const location = useLocation();
  const cookies = new Cookies();
 
  //console.log(`this is requireAuth print ${auth.user}`)
  return (
  cookies.get("user") 
  ? <Outlet /> 
  : cookies.get("accessToken") //changed from user to accessToken to persist login after refresh
  ? <Navigate to="/unauthorized" state={{ from: location }} replace />
  : <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default RequireAuth;
