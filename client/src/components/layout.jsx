import {Outlet} from "react-router-dom";
import Navbar from "./Navbar/navbar";


function Layout(){
    return(
    <>
        <Navbar />
        <Outlet />
    </>
 );
}


export default Layout;