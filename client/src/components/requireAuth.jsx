import { useLocation, Navigate,Outlet } from "react-router-dom";
import {useAuth} from "../hooks/useAuth.jsx";
import Home from "./home.jsx";
import Layout from "./layout.jsx";

const RequireAuth = () => {
  const { auth } = useAuth();
  const location = useLocation();

  return auth?.user 
    ? <Outlet />
    : (<Navigate to="/login" state={{ from: location }} replace />);
};

export default RequireAuth;
