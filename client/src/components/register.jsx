import React, { useEffect, useRef, useState } from "react";
import api from "../api/axios";

function Register() {
  const [file, setFile] = useState(null);
  

  const handleChange = async (e) => {
    //setActualFilePath(e.target.value);  no way to get around fakpath
    setFile(URL.createObjectURL(e.target.files[0]));
  };
  //  console.log(file);

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
      

    const data = {
      avatar: file,
      fullname: fullnameRef.current.value,
      username: usernameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    //Another way instead of useRef
    // const formData = new FormData();
    // formData.append('avatar', file);
    // formData.append('fullname', fullnameRef.current.value);
    // formData.append('username', usernameRef.current.value);
    // formData.append('email', emailRef.current.value);
    // formData.append('password', passwordRef.current.value);
    // formData.append('conpassword', conpasswordRef.current.value);


       api
         .post("/v1/users/register",data) //this data is called payload 
         .then((response) => {
           console.log(JSON.stringify(response));
         })
         .catch((error) => {
           console.log(error);
         });   
  };

  return (
    <div className="w-dvw h-fit bg-yellow-400 inline-flex items-center justify-between overflow-scroll">
      <div className="w-1/5 h-screen  bg-black"></div>
      <div className="w-2/5 h-screen skew-x-12 bg-black absolute"></div>
      <div className="m-10 absolute">
        <h1 className="w-[433px] top-[414px] text-white text-[34.94px] font-semibold font-['Kanit'] leading-[44px] tracking-[2.80px]">
          Welcome to hawknode.
          <br />
          <div className="mt-2 w-[200px] h-[11px]  bg-neutral-50 rounded-[15px]" />
        </h1>
        <h2 className="left-[80px]  text-white text-[26.94px] font-normal font-['Kanit'] leading-[44px] tracking-widest">
          Click Register to Create an Account.
        </h2>
      </div>
      <div className="w-auto h-auto mx-24">
        <form
          className="bg-white rounded-md p-6 mx-24 "
          onSubmit={handleSubmit}
        >
          <div className="w-80 h-auto p-2 bg-black rounded-md text-white font-Akshar text-2xl justify-center">
            <label htmlFor="avatar">Click to Upload Avatar</label>
            <br />
            <input
              ref={avatarRef}
              id="avatar"
              type="file"
              onChange={handleChange}
              className="hidden"
            />
            <img
              src={file}
              className="rounded-full m-3 w-52 h-52 align-middle border-4"
            />
          </div>

          <div>
            <input
              ref={fullnameRef}
              id="fullname"
              placeholder="Full Name"
              className="w-80  p-2 h- top-[116px] bg-black rounded-md text-white font-Akshar text-2xl my-5 "
            />
          </div>

          <div>
            <input
              ref={usernameRef}
              id="username"
              placeholder="username"
              className="w-80  p-2 h- top-[116px] bg-black rounded-md text-white font-Akshar text-2xl "
            />
          </div>

          <div>
            <input
              ref={emailRef}
              id="Email"
              placeholder="Email"
              className="w-80  p-2 h- top-[116px] bg-black rounded-md text-white font-Akshar text-2xl mt-5"
            />
          </div>

          <div>
            <input
              ref={passwordRef}
              id="password"
              placeholder="password"
              className="my-5 p-2 w-80  h- top-[116px] bg-black rounded-md text-white font-Akshar text-2xl "
            />
          </div>

          <div>
            <input
              ref={conpasswordRef}
              id="conpassword"
              placeholder="confirm password"
              className="mb-5 p-2 w-80  h- top-[116px] bg-black rounded-md text-white font-Akshar text-2xl "
            />
          </div>

          <button className="w-80  justify-center top-[10px] text-white text-[25px] font-semibold font-['Akshar'] bg-slate-900 rounded-lg px-5 py-1">
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;
