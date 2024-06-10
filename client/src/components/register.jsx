import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import axios from "../api/axios";

function Register() {
  const [file, setFile] = useState(null);
  
  const handleChange = async (e) => {
    // setActualFilePath(e.target.value);  //no way to get around fakpath
    // console.log(e.target.value);
    setFile(URL.createObjectURL(e.target.files[0]));
  };

  console.log(file)
  const fullnameRef = useRef();
  const usernameRef = useRef();
  const emailRef = useRef();
  const avatarRef = useRef();
  const coverImageRef = useRef();
  const passwordRef = useRef();
  const conpasswordRef = useRef();

  const handleSubmit = async (event) => {
    event.preventDefault();


    if (!fullnameRef.current.value || !usernameRef.current.value || !emailRef.current.value || !passwordRef.current.value || !conpasswordRef.current.value || !avatarRef.current.value) {
      console.log('All fields are required');
      return;
    }
    if(passwordRef.current.value!=conpasswordRef.current.value){
      console.log("passwords do not match");
      return;
    }
      

    // const data = {
    //   avatar: file,
    //   fullname: fullnameRef.current.value,
    //   username: usernameRef.current.value,
    //   email: emailRef.current.value,
    //   password: passwordRef.current.value,
    // };

    //Another way instead of useRef
    // const formData = new FormData();
    // formData.append('avatar', file);
    // formData.append('fullname', fullnameRef.current.value);
    // formData.append('username', usernameRef.current.value);
    // formData.append('email', emailRef.current.value);
    // formData.append('password', passwordRef.current.value);
    // formData.append('conpassword', conpasswordRef.current.value);

        const formData = new FormData();
        formData.append("avatar", file); 
        formData.append("fullname", fullnameRef.current.value);
        formData.append("username", usernameRef.current.value);
        formData.append("email", emailRef.current.value);
        formData.append("password", passwordRef.current.value);    

      axios
        .post("/v1/users/register", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          console.log(JSON.stringify(response));
        })
        .catch((error) => {
          console.error(error); // Use console.error for error messages
        });
        
  };

  return (
    <div className="w-screen h-screen bg-yellow-400 lg:inline-flex lg:flex-row flex flex-col lg:items-center items-center justify-between overflow-scroll">
      <div className="hidden lg:block w-1/5 h-screen  bg-black"></div>
      <div className="hidden lg:block w-2/5 h-screen skew-x-12 bg-black absolute"></div>
      <div className="m-10 lg:absolute select-none">
        <h1 className=" text-white text-3xl font-semibold font-['Kanit'] tracking-[2.80px] whitespace-nowrap">
          Welcome to hawknode.
          <br />
          <div className="mt-2 h-2  bg-neutral-50 rounded-full" />
        </h1>
        <h2 className=" text-white text-2xl font-normal font-['Kanit'] leading-[44px] tracking-widest">
          Register to continue
        </h2>
      </div>
      <div className="w-auto h-auto mx-24">
        <form
          className="bg-white rounded-md p-6 mx-24 "
          onSubmit={handleSubmit}
        >
          <div className="w-80 h-auto p-2 bg-black rounded-md text-white font-Akshar text-2xl flex justify-between">
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
              src={file}
              htmlFor="avatar"
              className=" flex justify-center rounded-full m-2 w-28 h-28  border-4"
            />
          </div>
          <div>
            <input
              ref={fullnameRef}
              id="fullname"
              placeholder="Full Name"
              className="w-80  p-2  bg-black rounded-md text-white font-Akshar text-2xl my-5 "
            />
          </div>
          <div>
            <input
              ref={usernameRef}
              id="username"
              placeholder="username"
              className="w-80  p-2  bg-black rounded-md text-white font-Akshar text-2xl "
            />
          </div>
          <div>
            <input
              ref={emailRef}
              id="Email"
              placeholder="Email"
              className="w-80  p-2  bg-black rounded-md text-white font-Akshar text-2xl mt-5"
            />
          </div>
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
          <button className="w-80  justify-cen text-white text-[25px] font-semibold font-['Akshar'] bg-slate-900 rounded-lg px-5 py-1">
            Register
          </button>
          <p className="pt-2 pl-2">
            Have an Account?
            <span className="">
              <Link className="m-2 text-blue-500 text-lg" to="/login">
                Log In
              </Link>
            </span>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Register;
