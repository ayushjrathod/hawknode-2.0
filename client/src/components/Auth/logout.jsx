import axios from "../../api/axios";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";

function Logout() {
  const cookies = new Cookies();
  const navigate = useNavigate();

  const handleClick = async (e) => {
    e.preventDefault();

    const user = cookies.get("user");

    axios
      .post("/v1/users/logout", user)
      .then((response) => {
        if (response.status == 200) {
          //console.log(response);
          cookies.set("accessToken", null, {
            path: "/",
            sameSite: "none",
            secure: true,
          });
          cookies.set("refreshToken", null, {
            path: "/",
            sameSite: "none",
            secure: true,
          });
          cookies.set("user", null, {
            path: "/",
            sameSite: "none",
            secure: true,
          });
          navigate("/");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <button onClick={handleClick}>
        Log Out
      </button>
    </>
  );
}

export default Logout;
