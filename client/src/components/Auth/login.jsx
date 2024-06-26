import { useEffect, useState, useRef } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import axios from "../../api/axios.jsx";
import useAuth from "../../hooks/useAuth.jsx";


function Login() {
  const { setAuth, persist, setPersist } = useAuth();

  const navigate = useNavigate();
  //managing history so when users clicks back he goes where he came from
  const location = useLocation();
  const from = location.state?.from?.pathname || "/home";

  const userRef = useRef();
  const passRef = useRef();
  const errRef = useRef();

  const [errorMsg, setErrorMsg] = useState("");
  const [showPass, setShowPass] = useState(false);

  //doing something while the password or the username changes.
  useEffect(() => {
    userRef.current.focus();
  }, []); //run on start thats why empty dependecy array

  useEffect(() => {
    setErrorMsg("");
  }, [userRef.current?.value, passRef.current?.value]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!userRef.current?.value || !passRef.current?.value) {
      setErrorMsg("Missing Username or Password");
      return;
    }

    const data = {
      username: userRef.current.value,
      password: passRef.current.value,
    };

    axios
      .post("/v1/users/login", data, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      })
      .then((response) => {
        const { user, accessToken } = response.data.data;
        setAuth({ user, accessToken });
      //redirect and perform some actions after successfull login 
        navigate(from, { replace: true });
      })
      .catch((error) => {
        if (error.response?.status === 400) {
          setErrorMsg("Missing Username or Password");
        } else if (error.response?.status === 401) {
          setErrorMsg("Unauthorized");
        } else {
          setErrorMsg("Login Failed");
        }
        errRef.current.focus();
      });
  };

  const togglePersist = () => {
    setPersist(prev => !prev);
  };

  useEffect(() => {
    localStorage.setItem("persist", persist);
  }, [persist]);

  return (
    <div className="w-screen h-screen bg-yellow-400 lg:inline-flex lg:flex-row flex flex-col lg:items-center items-center justify-between">
      <div className="hidden lg:block w-1/5 h-screen  bg-black overflow-hidden"></div>
      <div className="hidden lg:block w-2/5 h-screen skew-x-12 bg-black overflow-hidden absolute"></div>
      <div className="m-10 lg:absolute select-none">
        <h1 className=" text-white text-3xl font-semibold font-['Kanit'] tracking-[2.80px] whitespace-nowrap">
          Welcome to hawknode.
          <br />
          <div className="mt-2 h-2  bg-neutral-50 rounded-full" />
        </h1>
        <h2 className=" text-white text-2xl font-normal font-['Kanit'] leading-[44px] tracking-widest">
          Sign in to continue
        </h2>
      </div>
      <div className="pb-64 lg:pb-0 pt-2 w-auto h-auto mx-24">
        <form onSubmit={handleSubmit} className="bg-white rounded-md p-6 mx-24">
          <p
            ref={errRef}
            className={errorMsg ? "errormsg" : "offscreen"}
            aria-live="assertive"
          >
            {errorMsg}
          </p>
          <div>
            <input
              type="text"
              ref={userRef}
              id="username"
              autoComplete="off"
              placeholder="username"
              //required
              className="w-80 p-2 top-[116px] bg-black rounded-md text-white font-Akshar text-2xl"
            />
          </div>
          <div className="">
            <input
              ref={passRef}
              id="password"
              type={showPass ? "text" : "password"}
              //autoComplete="off" not supported.
              //required
              placeholder="password"
              className="my-5 w-80 p-2 top-[116px] bg-black rounded-md text-white font-Akshar text-2xl "
            />
            <button
              className=" relative -ml-10 z-10"
              onClick={(e) => {
                setShowPass((prev) => !prev);
                e.preventDefault();
              }}
            >
              <img
                className="size-8 "
                src={
                  showPass
                    ? "../src/assets/hide_eye.png"
                    : "../src/assets/show_eye.png"
                }
              />
            </button>
          </div>

          <button className="w-80 p-2 justify-center top-[10px] text-white text-[25px] font-semibold font-['Akshar'] bg-slate-900 rounded-lg px-5 py-1">
            Sign in
          </button>
          <div className="persistCheck p-2">
            <input
              type="checkbox"
              id="persist"
              onChange={togglePersist}
              checked={persist}
              className="size-5 mt-2"
            />
            <label className="ml-3 text-lg" htmlFor="persist">
              Keep me signed in.
            </label>
          </div>
          <p className="pt-2 pl-2">
            Need an Account?
            <span className="">
              <Link className="m-2 text-blue-500 text-lg" to="/register">
                Register
              </Link>
            </span>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
