import { Edit, Eye, Home, LogOut, Menu, Settings, Share } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import MyPosts from "./myPosts";
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
    <div className="flex bg-gray-50">
      {/* Sidebar */}
      <div
        className={`fixed top-15 left-0 h-full ${
          isSidebarOpen ? "w-64" : "w-20"
        } transition-width duration-300 bg-gradient-to-b from-gray-900 to-black shadow-xl`}
      >
        <i
          className="cursor-pointer px-4 py-4 mx-3 my-4 text-white hover:text-gray-300 transition-colors"
          onClick={handleSidebarToggle}
        >
          <Menu size={32} />
        </i>
        <ul className="mt-8 space-y-2">
          <li className="hover:bg-gray-800 rounded-lg mx-2">
            <Link to="/" className="flex items-center p-4 text-gray-300 hover:text-white transition-colors">
              <Home size={20} />
              {isSidebarOpen && <span className="pl-3">Home</span>}
            </Link>
          </li>
          <li className="hover:bg-gray-800 rounded-lg mx-2">
            <Link to="" className="flex items-center p-4 text-gray-300 hover:text-white transition-colors">
              <Menu size={20} />
              {isSidebarOpen && <span className="pl-3">Dashboard</span>}
            </Link>
          </li>
          <li className="hover:bg-gray-800 rounded-lg mx-2">
            <Link to="" className="flex items-center p-4 text-gray-300 hover:text-white transition-colors">
              <Settings size={20} />
              {isSidebarOpen && <span className="pl-3">Settings</span>}
            </Link>
          </li>
        </ul>
        <div className="absolute bottom-4 w-full">
          <li className="hover:bg-red-900/30 rounded-lg mx-2 list-none">
            <Link to="" className="flex items-center p-4 text-red-400 hover:text-red-300 transition-colors">
              <LogOut size={20} />
              {isSidebarOpen && <span className="pl-3">Logout</span>}
            </Link>
          </li>
        </div>
      </div>

      {/* Main Content */}
      <div className={`flex-1 ${isSidebarOpen ? "ml-64" : "ml-20"} transition-margin duration-300 min-h-screen`}>
        <main className="p-6 max-w-7xl mx-auto">
          {/* Profile Section */}
          <div className="bg-white rounded-2xl shadow-md p-6 mb-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center">
                <img src={auth.user.avatar} className="w-24 h-24 rounded-full border-4 border-gray-100 shadow-lg" />
                <div className="ml-6">
                  <h1 className="text-3xl font-bold text-gray-800">{auth.user.fullname}</h1>
                  <p className="text-gray-500 text-lg">@{auth.user.username}</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-3">
                <button className="flex items-center px-6 py-3 bg-gray-900 text-white rounded-xl hover:bg-gray-800 transition-colors">
                  <Share className="mr-2" size={18} />
                  <span className="font-semibold">Share Profile</span>
                </button>
                <Link
                  to={`/user/edit/${auth.user.username}`}
                  className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-500 transition-colors"
                >
                  <Edit className="mr-2" size={18} />
                  <span className="font-semibold">Edit Profile</span>
                </Link>
              </div>
            </div>
          </div>

          {/* Posts Sections */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-2xl shadow-md">
              <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                <Edit className="mr-2" size={20} />
                My Posts
              </h2>
              <MyPosts />
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-md">
              <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                <Eye className="mr-2" size={20} />
                Saved Posts
              </h2>
              <SavedPosts />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
