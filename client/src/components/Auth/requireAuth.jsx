import { useLocation, Navigate,Outlet } from "react-router-dom";
import useAuth from "../../hooks/useAuth.jsx";

const RequireAuth = () => {
  const { auth } = useAuth();
  const location = useLocation();
 
  //console.log(`this is requireAuth print ${auth.user}`)
  return (
  auth?.user
  ? <Outlet /> 
  : <Navigate to="/login" state={{ from: location }} replace />
  );  
};

export default RequireAuth;
