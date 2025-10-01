import { Edit, Search } from "lucide-react";
import { Link } from "react-router-dom";
import { useSearch } from "../../context/SearchContext";
import Dropdown from "./dropdown";

function Navbar() {
  const { searchQuery, setSearchQuery } = useSearch();

  return (
    <div className="border-b-[0.8px] w-full h-fit flex px-4 justify-between items-center select-none">
      <Link to="/" className="font-logo text-white py-2 text-2xl flex items-center">
        <img src="../src/assets/hawknodeLogo.png" alt="Hawknode Logo" width={24} height={24} className="mr-2" />
        <span className="text-black">hawknode</span>
      </Link>
      <div>siuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuu</div>
      <div className="text-white text-xl font-Akshar font-bold flex items-center">
        <div className="mx-4 my-1">
          <div className="relative w-full max-w-md mx-auto">
            <input
              type="text"
              placeholder="Search posts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full font-normal text-black text-base px-4 py-1 rounded-full border focus:outline-none focus:ring-2 focus:ring-gray-200"
            />
            <Search className="absolute right-3 top-2 text-gray-400" size={20} />
          </div>
        </div>
        <Link to="/compose" className="mr-6 flex items-center hover:text-gray-300 transition-colors">
          <Edit className="text-black" size={24} />
        </Link>
        <p>siueueuueueueuueueeeueueuueueueuueueuauth</p>
        <div className="mt-1">
          <Dropdown />
        </div>
      </div>
    </div>
  );
}

export default Navbar;
