import { createContext, useState, useEffect } from "react";

const AuthContext = createContext({});

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(() => {
    const storedAuth = localStorage.getItem("auth");
    return storedAuth ? JSON.parse(storedAuth) : {};
  });

  const [persist, setPersist] = useState(JSON.parse(localStorage.getItem("persist")) || false);

   useEffect(() => {
     localStorage.setItem("auth", JSON.stringify(auth));
   }, [auth]);

   useEffect(() => {
     localStorage.setItem("persist", persist);
   }, [persist]); 
  
  return (
    <AuthContext.Provider value={{ auth, setAuth, persist, setPersist }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
