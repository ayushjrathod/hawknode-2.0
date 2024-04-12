import { useEffect,useState,useRef } from "react"; 
import {useNavigate,useLocation} from "react-router-dom";
import axios from "../api/axios.jsx";
import {useAuth} from "../hooks/useAuth.jsx";


  
  function Login() {
    const {setAuth} = useAuth();

    const navigate  = useNavigate();

    //managing history so when users clicks back he goes where he came from
    const location = useLocation();
    const from = location.state?.from?.pathname || "/home";


    const userRef = useRef();
    const passRef = useRef();
    const errRef = useRef();

    const [user,setUser] = useState("");
    const [pass,setPass] = useState("");
    const [errMsg,setErrMsg] =useState("");

    //doing sometthing while the password or the username changes.

    useEffect(()=>{
      userRef.current.focus()
    },[]); //run on start thats why empty dependecy array

    useEffect(()=>{
      setErrMsg("");
    },[user,pass]);

    const handleSubmit = async(event)=>{
      event.preventDefault();

      if(!userRef.current?.value || !passRef.current?.value){
        console.log("All Fields are Required");
        return;
      }

      const data = {
        username:userRef.current.value,
        password:passRef.current.value
      }

      axios
        .post("/v1/users/login",data)
        .then((response)=>{
          console.log(response);
          const {accessToken,refreshToken} = response.data.data;

          //store the tokens in local storage or cookies.
          localStorage.setItem("accessToken",accessToken);
          localStorage.setItem("refreshToken",refreshToken);

          setAuth({user,pass,accessToken,refreshToken});
          setUser("");
          setPass("");

          //redirect or perform some actions after successfull login here
          navigate(from,{replace:true});
        })
        .catch((error)=>{
            if (error.response?.status === 400) {
              setErrMsg("Missing Username or Password");
            } else if (error.response?.status === 401) {
              setErrMsg("Unauthorized");
            } else {
              setErrMsg("Login Failed");
            }
            errRef.current.focus();
        })
    }

    return (
      <div className="w-dvw h-fit bg-yellow-400 inline-flex items-center justify-between">
        <div className="w-1/5 h-screen  bg-black overflow-hidden"></div>
        <div className="w-2/5 h-screen skew-x-12 bg-black overflow-hidden absolute"></div>
        <div className="m-10 absolute">
          <h1 className="w-[433px] top-[414px] text-white text-[34.94px] font-semibold font-['Kanit'] leading-[44px] tracking-[2.80px]">
            Welcome to hawknode.
            <br />
            <div className="mt-2 w-[200px] h-[11px]  bg-neutral-50 rounded-[15px]" />
          </h1>
          <h2 className="left-[80px]  text-white text-[26.94px] font-normal font-['Kanit'] leading-[44px] tracking-widest">
            Sign in to continue
          </h2>
        </div>
        <div className="w-auto h-auto mx-24">
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-md p-6 mx-24"
          >
          <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
            <div>
              <input
                ref={userRef}
                id="username"
                placeholder="username"
                onChange={(e)=>setUser(e.target.value)}
                className="w-80 p-2 top-[116px] bg-black rounded-md text-white font-Akshar text-2xl "
              />
            </div>
            <div>
              <input
                ref={passRef}
                id="password"
                placeholder="password"
                onChange={(e)=>{setPass(e.target.value)}}
                className="my-5 w-80 p-2 top-[116px] bg-black rounded-md text-white font-Akshar text-2xl "
              />
            </div>

            <button className="w-80 p-2 justify-center top-[10px] text-white text-[25px] font-semibold font-['Akshar'] bg-slate-900 rounded-lg px-5 py-1">
              Sign in
            </button>
          </form>
        </div>
      </div>
    );
  }

export default Login;
