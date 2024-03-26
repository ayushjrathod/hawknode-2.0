import React,{useRef} from "react";




function Register(){
    const usernameRef = useRef();
    const passwordRef = useRef();
    const conpasswordRef = useRef();

    const handleSubmit=async (event)=>{
        event.preventDefault();     
    

    const data = {
        username:usernameRef.current.value,
        password:passwordRef.current.value,
        conpassword:conpasswordRef.current.value
    };

    const response = await fetch("http://localhost:9000/register",{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(data),
    });

    const result = await response.json();
    console.log(result);
    };


    return (
      <div className="w-dvw h-lvh bg-yellow-400 inline-flex items-center justify-between">
        <div className="w-[30%] h-full  bg-black overflow-hidden"></div>
        <div className="w-[700px] h-full skew-x-12 bg-black overflow-hidden absolute"></div>
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
        <div className="w-[400px] h-[450px] mx-[15%]">
          <form className="bg-white rounded-md flex-col px-8 py-10" onSubmit={handleSubmit}>
            <input ref={usernameRef} id="username" placeholder="username" className="w-[329px] p-2 h-[53px] top-[116px] bg-black rounded-md text-white font-Akshar text-2xl " />
            <input ref={passwordRef} id="password" placeholder="password" className="my-5 p-2 w-[329px] h-[53px] top-[116px] bg-black rounded-md text-white font-Akshar text-2xl " />
            <input ref={conpasswordRef} id="conpassword" placeholder="confirm password" className="mb-5 p-2 w-[329px] h-[53px] top-[116px] bg-black rounded-md text-white font-Akshar text-2xl " />
            <button className="w-[329px] justify-center top-[10px] text-white text-[25px] font-semibold font-['Akshar'] bg-slate-900 rounded-lg px-5 py-1">
              Register
            </button>
          </form>
        </div>
      </div>
    );
}

export default Register;