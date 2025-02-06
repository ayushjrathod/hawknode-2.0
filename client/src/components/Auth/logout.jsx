import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import axios from "../../api/axios";

function Logout() {
  const navigate = useNavigate();
  console.log(Cookies.get());

  const handleClick = async (e) => {
    e.preventDefault();

    axios
      .get("/v1/users/logout")
      .then((response) => {
        if (response.status == 200) {
          Cookies.set("accessToken", "", { path: "/" });
          navigate("/landing");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <button className="text-black" onClick={handleClick}>
        Log Out
      </button>
    </>
  );
}

export default Logout;
