import { BookOpen, Library, User } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import Logout from "../Auth/logout";

const Dropdown = () => {
  const { auth } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => setIsOpen(!isOpen);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block text-left z-50" ref={dropdownRef}>
      <button className="" onClick={toggleDropdown}>
        <img
          src={auth.user.avatar || "/placeholder.svg"}
          alt="User avatar"
          className="w-10 h-10 rounded-full border-2 p-0.5"
        />
      </button>
      {isOpen && (
        <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
            <Link
              to={`/user/${auth.user.username}`}
              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              role="menuitem"
            >
              <User className="mr-3" size={18} />
              Dashboard
            </Link>
            <Link
              to="/library"
              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              role="menuitem"
            >
              <Library className="mr-3" size={18} />
              Library
            </Link>
            <Link
              to="/stories"
              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              role="menuitem"
            >
              <BookOpen className="mr-3" size={18} />
              Stories
            </Link>
            <hr className="my-1" />
            <div className="px-4 py-2">
              <Logout />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
