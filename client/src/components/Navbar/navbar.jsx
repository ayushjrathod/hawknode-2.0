import { Edit } from "lucide-react";
import { Link } from "react-router-dom";
import Dropdown from "./dropdown";

function Navbar() {
  return (
    <div className="bg-black w-full h-fit flex px-4 justify-between items-center select-none">
      <Link to="/" className="font-logo text-white py-2 text-2xl flex items-center">
        <img src="../src/assets/hawknodeLogo.png" alt="Hawknode Logo" width={24} height={24} className="mr-2" />
        hawknode
      </Link>
      <div className="text-white text-xl font-Akshar font-bold flex items-center">
        <Link to="/compose" className="mr-6 flex items-center hover:text-gray-300 transition-colors">
          <span className=" mr-2">Compose</span>
          <Edit size={24} />
        </Link>
        <Dropdown />
      </div>
    </div>
  );
}

export default Navbar;
