import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import "boxicons/css/boxicons.min.css";
import  MyPosts  from "./myPosts";
import SavedPosts from "./savedPosts";

const Dashboard = () => {
  const { auth } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsSidebarOpen(false);
      } else {
        setIsSidebarOpen(true);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleSidebarToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <div
        className={`fixed top-15 left-0 bg-black h-full ${
          isSidebarOpen ? "w-60" : "w-16"
        } transition-width duration-300`}
      >
        <i
          className="bx bx-menu text-4xl cursor-pointer px-2 my-4 text-white"
          onClick={handleSidebarToggle}
        ></i>
        <ul className="mt-8">
        <li className="flex items-center p-4 text-white">  
          <i className="bx bxs-home"></i>
          {isSidebarOpen && <Link to="/" className="pl-2">Home</Link>}
        </li>
          <li className="flex items-center p-4 text-white">
            <i className="bx bxs-dashboard"></i>
            {isSidebarOpen && <Link to="" className="ml-4">Dashboard</Link>}
          </li>
          <li className="flex items-center p-4 text-white">
            <i className="bx bx-cog"></i>
            {isSidebarOpen && <Link to="" className="ml-2">Settings</Link>}
          </li>
        </ul>
        <ul className="mt-auto">
          <li className="flex items-center p-4 text-red-400">
            <i className="bx bx-log-out-circle"></i>
            {isSidebarOpen && <Link to="" className="ml-2"  >Logout</Link>}
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div
        className={`flex-1 ${
          isSidebarOpen ? "ml-60" : "ml-16"
        } transition-margin duration-300 bg-gray-300 h-screen`}
      >
        {/* Main Content */}
        <main className="p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex">
              <div className="">
                <img src={auth.user.avatar} className="size-20 rounded-full" />
              </div>
              <div className="ml-4 py-3">
                <h1 className="text-3xl font-bold text-black">
                  {`${auth.user.fullname}`}
                </h1>
                <p className="text-gray-600 ml-1">{`${auth.user.username}`}</p>
              </div>
            </div>
            <div>
              <div className="flex flex-row">
                <button className="mx-1 flex items-center px-4 py-2 bg-black text-white rounded-full">
                  <i className="bx bx-share-alt"></i>
                  <span className="font-Akshar font-semibold">Share</span>
                </button>

                <Link
                  to={`/user/edit/${auth.user.username}`}
                  className="font-Akshar font-semibold mx-1 flex items-center px-4 py-2 bg-black text-white rounded-full"
                >
                  <i className="bx bx-edit-alt"></i>
                  Edit User Details
                </Link>
              </div>
              <div className="mt-1">
              </div>
            </div>
          </div>

          {/* Insights */}
          <ul className="hidden grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mb-4">
            <li className="flex items-center p-4 bg-white   rounded-lg shadow">
              <i className="bx bx-calendar-check text-4xl bg-blue-100 dark:bg-blue-600 text-blue-600 p-2 rounded-lg"></i>
              <div className="ml-4">
                <h3 className="text-xl font-semibold  text-black">1,074</h3>
                <p className="text-gray-500 dark:text-gray-400">BoxOne</p>
              </div>
            </li>
            <li className="flex items-center p-4 bg-white   rounded-lg shadow">
              <i className="bx bx-show-alt text-4xl bg-yellow-100 dark:bg-yellow-600 text-yellow-600 p-2 rounded-lg"></i>
              <div className="ml-4">
                <h3 className="text-xl font-semibold  text-black">3,944</h3>
                <p className="text-gray-500 dark:text-gray-400">BoxTwo</p>
              </div>
            </li>
            <li className="flex items-center p-4 bg-white   rounded-lg shadow">
              <i className="bx bx-line-chart text-4xl bg-green-100 dark:bg-green-600 text-green-600 p-2 rounded-lg"></i>
              <div className="ml-4">
                <h3 className="text-xl font-semibold  text-black">14,721</h3>
                <p className="text-gray-500 dark:text-gray-400">BoxThree</p>
              </div>
            </li>
            <li className="flex items-center p-4 bg-white   rounded-lg shadow">
              <i className="bx bx-dollar-circle text-4xl bg-red-100 dark:bg-red-600 text-red-600 p-2 rounded-lg"></i>
              <div className="ml-4">
                <h3 className="text-xl font-semibold  text-black">$6,742</h3>
                <p className="text-gray-500 dark:text-gray-400">BoxFour</p>
              </div>
            </li>
          </ul>

          <div className="flex gap-4 mb-4">
            <div className="flex-1 bg-white   p-4 rounded-lg shadow">
              <h2 className="text-xl font-bold  text-black mb-4">My Posts</h2>
              <MyPosts />
            </div>
          </div>
          <div className="flex gap-4 mb-4">
            <div className="flex-1 bg-white   p-4 rounded-lg shadow">
              <h2 className="text-xl font-bold  text-black mb-4">Saved Posts</h2>
              <SavedPosts />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
