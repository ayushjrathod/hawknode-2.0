import axios from "../api/axios";
import {useAuth} from "../hooks/useAuth";

const useRefreshToken = () => {
  const { auth,setAuth } = useAuth();
  
  //const {auth} = useContext(AuthContext);

  const refreshToken =auth?.refreshToken;
  console.log(`the refresh token ${refreshToken}`);
  console.log(auth.refreshToken)
 console.log(`the access token ${auth.accessToken}`);  

const refresh = () => {
  axios
    .post("/v1/users/refresh-token",{refreshToken})
    .then((response) => {
      setAuth((prev) => {
        console.log(JSON.stringify(prev));
        console.log(response.data.data.accessToken);
        return { ...prev, accessToken: response.data.data.accessToken };
      });
      return response.data.data.accessToken;
    })
    .catch((error) => {
      console.error(error);
    });
};

return refresh;
};

export default useRefreshToken;