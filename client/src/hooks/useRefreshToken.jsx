import axios from "../api/axios";
import {useAuth} from "../hooks/useAuth";

const useRefreshToken = () => {
  const { auth,setAuth } = useAuth();
  
  //const {auth} = useContext(AuthContext);

  const refreshToken = auth?.refreshToken;
  

  const refresh = async () => {
    const response = await axios.post("/v1/users/refresh-token",refreshToken);
    setAuth((prev) => {
      console.log(JSON.stringify(prev));
      console.log(response.data.data.accessToken);
      return { ...prev, accessToken: response.data.data.accessToken };
    });
    return response.data.accessToken;
  };
  return refresh;
};

export default useRefreshToken;