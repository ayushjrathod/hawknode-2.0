import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import axios from "../../api/axios";

function Register() {
  const { auth } = useAuth();

  const [file, setFile] = useState(null);
  const [displayFile, setDisplayFile] = useState(null);

  const navigate = useNavigate();
  
  const handleChange = async (e) => {
    setDisplayFile(URL.createObjectURL(e.target.files[0]));
    setFile(e.target.files[0]);
  };

  //User data Ref
  const fullnameRef = useRef();
  const emailRef = useRef();
  const avatarRef = useRef();


  //error ref
  const errorRef = useRef();
  const [errorMsg, setErrorMsg] = useState(null);
  useEffect(() => {
    setErrorMsg("");
  }, [
    fullnameRef,
    emailRef,
    avatarRef,
  ]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (
      !fullnameRef.current.value ||
      !emailRef.current.value ||
      !avatarRef.current.value
    ) {
      setErrorMsg("All fields are required");
      return;
    }

    const formData = new FormData();
    formData.append("avatar", file);
    formData.append("oldAvatar", auth.user.avatar);
    formData.append("userId", auth.user._id);
    formData.append("fullname", fullnameRef.current.value);
    formData.append("email", emailRef.current.value);

    axios
      .patch("/v1/users/update-account-details", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          withCredentials: true,
        },
      })
      .then((response) => {
        console.log(JSON.stringify(response));
        navigate("/user/admin", { replace: true });
      })
      .catch((error) => {
        console.error(error);

        if (!error?.response) {
          setErrorMsg("No Server Response");
        } else if (error.response?.status === 409) {
          setErrorMsg("Username Taken");
        } else {
          setErrorMsg("Registration Failed");
        }
        errorRef.current.focus();
      });
  };

  return (
        <div className="my-44 lg:flex flex flex-col lg:items-center items-center justify-between overflow-scroll">
          <div className=" w-screen h-screen mx-4 my-2">
            <form
              className="bg-gray-200 drop-shadow-2xl rounded-md p-6 mx-24"
              onSubmit={handleSubmit}
            >
            <p className="font-Akshar text-3xl mb-4">Update Profile Details</p>
              <p ref={errorRef} className={errorMsg ? "errormsg" : "offscreen"}>
                {errorMsg}
              </p>
              <div className="flex justify-between">
              <div className="w-80 h-40 p-2 bg-black rounded-md text-white font-Akshar text-2xl flex justify-between">
                <div className="items-center">
                  <label htmlFor="avatar">Upload Avatar</label>
                </div>
                <input
                  ref={avatarRef}
                  id="avatar"
                  name="avatar"
                  type="file"
                  accept="image/*"
                  onChange={handleChange}
                  className="hidden"
                />
                <img
                  src={displayFile}
                  htmlFor="avatar"
                  className=" flex justify-center rounded-full m-2 w-28 h-28  border-4"
                />
              </div>
              <div className="py-6">
              <div>
                <input
                  ref={fullnameRef}
                  id="fullname"
                  placeholder="Full Name"
                  className="w-80  p-2  bg-black rounded-md text-white font-Akshar text-2xl mb-2 "
                />
              </div>
              <div>
                <input
                  ref={emailRef}
                  id="Email"
                  placeholder="Email"
                  className="w-80  p-2  bg-black rounded-md text-white font-Akshar text-2xl my-2"
                />
              </div>
              </div>
              <button className="w-80  justify-cen text-white text-[25px] font-semibold font-['Akshar'] bg-slate-900 rounded-lg px-5 py-1">
                Update Details
              </button>  
              </div>
            </form>
          </div>
        </div>
  );
}

export default Register;
