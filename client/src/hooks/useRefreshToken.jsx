import Cookies from "universal-cookie";
import axios from "../api/axios";
import {useAuth} from "../hooks/useAuth";

const useRefreshToken = () => {
  const { auth,setAuth } = useAuth();
  const cookies = new Cookies();
  
//console.log(`this is ref 1 print ${cookies.get("refreshToken")}`);
const refresh = () => {
  axios
    .get("/v1/users/refresh-token", {
      withCredentials: true,
    })
    .then((response) => {

      setAuth((prev) => {
        return { ...prev, accessToken: response.data.data.accessToken };
      });
      
      cookies.set("accessToken", response.data.data.accessToken, { path: "/", sameSite: "none", secure: true });
      cookies.set("refreshToken", response.data.data.refreshToken, { path: "/", sameSite: "none", secure: true });

      // console.log(`this is cookie rt ${cookies.get("refreshToken")}`);
      // console.log(`The auth rt ${auth.refreshToken}`);
      // console.log(`this is cookie at ${cookies.get("refreshToken")}`);
      // console.log(`The auth at ${auth.accessToken}`);
      

      return response.data.data.accessToken;
    })
    .catch((error) => {
      console.error(error);
    });
};

return refresh;
};

export default useRefreshToken;