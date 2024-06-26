import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../api/axios";

function ChangePassword() {

  const passwordRef = useRef();
  const conpasswordRef = useRef();

  return (
    <div>
      <div>
        <input
          ref={passwordRef}
          id="password"
          placeholder="password"
          className="my-5 p-2 w-80   bg-black rounded-md text-white font-Akshar text-2xl "
        />
      </div>
      <div>
        <input
          ref={conpasswordRef}
          id="conpassword"
          placeholder="confirm password"
          className="mb-5 p-2 w-80   bg-black rounded-md text-white font-Akshar text-2xl "
        />
      </div>
    </div>
  );
}

export default ChangePassword;