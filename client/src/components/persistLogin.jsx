import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import useRefreshToken from "../hooks/useRefreshToken";
import { useAuth } from "../hooks/useAuth";
import Cookies from "universal-cookie";

const PersistLogin = () => {
  const [isLoading, setIsLoading] = useState(true);
  const refresh = useRefreshToken();
  const { auth, persist } = useAuth();
  const cookies = new Cookies();         

  useEffect(() => {
    let isMounted = true;

    const verifyRefreshToken = async () => {
      try {
        refresh();
      } catch (err) {
        console.error(err);
      } finally {
        isMounted && setIsLoading(false);
      }
    };

    
      // console.log(`this is cookie rt ${cookies.get("refreshToken")}`);
      // console.log(`The auth rt ${auth.refreshToken}`);
      // console.log(`this is cookie at ${cookies.get("accessToken")}`);
      // console.log(`The auth at ${auth.accessToken}`);
      
    
          



    if (!cookies.get("accessToken") && persist) {
      verifyRefreshToken();
    } else {
      setIsLoading(false);
    }

    return () => isMounted = false;
  }, []);

      // useEffect(() => {
      //   console.log(`isLoading: ${isLoading}`);
      //   console.log(`aT: ${JSON.stringify(cookies.get("accessToken"))}`);
      // }, [isLoading]);

  return (
    <>
      {!persist
       ? <Outlet />
       : isLoading 
          ? <p>Loading...</p> 
          : <Outlet />}
    </>
  );
};

export default PersistLogin;
