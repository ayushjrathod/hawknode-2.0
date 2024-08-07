import axios from "../api/axios";
import useAuth from "../hooks/useAuth";

const useRefreshToken = () => {
  const { setAuth } = useAuth();
  
const refresh = async () => {
    const response = await axios.get("/v1/users/refresh-token", {
      withCredentials: true,
    });
    setAuth((prev) => {
      const newAuth = { ...prev, accessToken: response.data.data.accessToken };
      localStorage.setItem("auth", JSON.stringify(newAuth)); // Persist new auth state
      return newAuth;
    });

      return response.data.data.accessToken;
} 
return refresh;
};

export default useRefreshToken;